-- Drop existing RLS policies on cards table
DROP POLICY IF EXISTS "Users can view their company cards" ON public.cards;
DROP POLICY IF EXISTS "Users can create cards for their company" ON public.cards;
DROP POLICY IF EXISTS "Users can update their company cards" ON public.cards;
DROP POLICY IF EXISTS "Users can delete their company cards" ON public.cards;

-- Create new role-based RLS policies for cards table
-- Only admin and fleet_manager roles can access cards

CREATE POLICY "Only managers can view cards"
ON public.cards FOR SELECT
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (
    has_role(auth.uid(), 'admin') OR
    has_role(auth.uid(), 'fleet_manager')
  )
);

CREATE POLICY "Only managers can create cards"
ON public.cards FOR INSERT
WITH CHECK (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (
    has_role(auth.uid(), 'admin') OR
    has_role(auth.uid(), 'fleet_manager')
  )
);

CREATE POLICY "Only managers can update cards"
ON public.cards FOR UPDATE
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (
    has_role(auth.uid(), 'admin') OR
    has_role(auth.uid(), 'fleet_manager')
  )
);

CREATE POLICY "Only managers can delete cards"
ON public.cards FOR DELETE
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (
    has_role(auth.uid(), 'admin') OR
    has_role(auth.uid(), 'fleet_manager')
  )
);