import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import type { Json } from "@/integrations/supabase/types";

export interface CardRule {
  id: string;
  card_id: string;
  rule_type: string;
  rule_config: Json;
  is_enabled: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface CardRuleInsert {
  card_id: string;
  rule_type: string;
  rule_config: Json;
  is_enabled?: boolean;
  priority?: number;
}

export const useCardRules = (cardId?: string) => {
  const queryClient = useQueryClient();

  const { data: rules = [], isLoading } = useQuery({
    queryKey: ["card-rules", cardId],
    queryFn: async () => {
      if (!cardId) return [];

      const { data, error } = await supabase
        .from("card_rules")
        .select("*")
        .eq("card_id", cardId)
        .order("priority", { ascending: true });

      if (error) throw error;
      return data as CardRule[];
    },
    enabled: !!cardId,
  });

  const createRule = useMutation({
    mutationFn: async (ruleData: CardRuleInsert) => {
      const { data, error } = await supabase
        .from("card_rules")
        .insert([ruleData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-rules", cardId] });
      toast.success("Règle ajoutée");
    },
    onError: (error) => {
      toast.error("Erreur lors de l'ajout de la règle");
      console.error(error);
    },
  });

  const updateRule = useMutation({
    mutationFn: async ({ id, ...ruleData }: { id: string; rule_config?: Json; is_enabled?: boolean; priority?: number }) => {
      const { data, error } = await supabase
        .from("card_rules")
        .update(ruleData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-rules", cardId] });
      toast.success("Règle mise à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  const deleteRule = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("card_rules")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-rules", cardId] });
      toast.success("Règle supprimée");
    },
    onError: (error) => {
      toast.error("Erreur lors de la suppression");
      console.error(error);
    },
  });

  const toggleRule = useMutation({
    mutationFn: async ({ id, is_enabled }: { id: string; is_enabled: boolean }) => {
      const { data, error } = await supabase
        .from("card_rules")
        .update({ is_enabled })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-rules", cardId] });
    },
    onError: (error) => {
      toast.error("Erreur lors du changement de statut");
      console.error(error);
    },
  });

  return {
    rules,
    isLoading,
    createRule,
    updateRule,
    deleteRule,
    toggleRule,
  };
};
