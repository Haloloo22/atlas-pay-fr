-- Create a function to handle company creation atomically
CREATE OR REPLACE FUNCTION public.create_company_with_owner(
  _name text,
  _siret text DEFAULT NULL,
  _address text DEFAULT NULL,
  _city text DEFAULT NULL,
  _postal_code text DEFAULT NULL,
  _phone text DEFAULT NULL,
  _email text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _company_id uuid;
BEGIN
  -- Insert the company
  INSERT INTO public.companies (name, siret, address, city, postal_code, phone, email)
  VALUES (_name, _siret, _address, _city, _postal_code, _phone, _email)
  RETURNING id INTO _company_id;
  
  -- Add the current user as owner
  INSERT INTO public.company_members (user_id, company_id, role)
  VALUES (auth.uid(), _company_id, 'owner');
  
  RETURN _company_id;
END;
$$;