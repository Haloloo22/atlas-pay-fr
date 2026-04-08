
-- Drop the overly permissive UPDATE policy
DROP POLICY IF EXISTS "Users can mark alerts as read" ON public.alerts;

-- Policy 1: Any company member can toggle is_read only
-- We use WITH CHECK to ensure no other fields are changed
CREATE POLICY "Members can mark alerts as read"
  ON public.alerts FOR UPDATE
  TO authenticated
  USING (company_id IN (SELECT get_user_company_ids(auth.uid())))
  WITH CHECK (company_id IN (SELECT get_user_company_ids(auth.uid())));

-- Create a trigger to prevent non-managers from changing sensitive fields
CREATE OR REPLACE FUNCTION public.protect_alert_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Always prevent changing immutable audit fields
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

  -- Check if user is trying to change resolution/status fields
  IF (NEW.status IS DISTINCT FROM OLD.status) OR
     (NEW.resolved_by IS DISTINCT FROM OLD.resolved_by) OR
     (NEW.resolved_at IS DISTINCT FROM OLD.resolved_at) OR
     (NEW.resolution_comment IS DISTINCT FROM OLD.resolution_comment) THEN
    -- Only admins and fleet_managers can change these
    IF NOT (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager')) THEN
      RAISE EXCEPTION 'Only managers can resolve alerts';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER protect_alert_fields_trigger
  BEFORE UPDATE ON public.alerts
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_alert_fields();
