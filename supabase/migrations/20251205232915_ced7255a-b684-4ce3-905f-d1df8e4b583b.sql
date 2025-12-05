-- =====================================================
-- COMPREHENSIVE SECURITY FIXES MIGRATION
-- =====================================================

-- 1. TRANSACTIONS: Explicitly deny UPDATE and DELETE
CREATE POLICY "Deny transaction updates" ON public.transactions
  FOR UPDATE USING (false);

CREATE POLICY "Deny transaction deletes" ON public.transactions
  FOR DELETE USING (false);

-- 2. ALERTS: Restrict INSERT to system only (via service role), deny DELETE
CREATE POLICY "System can create alerts" ON public.alerts
  FOR INSERT WITH CHECK (false); -- Only service role can insert

CREATE POLICY "Deny alert deletes" ON public.alerts
  FOR DELETE USING (false);

-- 3. USER_ROLES: Protect against privilege escalation
-- Only admins can manage roles (via has_role function already exists)
CREATE POLICY "Admins can insert roles" ON public.user_roles
  FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles" ON public.user_roles
  FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles" ON public.user_roles
  FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- 4. LEADS: Restrict SELECT to admins only, deny UPDATE/DELETE
DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;

CREATE POLICY "Admins can view leads" ON public.leads
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Deny lead updates" ON public.leads
  FOR UPDATE USING (false);

CREATE POLICY "Deny lead deletes" ON public.leads
  FOR DELETE USING (false);

-- 5. COMPANY_MEMBERS: Protect role field - only owners can modify roles
-- First drop existing policies that might conflict
DROP POLICY IF EXISTS "Users can leave companies" ON public.company_members;

-- Recreate with owner-only role modification
CREATE POLICY "Users can leave their own membership" ON public.company_members
  FOR DELETE USING (user_id = auth.uid());

-- Add UPDATE policy - only company owners can update member roles
CREATE POLICY "Owners can update member roles" ON public.company_members
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.company_members cm
      WHERE cm.company_id = company_members.company_id
        AND cm.user_id = auth.uid()
        AND cm.role = 'owner'
    )
  );