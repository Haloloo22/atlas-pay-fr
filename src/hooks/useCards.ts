import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCompany } from "./useCompany";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Card = Database["public"]["Tables"]["cards"]["Row"];
type CardInsert = Database["public"]["Tables"]["cards"]["Insert"];
type CardUpdate = Database["public"]["Tables"]["cards"]["Update"];

export const useCards = () => {
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const { data: cards = [], isLoading } = useQuery({
    queryKey: ["cards", company?.id],
    queryFn: async () => {
      if (!company) return [];

      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("company_id", company.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Card[];
    },
    enabled: !!company,
  });

  const createCard = useMutation({
    mutationFn: async (cardData: Omit<CardInsert, "company_id">) => {
      if (!company) throw new Error("Aucune entreprise");

      const { data, error } = await supabase
        .from("cards")
        .insert({ ...cardData, company_id: company.id })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Carte ajoutée avec succès");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout de la carte");
      console.error(error);
    },
  });

  const updateCard = useMutation({
    mutationFn: async ({ id, ...cardData }: CardUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from("cards")
        .update(cardData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Carte mise à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  const deleteCard = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("cards")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Carte supprimée");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    },
  });

  return {
    cards,
    isLoading,
    createCard,
    updateCard,
    deleteCard,
  };
};
