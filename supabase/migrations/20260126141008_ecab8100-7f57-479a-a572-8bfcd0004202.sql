-- Update create_company_with_owner function with server-side input validation
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
  _current_user_id uuid;
  _trimmed_name text;
  _trimmed_email text;
BEGIN
  -- Check authentication
  _current_user_id := auth.uid();
  IF _current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;

  -- Sanitize and validate company name (required)
  _trimmed_name := trim(_name);
  IF _trimmed_name IS NULL OR length(_trimmed_name) < 2 THEN
    RAISE EXCEPTION 'Company name must be at least 2 characters';
  END IF;
  
  IF length(_trimmed_name) > 200 THEN
    RAISE EXCEPTION 'Company name must not exceed 200 characters';
  END IF;

  -- Validate email format if provided
  _trimmed_email := nullif(trim(_email), '');
  IF _trimmed_email IS NOT NULL AND _trimmed_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RAISE EXCEPTION 'Invalid email format';
  END IF;

  -- Validate length limits on other fields (prevent excessively long strings)
  IF _siret IS NOT NULL AND length(_siret) > 50 THEN
    RAISE EXCEPTION 'SIRET must not exceed 50 characters';
  END IF;

  IF _address IS NOT NULL AND length(_address) > 500 THEN
    RAISE EXCEPTION 'Address must not exceed 500 characters';
  END IF;

  IF _city IS NOT NULL AND length(_city) > 100 THEN
    RAISE EXCEPTION 'City must not exceed 100 characters';
  END IF;

  IF _postal_code IS NOT NULL AND length(_postal_code) > 20 THEN
    RAISE EXCEPTION 'Postal code must not exceed 20 characters';
  END IF;

  IF _phone IS NOT NULL AND length(_phone) > 30 THEN
    RAISE EXCEPTION 'Phone must not exceed 30 characters';
  END IF;

  -- Insert the company with sanitized values
  INSERT INTO public.companies (name, siret, address, city, postal_code, phone, email)
  VALUES (
    _trimmed_name,
    nullif(trim(_siret), ''),
    nullif(trim(_address), ''),
    nullif(trim(_city), ''),
    nullif(trim(_postal_code), ''),
    nullif(trim(_phone), ''),
    _trimmed_email
  )
  RETURNING id INTO _company_id;
  
  -- Add the current user as owner
  INSERT INTO public.company_members (user_id, company_id, role)
  VALUES (_current_user_id, _company_id, 'owner');
  
  RETURN _company_id;
END;
$$;