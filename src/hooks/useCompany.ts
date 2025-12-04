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

      // Create the company
      const { data: newCompany, error: companyError } = await supabase
        .from("companies")
        .insert(companyData)
        .select()
        .single();

      if (companyError) throw companyError;

      // Add user as owner/admin of the company
      const { error: memberError } = await supabase
        .from("company_members")
        .insert({
          user_id: user.id,
          company_id: newCompany.id,
          role: "owner",
        });

      if (memberError) throw memberError;

      return newCompany;
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
