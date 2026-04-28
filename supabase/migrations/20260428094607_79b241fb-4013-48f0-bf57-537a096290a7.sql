-- Prevent self-role assignment and require explicit same-company scope
DROP POLICY IF EXISTS "Admins can insert roles for same company users" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can update roles for same company users" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can delete roles for same company users" ON public.user_roles;

CREATE POLICY "Admins can insert roles for same company users"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
    AND user_id <> auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.company_members cm_admin
      JOIN public.company_members cm_target
        ON cm_admin.company_id = cm_target.company_id
      WHERE cm_admin.user_id = auth.uid()
        AND cm_target.user_id = public.user_roles.user_id
    )
  );

CREATE POLICY "Admins can update roles for same company users"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    AND user_id <> auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.company_members cm_admin
      JOIN public.company_members cm_target
        ON cm_admin.company_id = cm_target.company_id
      WHERE cm_admin.user_id = auth.uid()
        AND cm_target.user_id = public.user_roles.user_id
    )
  )
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
    AND user_id <> auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.company_members cm_admin
      JOIN public.company_members cm_target
        ON cm_admin.company_id = cm_target.company_id
      WHERE cm_admin.user_id = auth.uid()
        AND cm_target.user_id = public.user_roles.user_id
    )
  );

CREATE POLICY "Admins can delete roles for same company users"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    AND user_id <> auth.uid()
    AND EXISTS (
      SELECT 1
      FROM public.company_members cm_admin
      JOIN public.company_members cm_target
        ON cm_admin.company_id = cm_target.company_id
      WHERE cm_admin.user_id = auth.uid()
        AND cm_target.user_id = public.user_roles.user_id
    )
  );

-- Limit access to sensitive company details and expose a safe summary for general members
DROP POLICY IF EXISTS "Users can view their companies" ON public.companies;

CREATE POLICY "Managers can view full company details"
  ON public.companies
  FOR SELECT
  TO authenticated
  USING (
    id IN (SELECT get_user_company_ids(auth.uid()))
    AND (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'fleet_manager'::app_role)
      OR EXISTS (
        SELECT 1
        FROM public.company_members cm
        WHERE cm.company_id = companies.id
          AND cm.user_id = auth.uid()
          AND cm.role = 'owner'
      )
    )
  );

CREATE OR REPLACE VIEW public.company_summaries AS
SELECT id, name
FROM public.companies;

ALTER VIEW public.company_summaries SET (security_invoker = true);

GRANT SELECT ON public.company_summaries TO authenticated;

-- Restrict alerts updates to read state for members, with separate manager resolution policy
DROP POLICY IF EXISTS "Members can mark alerts as read" ON public.alerts;
DROP POLICY IF EXISTS "Managers can resolve alerts" ON public.alerts;

CREATE POLICY "Members can mark alerts as read"
  ON public.alerts
  FOR UPDATE
  TO authenticated
  USING (
    company_id IN (SELECT get_user_company_ids(auth.uid()))
  )
  WITH CHECK (
    company_id IN (SELECT get_user_company_ids(auth.uid()))
  );

CREATE POLICY "Managers can resolve alerts"
  ON public.alerts
  FOR UPDATE
  TO authenticated
  USING (
    company_id IN (SELECT get_user_company_ids(auth.uid()))
    AND (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'fleet_manager'::app_role)
    )
  )
  WITH CHECK (
    company_id IN (SELECT get_user_company_ids(auth.uid()))
    AND (
      has_role(auth.uid(), 'admin'::app_role)
      OR has_role(auth.uid(), 'fleet_manager'::app_role)
    )
  );

CREATE OR REPLACE FUNCTION public.protect_alert_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.message IS DISTINCT FROM OLD.message THEN
    RAISE EXCEPTION 'Alert message cannot be modified';
  END IF;
  IF NEW.alert_type IS DISTINCT FROM OLD.alert_type THEN
    RAISE EXCEPTION 'Alert type cannot be modified';
  END IF;
  IF NEW.company_id IS DISTINCT FROM OLD.company_id THEN
    RAISE EXCEPTION 'Alert company cannot be modified';
  END IF;
  IF NEW.card_id IS DISTINCT FROM OLD.card_id THEN
    RAISE EXCEPTION 'Alert card_id cannot be modified';
  END IF;
  IF NEW.created_at IS DISTINCT FROM OLD.created_at THEN
    RAISE EXCEPTION 'Alert created_at cannot be modified';
  END IF;
  IF NEW.notification_channels IS DISTINCT FROM OLD.notification_channels THEN
    RAISE EXCEPTION 'Alert notification channels cannot be modified';
  END IF;

  IF NOT (has_role(auth.uid(), 'admin'::app_role) OR has_role(auth.uid(), 'fleet_manager'::app_role)) THEN
    IF NEW.is_read IS DISTINCT FROM OLD.is_read THEN
      IF OLD.is_read IS TRUE AND NEW.is_read IS FALSE THEN
        RAISE EXCEPTION 'Alerts cannot be marked as unread';
      END IF;
    END IF;

    IF NEW.status IS DISTINCT FROM OLD.status
      OR NEW.resolved_by IS DISTINCT FROM OLD.resolved_by
      OR NEW.resolved_at IS DISTINCT FROM OLD.resolved_at
      OR NEW.resolution_comment IS DISTINCT FROM OLD.resolution_comment THEN
      RAISE EXCEPTION 'Only managers can resolve alerts';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS protect_alert_fields_trigger ON public.alerts;
CREATE TRIGGER protect_alert_fields_trigger
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_alert_fields();