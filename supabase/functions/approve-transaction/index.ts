import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Create Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Get authorization header
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');

    // Verify user is admin
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();

    if (!profile?.is_admin) {
      return new Response(
        JSON.stringify({ error: 'Admin access required' }),
        { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    const { transactionId, status } = await req.json();

    if (!transactionId || !status) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update transaction
    const { data: transaction, error: updateError } = await supabaseClient
      .from('transactions')
      .update({
        status,
        approved_by: user.id,
        approved_at: new Date().toISOString(),
      })
      .eq('id', transactionId)
      .select()
      .single();

    if (updateError) throw updateError;

    // If approved, update user balance
    if (status === 'approved') {
      const { data: txData } = await supabaseClient
        .from('transactions')
        .select('user_id, type, amount')
        .eq('id', transactionId)
        .single();

      if (txData) {
        const balanceChange = txData.type === 'deposit' 
          ? txData.amount 
          : -txData.amount;

        await supabaseClient
          .from('profiles')
          .update({
            withdrawable_balance: supabaseClient.raw(`withdrawable_balance + ${balanceChange}`)
          })
          .eq('id', txData.user_id);
      }
    }

    return new Response(
      JSON.stringify({ success: true, transaction }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
