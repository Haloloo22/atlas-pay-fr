-- Drop the overly permissive self-service membership policy
DROP POLICY IF EXISTS "Users can add themselves to a company" ON public.company_members;

-- Replace it with a locked-down policy: no direct client-side INSERTs allowed
CREATE POLICY "Company members insert only via function"
ON public.company_members
FOR INSERT
WITH CHECK (false);