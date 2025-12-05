-- Étendre la table cards avec les nouveaux champs de contrôle
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS weekly_limit numeric DEFAULT 2000;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS per_transaction_limit numeric DEFAULT 200;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS allowed_fuel_types text[] DEFAULT ARRAY['diesel', 'essence', 'gasoil'];
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS allowed_hours_start time DEFAULT '06:00';
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS allowed_hours_end time DEFAULT '22:00';
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS allowed_days integer[] DEFAULT ARRAY[1,2,3,4,5,6,7];
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS geofencing_enabled boolean DEFAULT false;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS geofencing_regions text[] DEFAULT ARRAY[]::text[];

-- Créer la table card_rules pour les règles complexes
CREATE TABLE IF NOT EXISTS public.card_rules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id uuid REFERENCES public.cards(id) ON DELETE CASCADE NOT NULL,
  rule_type text NOT NULL,
  rule_config jsonb NOT NULL DEFAULT '{}'::jsonb,
  is_enabled boolean DEFAULT true,
  priority integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on card_rules
ALTER TABLE public.card_rules ENABLE ROW LEVEL SECURITY;

-- RLS policies for card_rules
CREATE POLICY "Users can view their company card rules"
ON public.card_rules FOR SELECT
USING (card_id IN (SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))));

CREATE POLICY "Users can create card rules for their company"
ON public.card_rules FOR INSERT
WITH CHECK (card_id IN (SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))));

CREATE POLICY "Users can update their company card rules"
ON public.card_rules FOR UPDATE
USING (card_id IN (SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))));

CREATE POLICY "Users can delete their company card rules"
ON public.card_rules FOR DELETE
USING (card_id IN (SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))));

-- Trigger for updated_at on card_rules
CREATE TRIGGER update_card_rules_updated_at
BEFORE UPDATE ON public.card_rules
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Créer la table allowed_merchants pour whitelist stations
CREATE TABLE IF NOT EXISTS public.allowed_merchants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES public.companies(id) ON DELETE CASCADE NOT NULL,
  merchant_name text NOT NULL,
  mcc_code text,
  brand text,
  is_whitelisted boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on allowed_merchants
ALTER TABLE public.allowed_merchants ENABLE ROW LEVEL SECURITY;

-- RLS policies for allowed_merchants
CREATE POLICY "Users can view their company merchants"
ON public.allowed_merchants FOR SELECT
USING (company_id IN (SELECT get_user_company_ids(auth.uid())));

CREATE POLICY "Users can create merchants for their company"
ON public.allowed_merchants FOR INSERT
WITH CHECK (company_id IN (SELECT get_user_company_ids(auth.uid())));

CREATE POLICY "Users can update their company merchants"
ON public.allowed_merchants FOR UPDATE
USING (company_id IN (SELECT get_user_company_ids(auth.uid())));

CREATE POLICY "Users can delete their company merchants"
ON public.allowed_merchants FOR DELETE
USING (company_id IN (SELECT get_user_company_ids(auth.uid())));