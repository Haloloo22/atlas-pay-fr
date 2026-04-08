
-- =============================================
-- 1. Fix company_members INSERT policy
-- =============================================
DROP POLICY IF EXISTS "Users can add themselves to a company" ON public.company_members;

-- Only owners/admins of an existing company can add members
CREATE POLICY "Only owners can add company members"
ON public.company_members
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.company_members cm
    WHERE cm.company_id = company_members.company_id
      AND cm.user_id = auth.uid()
      AND cm.role = 'owner'
  )
);

-- =============================================
-- 2. Fix vehicles write policies
-- =============================================
DROP POLICY IF EXISTS "Users can create vehicles for their company" ON public.vehicles;
DROP POLICY IF EXISTS "Users can update their company vehicles" ON public.vehicles;
DROP POLICY IF EXISTS "Users can delete their company vehicles" ON public.vehicles;

CREATE POLICY "Managers can create vehicles for their company"
ON public.vehicles FOR INSERT TO authenticated
WITH CHECK (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can update their company vehicles"
ON public.vehicles FOR UPDATE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can delete their company vehicles"
ON public.vehicles FOR DELETE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

-- =============================================
-- 3. Fix drivers write policies
-- =============================================
DROP POLICY IF EXISTS "Users can create drivers for their company" ON public.drivers;
DROP POLICY IF EXISTS "Users can update their company drivers" ON public.drivers;
DROP POLICY IF EXISTS "Users can delete their company drivers" ON public.drivers;

CREATE POLICY "Managers can create drivers for their company"
ON public.drivers FOR INSERT TO authenticated
WITH CHECK (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can update their company drivers"
ON public.drivers FOR UPDATE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can delete their company drivers"
ON public.drivers FOR DELETE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

-- =============================================
-- 4. Fix policies (spending policies) write policies
-- =============================================
DROP POLICY IF EXISTS "Users can create policies for their company" ON public.policies;
DROP POLICY IF EXISTS "Users can update their company policies" ON public.policies;
DROP POLICY IF EXISTS "Users can delete their company policies" ON public.policies;

CREATE POLICY "Managers can create policies for their company"
ON public.policies FOR INSERT TO authenticated
WITH CHECK (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can update their company policies"
ON public.policies FOR UPDATE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can delete their company policies"
ON public.policies FOR DELETE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

-- =============================================
-- 5. Fix allowed_merchants write policies
-- =============================================
DROP POLICY IF EXISTS "Users can create merchants for their company" ON public.allowed_merchants;
DROP POLICY IF EXISTS "Users can update their company merchants" ON public.allowed_merchants;
DROP POLICY IF EXISTS "Users can delete their company merchants" ON public.allowed_merchants;

CREATE POLICY "Managers can create merchants for their company"
ON public.allowed_merchants FOR INSERT TO authenticated
WITH CHECK (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can update their company merchants"
ON public.allowed_merchants FOR UPDATE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can delete their company merchants"
ON public.allowed_merchants FOR DELETE TO authenticated
USING (
  company_id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

-- =============================================
-- 6. Fix card_rules write policies
-- =============================================
DROP POLICY IF EXISTS "Users can create card rules for their company" ON public.card_rules;
DROP POLICY IF EXISTS "Users can update their company card rules" ON public.card_rules;
DROP POLICY IF EXISTS "Users can delete their company card rules" ON public.card_rules;

CREATE POLICY "Managers can create card rules for their company"
ON public.card_rules FOR INSERT TO authenticated
WITH CHECK (
  card_id IN (SELECT cards.id FROM cards WHERE cards.company_id IN (SELECT get_user_company_ids(auth.uid())))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can update their company card rules"
ON public.card_rules FOR UPDATE TO authenticated
USING (
  card_id IN (SELECT cards.id FROM cards WHERE cards.company_id IN (SELECT get_user_company_ids(auth.uid())))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can delete their company card rules"
ON public.card_rules FOR DELETE TO authenticated
USING (
  card_id IN (SELECT cards.id FROM cards WHERE cards.company_id IN (SELECT get_user_company_ids(auth.uid())))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

-- =============================================
-- 7. Fix card_alert_settings write policies
-- =============================================
DROP POLICY IF EXISTS "Users can create card alert settings for their company" ON public.card_alert_settings;
DROP POLICY IF EXISTS "Users can update their company card alert settings" ON public.card_alert_settings;
DROP POLICY IF EXISTS "Users can delete their company card alert settings" ON public.card_alert_settings;

CREATE POLICY "Managers can create card alert settings"
ON public.card_alert_settings FOR INSERT TO authenticated
WITH CHECK (
  card_id IN (SELECT cards.id FROM cards WHERE cards.company_id IN (SELECT get_user_company_ids(auth.uid())))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can update card alert settings"
ON public.card_alert_settings FOR UPDATE TO authenticated
USING (
  card_id IN (SELECT cards.id FROM cards WHERE cards.company_id IN (SELECT get_user_company_ids(auth.uid())))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

CREATE POLICY "Managers can delete card alert settings"
ON public.card_alert_settings FOR DELETE TO authenticated
USING (
  card_id IN (SELECT cards.id FROM cards WHERE cards.company_id IN (SELECT get_user_company_ids(auth.uid())))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);

-- =============================================
-- 8. Fix companies UPDATE policy
-- =============================================
DROP POLICY IF EXISTS "Users can update their companies" ON public.companies;

CREATE POLICY "Only owners/admins can update companies"
ON public.companies FOR UPDATE TO authenticated
USING (
  id IN (SELECT get_user_company_ids(auth.uid()))
  AND (has_role(auth.uid(), 'admin') OR EXISTS (
    SELECT 1 FROM public.company_members cm
    WHERE cm.company_id = companies.id
      AND cm.user_id = auth.uid()
      AND cm.role = 'owner'
  ))
);

-- =============================================
-- 9. Fix transactions INSERT policy
-- =============================================
DROP POLICY IF EXISTS "Users can create transactions for their company cards" ON public.transactions;

CREATE POLICY "Managers can create transactions for their company cards"
ON public.transactions FOR INSERT TO authenticated
WITH CHECK (
  card_id IN (SELECT c.id FROM cards c WHERE c.company_id IN (SELECT get_user_company_ids(auth.uid())))
  AND (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'fleet_manager'))
);
