import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useCompany = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: company, isLoading } = useQuery({
    queryKey: ["company", user?.id],
    queryFn: async () => {
      if (!user) return null;

      // First check if user has a company
      const { data: membership, error: membershipError } = await supabase
        .from("company_members")
        .select("company_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (membershipError) throw membershipError;

      if (!membership) return null;

      // Get company details
      const { data: company, error: companyError } = await supabase
        .from("companies")
        .select("*")
        .eq("id", membership.company_id)
        .single();

      if (companyError) throw companyError;

      return company;
    },
    enabled: !!user,
  });

  const createCompany = useMutation({
    mutationFn: async (companyData: { name: string; siret?: string; address?: string; city?: string; postal_code?: string; phone?: string; email?: string }) => {
      if (!user) throw new Error("Non authentifié");

      // Use the atomic function to create company and add user as owner
      const { data: companyId, error } = await supabase
        .rpc("create_company_with_owner", {
          _name: companyData.name,
          _siret: companyData.siret || null,
          _address: companyData.address || null,
          _city: companyData.city || null,
          _postal_code: companyData.postal_code || null,
          _phone: companyData.phone || null,
          _email: companyData.email || null,
        });

      if (error) throw error;

      return { id: companyId, ...companyData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
      toast.success("Entreprise créée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la création de l'entreprise");
      console.error(error);
    },
  });

  return {
    company,
    isLoading,
    createCompany,
  };
};
