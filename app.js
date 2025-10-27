const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || 'https://gjssrectawbjetaxnwdk.supabase.co',
  import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdqc3NyZWN0YXdiamV0YXhud2RrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0NjgyMDUsImV4cCI6MjA3NzA0NDIwNX0.ARnEGIyOzWjQxcw0e7y7X_6kRSgfJE5Zrk_BCsIlrKs'
);