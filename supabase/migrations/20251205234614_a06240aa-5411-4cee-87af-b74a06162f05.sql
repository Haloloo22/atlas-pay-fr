-- Phase 6a: Advanced Limits
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS per_transaction_min numeric DEFAULT 0;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS limit_type text DEFAULT 'hard';
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS max_fills_per_day integer DEFAULT 2;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS max_tank_capacity_mad numeric DEFAULT 800;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS enforce_vehicle_fuel_type boolean DEFAULT true;

-- Phase 6b: Enhanced MCC Restrictions
ALTER TABLE public.allowed_merchants ADD COLUMN IF NOT EXISTS list_type text DEFAULT 'whitelist';
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS allow_shop_purchases boolean DEFAULT false;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS shop_max_amount numeric DEFAULT 50;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS block_non_fuel_mcc boolean DEFAULT true;

-- Phase 6c: Complete Alert System
CREATE TABLE IF NOT EXISTS public.card_alert_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id uuid REFERENCES public.cards(id) ON DELETE CASCADE NOT NULL UNIQUE,
  alert_on_declined boolean DEFAULT true,
  alert_on_out_of_hours boolean DEFAULT true,
  alert_on_out_of_zone boolean DEFAULT true,
  alert_on_limit_exceeded boolean DEFAULT true,
  alert_on_suspicious boolean DEFAULT true,
  notify_email boolean DEFAULT true,
  notify_sms boolean DEFAULT false,
  notify_app boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on card_alert_settings
ALTER TABLE public.card_alert_settings ENABLE ROW LEVEL SECURITY;

-- RLS policies for card_alert_settings
CREATE POLICY "Users can view their company card alert settings"
ON public.card_alert_settings
FOR SELECT
USING (card_id IN (
  SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))
));

CREATE POLICY "Users can create card alert settings for their company"
ON public.card_alert_settings
FOR INSERT
WITH CHECK (card_id IN (
  SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))
));

CREATE POLICY "Users can update their company card alert settings"
ON public.card_alert_settings
FOR UPDATE
USING (card_id IN (
  SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))
));

CREATE POLICY "Users can delete their company card alert settings"
ON public.card_alert_settings
FOR DELETE
USING (card_id IN (
  SELECT id FROM public.cards WHERE company_id IN (SELECT get_user_company_ids(auth.uid()))
));

-- Enrich alerts table
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS status text DEFAULT 'new';
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS resolution_comment text;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS resolved_at timestamptz;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS resolved_by uuid;
ALTER TABLE public.alerts ADD COLUMN IF NOT EXISTS notification_channels text[] DEFAULT ARRAY['app']::text[];

-- Update trigger for card_alert_settings
CREATE TRIGGER update_card_alert_settings_updated_at
BEFORE UPDATE ON public.card_alert_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();