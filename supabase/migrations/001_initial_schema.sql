-- TaskHub Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enums
CREATE TYPE transaction_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE transaction_type AS ENUM ('deposit', 'withdrawal', 'earning', 'referral_commission');
CREATE TYPE payment_method AS ENUM ('easypaisa', 'jazzcash');

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  phone TEXT,
  current_plan TEXT DEFAULT 'Free',
  total_earnings DECIMAL(10, 2) DEFAULT 0,
  withdrawable_balance DECIMAL(10, 2) DEFAULT 0,
  ads_watched INTEGER DEFAULT 0,
  referral_count INTEGER DEFAULT 0,
  referrer_id UUID REFERENCES public.profiles(id),
  is_admin BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  requires_2fa BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Plans table
CREATE TABLE public.plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  duration TEXT NOT NULL,
  features JSONB NOT NULL,
  is_popular BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  user_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Transactions table
CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type transaction_type NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status transaction_status DEFAULT 'pending',
  method payment_method,
  account_number TEXT,
  notes TEXT,
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ad sessions table
CREATE TABLE public.ad_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  ad_title TEXT NOT NULL,
  ad_category TEXT,
  earnings DECIMAL(10, 2) NOT NULL,
  duration INTEGER NOT NULL,
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Referrals table
CREATE TABLE public.referrals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  referrer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  referred_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  commission_earned DECIMAL(10, 2) DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Wallet settings table
CREATE TABLE public.wallet_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  method payment_method UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT true,
  min_deposit DECIMAL(10, 2) DEFAULT 10,
  min_withdraw DECIMAL(10, 2) DEFAULT 50,
  fee_percentage DECIMAL(5, 2) DEFAULT 2,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_profiles_username ON public.profiles(username);
CREATE INDEX idx_profiles_referrer ON public.profiles(referrer_id);
CREATE INDEX idx_transactions_user ON public.transactions(user_id);
CREATE INDEX idx_transactions_status ON public.transactions(status);
CREATE INDEX idx_ad_sessions_user ON public.ad_sessions(user_id);
CREATE INDEX idx_referrals_referrer ON public.referrals(referrer_id);

-- Row Level Security (RLS) Policies

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ad_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_settings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Plans policies (everyone can read, only admins can modify)
CREATE POLICY "Anyone can view active plans"
  ON public.plans FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage plans"
  ON public.plans FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Transactions policies
CREATE POLICY "Users can view own transactions"
  ON public.transactions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own transactions"
  ON public.transactions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions"
  ON public.transactions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

CREATE POLICY "Admins can update transactions"
  ON public.transactions FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Ad sessions policies
CREATE POLICY "Users can view own ad sessions"
  ON public.ad_sessions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own ad sessions"
  ON public.ad_sessions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own ad sessions"
  ON public.ad_sessions FOR UPDATE
  USING (auth.uid() = user_id);

-- Referrals policies
CREATE POLICY "Users can view own referrals"
  ON public.referrals FOR SELECT
  USING (auth.uid() = referrer_id OR auth.uid() = referred_id);

CREATE POLICY "System can create referrals"
  ON public.referrals FOR INSERT
  WITH CHECK (true);

-- Wallet settings policies
CREATE POLICY "Anyone can view wallet settings"
  ON public.wallet_settings FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage wallet settings"
  ON public.wallet_settings FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND is_admin = true
    )
  );

-- Functions and Triggers

-- Update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER plans_updated_at
  BEFORE UPDATE ON public.plans
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER wallet_settings_updated_at
  BEFORE UPDATE ON public.wallet_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, phone)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
    COALESCE(NEW.raw_user_meta_data->>'phone', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Seed default plans
INSERT INTO public.plans (name, price, duration, features, is_popular) VALUES
  ('Basic', 9.99, 'month', '["Watch 50 ads per day", "$0.10 per ad", "Basic support", "1 referral link"]', false),
  ('Premium', 19.99, 'month', '["Watch 150 ads per day", "$0.15 per ad", "Priority support", "3 referral links", "Bonus rewards"]', true),
  ('Enterprise', 49.99, 'month', '["Unlimited ads per day", "$0.20 per ad", "24/7 support", "Unlimited referrals", "Premium rewards", "Custom dashboard"]', false);

-- Seed wallet settings
INSERT INTO public.wallet_settings (method, enabled, min_deposit, min_withdraw, fee_percentage) VALUES
  ('easypaisa', true, 10, 50, 2),
  ('jazzcash', true, 10, 50, 2);
