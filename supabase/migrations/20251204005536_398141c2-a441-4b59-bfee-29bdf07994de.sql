-- Create vehicle_type enum
CREATE TYPE public.vehicle_type AS ENUM ('car', 'van', 'truck', 'motorcycle');

-- Create companies table
CREATE TABLE public.companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  siret text,
  address text,
  city text,
  postal_code text,
  phone text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create company_members table (links users to companies)
CREATE TABLE public.company_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  user_id uuid NOT NULL,
  role text DEFAULT 'member',
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(company_id, user_id)
);

-- Create vehicles table
CREATE TABLE public.vehicles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  plate_number text NOT NULL,
  brand text,
  model text,
  vehicle_type public.vehicle_type DEFAULT 'car',
  fuel_type text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create drivers table
CREATE TABLE public.drivers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text,
  phone text,
  license_number text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create cards table
CREATE TABLE public.cards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  driver_id uuid REFERENCES public.drivers(id) ON DELETE SET NULL,
  vehicle_id uuid REFERENCES public.vehicles(id) ON DELETE SET NULL,
  card_number text NOT NULL,
  monthly_limit decimal(10,2) DEFAULT 5000,
  daily_limit decimal(10,2) DEFAULT 500,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Create transactions table
CREATE TABLE public.transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id uuid REFERENCES public.cards(id) ON DELETE CASCADE NOT NULL,
  amount decimal(10,2) NOT NULL,
  station_name text,
  station_brand text,
  fuel_type text,
  liters decimal(10,2),
  odometer integer,
  location text,
  transaction_date timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Create alerts table
CREATE TABLE public.alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  card_id uuid REFERENCES public.cards(id) ON DELETE SET NULL,
  alert_type text NOT NULL,
  message text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.company_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

-- Helper function to get user's company IDs
CREATE OR REPLACE FUNCTION public.get_user_company_ids(_user_id uuid)
RETURNS SETOF uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id FROM public.company_members WHERE user_id = _user_id
$$;

-- COMPANIES policies
CREATE POLICY "Users can view their companies"
ON public.companies FOR SELECT
USING (id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can create companies"
ON public.companies FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update their companies"
ON public.companies FOR UPDATE
USING (id IN (SELECT public.get_user_company_ids(auth.uid())));

-- COMPANY_MEMBERS policies
CREATE POLICY "Users can view members of their companies"
ON public.company_members FOR SELECT
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can add themselves to a company"
ON public.company_members FOR INSERT
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can leave companies"
ON public.company_members FOR DELETE
USING (user_id = auth.uid());

-- VEHICLES policies
CREATE POLICY "Users can view their company vehicles"
ON public.vehicles FOR SELECT
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can create vehicles for their company"
ON public.vehicles FOR INSERT
WITH CHECK (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can update their company vehicles"
ON public.vehicles FOR UPDATE
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can delete their company vehicles"
ON public.vehicles FOR DELETE
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

-- DRIVERS policies
CREATE POLICY "Users can view their company drivers"
ON public.drivers FOR SELECT
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can create drivers for their company"
ON public.drivers FOR INSERT
WITH CHECK (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can update their company drivers"
ON public.drivers FOR UPDATE
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can delete their company drivers"
ON public.drivers FOR DELETE
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

-- CARDS policies
CREATE POLICY "Users can view their company cards"
ON public.cards FOR SELECT
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can create cards for their company"
ON public.cards FOR INSERT
WITH CHECK (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can update their company cards"
ON public.cards FOR UPDATE
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can delete their company cards"
ON public.cards FOR DELETE
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

-- TRANSACTIONS policies (read-only for users, linked via cards)
CREATE POLICY "Users can view transactions for their company cards"
ON public.transactions FOR SELECT
USING (card_id IN (
  SELECT c.id FROM public.cards c 
  WHERE c.company_id IN (SELECT public.get_user_company_ids(auth.uid()))
));

CREATE POLICY "Users can create transactions for their company cards"
ON public.transactions FOR INSERT
WITH CHECK (card_id IN (
  SELECT c.id FROM public.cards c 
  WHERE c.company_id IN (SELECT public.get_user_company_ids(auth.uid()))
));

-- ALERTS policies
CREATE POLICY "Users can view their company alerts"
ON public.alerts FOR SELECT
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

CREATE POLICY "Users can mark alerts as read"
ON public.alerts FOR UPDATE
USING (company_id IN (SELECT public.get_user_company_ids(auth.uid())));

-- Triggers for updated_at
CREATE TRIGGER update_companies_updated_at
BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at
BEFORE UPDATE ON public.vehicles
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_drivers_updated_at
BEFORE UPDATE ON public.drivers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cards_updated_at
BEFORE UPDATE ON public.cards
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();