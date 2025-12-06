import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCompany } from "./useCompany";
import { toast } from "sonner";

export interface Policy {
  id: string;
  company_id: string;
  name: string;
  description: string | null;
  is_default: boolean | null;
  per_transaction_min: number | null;
  per_transaction_limit: number | null;
  daily_limit: number | null;
  weekly_limit: number | null;
  monthly_limit: number | null;
  limit_type: string | null;
  allowed_fuel_types: string[] | null;
  block_non_fuel_mcc: boolean | null;
  allow_shop_purchases: boolean | null;
  shop_max_amount: number | null;
  allowed_hours_start: string | null;
  allowed_hours_end: string | null;
  allowed_days: number[] | null;
  geofencing_enabled: boolean | null;
  geofencing_regions: string[] | null;
  max_fills_per_day: number | null;
  max_tank_capacity_mad: number | null;
  enforce_vehicle_fuel_type: boolean | null;
  created_at: string;
  updated_at: string;
}

export type PolicyInsert = Omit<Policy, "id" | "created_at" | "updated_at" | "company_id">;
export type PolicyUpdate = Partial<PolicyInsert>;

export const usePolicies = () => {
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const { data: policies = [], isLoading } = useQuery({
    queryKey: ["policies", company?.id],
    queryFn: async () => {
      if (!company) return [];

      const { data, error } = await supabase
        .from("policies")
        .select("*")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Policy[];
    },
    enabled: !!company,
  });

  const createPolicy = useMutation({
    mutationFn: async (policyData: PolicyInsert) => {
      if (!company) throw new Error("Aucune entreprise");

      const { data, error } = await supabase
        .from("policies")
        .insert({ ...policyData, company_id: company.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Politique créée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de la création de la politique");
      console.error(error);
    },
  });

  const updatePolicy = useMutation({
    mutationFn: async ({ id, ...policyData }: PolicyUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("policies")
        .update(policyData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      queryClient.invalidateQueries({ queryKey: ["policy"] });
      toast.success("Politique mise à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  const deletePolicy = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("policies")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Politique supprimée");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    },
  });

  return {
    policies,
    isLoading,
    createPolicy,
    updatePolicy,
    deletePolicy,
  };
};

export const usePolicy = (policyId: string | undefined) => {
  return useQuery({
    queryKey: ["policy", policyId],
    queryFn: async () => {
      if (!policyId) throw new Error("Policy ID manquant");

      const { data, error } = await supabase
        .from("policies")
        .select("*")
        .eq("id", policyId)
        .single();

      if (error) throw error;
      return data as Policy;
    },
    enabled: !!policyId,
  });
};
