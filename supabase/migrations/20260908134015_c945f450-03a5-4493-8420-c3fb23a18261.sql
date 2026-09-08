INSERT INTO public.user_roles (user_id, role)
SELECT DISTINCT cm.user_id, 'admin'::app_role
FROM public.company_members cm
WHERE cm.role = 'owner'
ON CONFLICT (user_id, role) DO NOTHING;

CREATE OR REPLACE FUNCTION public.grant_admin_role_to_owner()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.role = 'owner' THEN
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.user_id, 'admin'::app_role)
    ON CONFLICT (user_id, role) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS company_members_grant_admin ON public.company_members;
CREATE TRIGGER company_members_grant_admin
AFTER INSERT OR UPDATE OF role ON public.company_members
FOR EACH ROW EXECUTE FUNCTION public.grant_admin_role_to_owner();