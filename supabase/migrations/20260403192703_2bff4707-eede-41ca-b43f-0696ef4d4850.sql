
CREATE OR REPLACE FUNCTION public.seed_company_alerts(
  _company_id uuid,
  _alerts jsonb
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _current_user_id uuid;
  _alert jsonb;
BEGIN
  _current_user_id := auth.uid();
  IF _current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Verify user is member of this company
  IF NOT EXISTS (
    SELECT 1 FROM public.company_members
    WHERE user_id = _current_user_id AND company_id = _company_id
  ) THEN
    RAISE EXCEPTION 'Not a member of this company';
  END IF;

  -- Insert each alert
  FOR _alert IN SELECT * FROM jsonb_array_elements(_alerts)
  LOOP
    INSERT INTO public.alerts (company_id, card_id, alert_type, message, is_read, status)
    VALUES (
      _company_id,
      (_alert->>'card_id')::uuid,
      _alert->>'alert_type',
      _alert->>'message',
      COALESCE((_alert->>'is_read')::boolean, false),
      COALESCE(_alert->>'status', 'new')
    );
  END LOOP;
END;
$$;
