-- Create policies table with all configuration fields
CREATE TABLE public.policies (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id UUID NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_default BOOLEAN DEFAULT false,
  
  -- Limits
  per_transaction_min NUMERIC DEFAULT 0,
  per_transaction_limit NUMERIC DEFAULT 200,
  daily_limit NUMERIC DEFAULT 500,
  weekly_limit NUMERIC DEFAULT 2000,
  monthly_limit NUMERIC DEFAULT 5000,
  limit_type TEXT DEFAULT 'hard',
  
  -- Fuel restrictions
  allowed_fuel_types TEXT[] DEFAULT ARRAY['diesel', 'essence', 'gasoil'],
  block_non_fuel_mcc BOOLEAN DEFAULT true,
  allow_shop_purchases BOOLEAN DEFAULT false,
  shop_max_amount NUMERIC DEFAULT 50,
  
  -- Time restrictions
  allowed_hours_start TIME DEFAULT '06:00:00',
  allowed_hours_end TIME DEFAULT '22:00:00',
  allowed_days INTEGER[] DEFAULT ARRAY[1, 2, 3, 4, 5, 6, 7],
  
  -- Geofencing
  geofencing_enabled BOOLEAN DEFAULT false,
  geofencing_regions TEXT[] DEFAULT ARRAY[]::TEXT[],
  
  -- Vehicle rules
  max_fills_per_day INTEGER DEFAULT 2,
  max_tank_capacity_mad NUMERIC DEFAULT 800,
  enforce_vehicle_fuel_type BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add policy_id to cards table
ALTER TABLE public.cards ADD COLUMN policy_id UUID REFERENCES public.policies(id) ON DELETE SET NULL;

-- Enable RLS on policies
ALTER TABLE public.policies ENABLE ROW LEVEL SECURITY;

-- RLS policies for policies table
CREATE POLICY "Users can view their company policies"
ON public.policies FOR SELECT
USING (company_id IN (SELECT get_user_company_ids(auth.uid())));

CREATE POLICY "Users can create policies for their company"
ON public.policies FOR INSERT
WITH CHECK (company_id IN (SELECT get_user_company_ids(auth.uid())));

CREATE POLICY "Users can update their company policies"
ON public.policies FOR UPDATE
USING (company_id IN (SELECT get_user_company_ids(auth.uid())));

CREATE POLICY "Users can delete their company policies"
ON public.policies FOR DELETE
USING (company_id IN (SELECT get_user_company_ids(auth.uid())));

-- Trigger for updated_at
CREATE TRIGGER update_policies_updated_at
BEFORE UPDATE ON public.policies
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();