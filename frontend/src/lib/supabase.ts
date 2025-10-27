import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export type Profile = {
  id: string;
  username: string;
  phone: string | null;
  current_plan: string;
  total_earnings: number;
  withdrawable_balance: number;
  ads_watched: number;
  referral_count: number;
  referrer_id: string | null;
  is_admin: boolean;
  is_active: boolean;
  requires_2fa: boolean;
  created_at: string;
  updated_at: string;
};

export type Plan = {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  user_count: number;
  created_at: string;
  updated_at: string;
};

export type Transaction = {
  id: string;
  user_id: string;
  type: 'deposit' | 'withdrawal' | 'earning' | 'referral_commission';
  amount: number;
  status: 'pending' | 'approved' | 'rejected';
  method: 'easypaisa' | 'jazzcash' | null;
  account_number: string | null;
  notes: string | null;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
};

export type AdSession = {
  id: string;
  user_id: string;
  ad_title: string;
  ad_category: string | null;
  earnings: number;
  duration: number;
  completed: boolean;
  completed_at: string | null;
  created_at: string;
};

export type Referral = {
  id: string;
  referrer_id: string;
  referred_id: string;
  commission_earned: number;
  is_active: boolean;
  created_at: string;
};

export type WalletSettings = {
  id: string;
  method: 'easypaisa' | 'jazzcash';
  enabled: boolean;
  min_deposit: number;
  min_withdraw: number;
  fee_percentage: number;
  updated_at: string;
};
