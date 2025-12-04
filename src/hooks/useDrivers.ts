import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCompany } from "./useCompany";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Driver = Database["public"]["Tables"]["drivers"]["Row"];
type DriverInsert = Database["public"]["Tables"]["drivers"]["Insert"];
type DriverUpdate = Database["public"]["Tables"]["drivers"]["Update"];

export const useDrivers = () => {
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const { data: drivers = [], isLoading } = useQuery({
    queryKey: ["drivers", company?.id],
    queryFn: async () => {
      if (!company) return [];

      const { data, error } = await supabase
        .from("drivers")
        .select("*")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Driver[];
    },
    enabled: !!company,
  });

  const createDriver = useMutation({
    mutationFn: async (driverData: Omit<DriverInsert, "company_id">) => {
      if (!company) throw new Error("Aucune entreprise");

      const { data, error } = await supabase
        .from("drivers")
        .insert({ ...driverData, company_id: company.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      toast.success("Chauffeur ajouté avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout du chauffeur");
      console.error(error);
    },
  });

  const updateDriver = useMutation({
    mutationFn: async ({ id, ...driverData }: DriverUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("drivers")
        .update(driverData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      toast.success("Chauffeur mis à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  const deleteDriver = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("drivers")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      toast.success("Chauffeur supprimé");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    },
  });

  return {
    drivers,
    isLoading,
    createDriver,
    updateDriver,
    deleteDriver,
  };
};
