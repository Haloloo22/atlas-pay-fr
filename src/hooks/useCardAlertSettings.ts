import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CardAlertSettings {
  id: string;
  card_id: string;
  alert_on_declined: boolean;
  alert_on_out_of_hours: boolean;
  alert_on_out_of_zone: boolean;
  alert_on_limit_exceeded: boolean;
  alert_on_suspicious: boolean;
  notify_email: boolean;
  notify_sms: boolean;
  notify_app: boolean;
  created_at: string;
  updated_at: string;
}

export const useCardAlertSettings = (cardId: string | undefined) => {
  const queryClient = useQueryClient();

  const { data: alertSettings, isLoading } = useQuery({
    queryKey: ["card-alert-settings", cardId],
    queryFn: async () => {
      if (!cardId) return null;

      const { data, error } = await supabase
        .from("card_alert_settings")
        .select("*")
        .eq("card_id", cardId)
        .maybeSingle();

      if (error) throw error;
      return data as CardAlertSettings | null;
    },
    enabled: !!cardId,
  });

  const upsertSettings = useMutation({
    mutationFn: async (settings: Partial<Omit<CardAlertSettings, "id" | "card_id" | "created_at" | "updated_at">>) => {
      if (!cardId) throw new Error("Card ID manquant");

      // Check if settings exist
      const { data: existing } = await supabase
        .from("card_alert_settings")
        .select("id")
        .eq("card_id", cardId)
        .maybeSingle();

      if (existing) {
        // Update
        const { data, error } = await supabase
          .from("card_alert_settings")
          .update(settings)
          .eq("card_id", cardId)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // Insert
        const { data, error } = await supabase
          .from("card_alert_settings")
          .insert({ card_id: cardId, ...settings })
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card-alert-settings", cardId] });
      toast.success("Paramètres d'alerte mis à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  return {
    alertSettings,
    isLoading,
    upsertSettings,
  };
};
