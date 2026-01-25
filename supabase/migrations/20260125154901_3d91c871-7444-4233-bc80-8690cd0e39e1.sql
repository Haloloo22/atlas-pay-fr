-- Add unique constraint for card numbers per company
ALTER TABLE public.cards 
ADD CONSTRAINT unique_card_number_per_company 
UNIQUE (company_id, card_number);

-- Update companies INSERT policy to force usage of create_company_with_owner function
-- This prevents unlimited company creation by authenticated users
DROP POLICY IF EXISTS "Users can create companies" ON public.companies;
CREATE POLICY "Only via function" ON public.companies FOR INSERT WITH CHECK (false);