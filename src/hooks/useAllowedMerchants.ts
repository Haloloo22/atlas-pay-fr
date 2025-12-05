import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCompany } from "./useCompany";
import { toast } from "sonner";

export interface AllowedMerchant {
  id: string;
  company_id: string;
  merchant_name: string;
  mcc_code: string | null;
  brand: string | null;
  is_whitelisted: boolean;
  created_at: string;
}

export interface AllowedMerchantInsert {
  merchant_name: string;
  mcc_code?: string | null;
  brand?: string | null;
  is_whitelisted?: boolean;
}

// Stations marocaines prédéfinies
export const MOROCCAN_STATIONS = [
  { name: "Total Maroc", brand: "Total", mcc_code: "5541" },
  { name: "Shell Maroc", brand: "Shell", mcc_code: "5541" },
  { name: "Afriquia", brand: "Afriquia", mcc_code: "5541" },
  { name: "Winxo", brand: "Winxo", mcc_code: "5541" },
  { name: "Oilibya", brand: "Oilibya", mcc_code: "5541" },
  { name: "Ziz", brand: "Ziz", mcc_code: "5541" },
];

export const useAllowedMerchants = () => {
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const { data: merchants = [], isLoading } = useQuery({
    queryKey: ["allowed-merchants", company?.id],
    queryFn: async () => {
      if (!company) return [];

      const { data, error } = await supabase
        .from("allowed_merchants")
        .select("*")
        .eq("company_id", company.id)
        .order("merchant_name", { ascending: true });

      if (error) throw error;
      return data as AllowedMerchant[];
    },
    enabled: !!company,
  });

  const createMerchant = useMutation({
    mutationFn: async (merchantData: AllowedMerchantInsert) => {
      if (!company) throw new Error("Aucune entreprise");

      const { data, error } = await supabase
        .from("allowed_merchants")
        .insert({ ...merchantData, company_id: company.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowed-merchants"] });
      toast.success("Station ajoutée");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout");
      console.error(error);
    },
  });

  const updateMerchant = useMutation({
    mutationFn: async ({ id, ...merchantData }: Partial<AllowedMerchant> & { id: string }) => {
      const { data, error } = await supabase
        .from("allowed_merchants")
        .update(merchantData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowed-merchants"] });
      toast.success("Station mise à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  const deleteMerchant = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("allowed_merchants")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowed-merchants"] });
      toast.success("Station supprimée");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    },
  });

  const toggleMerchant = useMutation({
    mutationFn: async ({ id, is_whitelisted }: { id: string; is_whitelisted: boolean }) => {
      const { data, error } = await supabase
        .from("allowed_merchants")
        .update({ is_whitelisted })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowed-merchants"] });
    },
    onError: (error) => {
      toast.error("Erreur lors du changement");
      console.error(error);
    },
  });

  // Ajouter toutes les stations marocaines par défaut
  const initializeDefaultMerchants = useMutation({
    mutationFn: async () => {
      if (!company) throw new Error("Aucune entreprise");

      const existingBrands = merchants.map((m) => m.brand);
      const newMerchants = MOROCCAN_STATIONS.filter(
        (s) => !existingBrands.includes(s.brand)
      );

      if (newMerchants.length === 0) return [];

      const { data, error } = await supabase
        .from("allowed_merchants")
        .insert(
          newMerchants.map((m) => ({
            company_id: company.id,
            merchant_name: m.name,
            brand: m.brand,
            mcc_code: m.mcc_code,
            is_whitelisted: true,
          }))
        )
        .select();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allowed-merchants"] });
      toast.success("Stations initialisées");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'initialisation");
      console.error(error);
    },
  });

  return {
    merchants,
    isLoading,
    createMerchant,
    updateMerchant,
    deleteMerchant,
    toggleMerchant,
    initializeDefaultMerchants,
  };
};
