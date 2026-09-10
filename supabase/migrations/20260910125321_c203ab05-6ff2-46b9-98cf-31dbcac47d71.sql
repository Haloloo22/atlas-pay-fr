-- Remove the leaky SELECT policy that exposed all contact-form submissions to any signed-in user
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;