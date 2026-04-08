
-- Re-create the policies with qualified column references
CREATE POLICY "Admins can insert roles for same company users"
  ON public.user_roles FOR INSERT
  TO authenticated
  WITH CHECK (
    has_role(auth.uid(), 'admin'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.company_members cm1
      JOIN public.company_members cm2 ON cm1.company_id = cm2.company_id
      WHERE cm1.user_id = auth.uid() AND cm2.user_id = public.user_roles.user_id
    )
  );

CREATE POLICY "Admins can update roles for same company users"
  ON public.user_roles FOR UPDATE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.company_members cm1
      JOIN public.company_members cm2 ON cm1.company_id = cm2.company_id
      WHERE cm1.user_id = auth.uid() AND cm2.user_id = public.user_roles.user_id
    )
  );

CREATE POLICY "Admins can delete roles for same company users"
  ON public.user_roles FOR DELETE
  TO authenticated
  USING (
    has_role(auth.uid(), 'admin'::app_role)
    AND EXISTS (
      SELECT 1 FROM public.company_members cm1
      JOIN public.company_members cm2 ON cm1.company_id = cm2.company_id
      WHERE cm1.user_id = auth.uid() AND cm2.user_id = public.user_roles.user_id
    )
  );
