-- ===== Plafonds =====
CREATE TABLE public.rule_engine_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  scope_type text NOT NULL DEFAULT 'card' CHECK (scope_type IN ('card','vehicle','driver')),
  scope_id uuid NOT NULL,
  period text NOT NULL DEFAULT 'month' CHECK (period IN ('per_transaction','day','week','month')),
  amount numeric NOT NULL CHECK (amount > 0),
  mcc_filter text[] NOT NULL DEFAULT '{}',
  alert_threshold_pct integer NOT NULL DEFAULT 80 CHECK (alert_threshold_pct BETWEEN 1 AND 100),
  on_exceed text NOT NULL DEFAULT 'decline' CHECK (on_exceed IN ('decline','soft_warning')),
  multi_card_mode text NOT NULL DEFAULT 'per_card' CHECK (multi_card_mode IN ('per_card','consolidated')),
  sync_status text NOT NULL DEFAULT 'pending' CHECK (sync_status IN ('pending','active','failed')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rule_engine_limits TO authenticated;
GRANT ALL ON public.rule_engine_limits TO service_role;
ALTER TABLE public.rule_engine_limits ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view limit rules" ON public.rule_engine_limits FOR SELECT TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())));
CREATE POLICY "Managers create limit rules" ON public.rule_engine_limits FOR INSERT TO authenticated
  WITH CHECK (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE POLICY "Managers update limit rules" ON public.rule_engine_limits FOR UPDATE TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE POLICY "Managers delete limit rules" ON public.rule_engine_limits FOR DELETE TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE TRIGGER update_rule_engine_limits_updated_at BEFORE UPDATE ON public.rule_engine_limits FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_rule_engine_limits_scope ON public.rule_engine_limits(company_id, scope_type, scope_id);

-- ===== Géofencing =====
CREATE TABLE public.rule_engine_geo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  scope_type text NOT NULL DEFAULT 'card' CHECK (scope_type IN ('card','vehicle','driver')),
  scope_id uuid NOT NULL,
  zone_type text NOT NULL DEFAULT 'region' CHECK (zone_type IN ('city','region','radius_km','merchant_list')),
  geo_reference text,
  center_lat double precision,
  center_lng double precision,
  radius_km numeric DEFAULT 50,
  merchant_whitelist text[] NOT NULL DEFAULT '{}',
  missing_location_policy text NOT NULL DEFAULT 'block' CHECK (missing_location_policy IN ('block','allow')),
  is_exception boolean NOT NULL DEFAULT false,
  expires_at timestamptz,
  sync_status text NOT NULL DEFAULT 'pending' CHECK (sync_status IN ('pending','active','failed')),
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rule_engine_geo TO authenticated;
GRANT ALL ON public.rule_engine_geo TO service_role;
ALTER TABLE public.rule_engine_geo ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view geo rules" ON public.rule_engine_geo FOR SELECT TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())));
CREATE POLICY "Managers create geo rules" ON public.rule_engine_geo FOR INSERT TO authenticated
  WITH CHECK (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE POLICY "Managers update geo rules" ON public.rule_engine_geo FOR UPDATE TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE POLICY "Managers delete geo rules" ON public.rule_engine_geo FOR DELETE TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE TRIGGER update_rule_engine_geo_updated_at BEFORE UPDATE ON public.rule_engine_geo FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE INDEX idx_rule_engine_geo_scope ON public.rule_engine_geo(company_id, scope_type, scope_id);

-- ===== Paramètres d'alerte =====
CREATE TABLE public.rule_engine_alert_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  alert_type text NOT NULL CHECK (alert_type IN ('threshold_approach','limit_exceeded','out_of_zone','unusual_transaction','sync_failure')),
  channels text[] NOT NULL DEFAULT '{email,in_app}',
  recipients text[] NOT NULL DEFAULT '{}',
  is_enabled boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, alert_type)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.rule_engine_alert_settings TO authenticated;
GRANT ALL ON public.rule_engine_alert_settings TO service_role;
ALTER TABLE public.rule_engine_alert_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view alert settings" ON public.rule_engine_alert_settings FOR SELECT TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())));
CREATE POLICY "Managers create alert settings" ON public.rule_engine_alert_settings FOR INSERT TO authenticated
  WITH CHECK (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE POLICY "Managers update alert settings" ON public.rule_engine_alert_settings FOR UPDATE TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE POLICY "Managers delete alert settings" ON public.rule_engine_alert_settings FOR DELETE TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())) AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE TRIGGER update_rule_engine_alert_settings_updated_at BEFORE UPDATE ON public.rule_engine_alert_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ===== Transactions (demandes d'autorisation émetteur) =====
CREATE TABLE public.rule_engine_transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  card_id uuid NOT NULL REFERENCES public.cards(id) ON DELETE CASCADE,
  issuer_transaction_id text NOT NULL UNIQUE,
  amount numeric NOT NULL CHECK (amount >= 0),
  mcc text NOT NULL DEFAULT '5541',
  merchant_id text,
  merchant_name text,
  location_city text,
  location_region text,
  lat double precision,
  lng double precision,
  occurred_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('accept','decline')),
  decline_reason text,
  evaluated_rules jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_captured boolean NOT NULL DEFAULT false,
  captured_amount numeric,
  captured_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.rule_engine_transactions TO authenticated;
GRANT ALL ON public.rule_engine_transactions TO service_role;
ALTER TABLE public.rule_engine_transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view engine transactions" ON public.rule_engine_transactions FOR SELECT TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())));
CREATE INDEX idx_rule_engine_tx_card_time ON public.rule_engine_transactions(card_id, occurred_at DESC);

-- ===== Exports ERP =====
CREATE TABLE public.rule_engine_erp_exports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  transaction_id uuid NOT NULL REFERENCES public.rule_engine_transactions(id) ON DELETE CASCADE,
  exported_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL CHECK (status IN ('success','failed')),
  odoo_move_reference text,
  odoo_analytic_line_reference text,
  attempts integer NOT NULL DEFAULT 1,
  error_message text,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.rule_engine_erp_exports TO authenticated;
GRANT ALL ON public.rule_engine_erp_exports TO service_role;
ALTER TABLE public.rule_engine_erp_exports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view erp exports" ON public.rule_engine_erp_exports FOR SELECT TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())));
CREATE INDEX idx_rule_engine_erp_tx ON public.rule_engine_erp_exports(transaction_id, exported_at DESC);

-- ===== Journal d'audit =====
CREATE TABLE public.rule_engine_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL REFERENCES public.companies(id) ON DELETE CASCADE,
  entity text NOT NULL,
  entity_id uuid,
  action text NOT NULL,
  actor uuid,
  data_before jsonb,
  data_after jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.rule_engine_audit_log TO authenticated;
GRANT ALL ON public.rule_engine_audit_log TO service_role;
ALTER TABLE public.rule_engine_audit_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Members view audit log" ON public.rule_engine_audit_log FOR SELECT TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())));
CREATE POLICY "Managers write audit log" ON public.rule_engine_audit_log FOR INSERT TO authenticated
  WITH CHECK (company_id IN (SELECT get_user_company_ids(auth.uid())) AND actor = auth.uid() AND (has_role(auth.uid(),'admin') OR has_role(auth.uid(),'fleet_manager')));
CREATE INDEX idx_rule_engine_audit_company ON public.rule_engine_audit_log(company_id, created_at DESC);