import { useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useCompany } from "./useCompany";
import { toast } from "@/hooks/use-toast";

export interface Alert {
  id: string;
  company_id: string;
  card_id: string | null;
  alert_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export function useAlerts() {
  const { user } = useAuth();
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const alertsQuery = useQuery({
    queryKey: ["alerts", company?.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("alerts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Alert[];
    },
    enabled: !!user && !!company,
  });

  // Realtime subscription
  useEffect(() => {
    if (!company?.id) return;

    const channel = supabase
      .channel('alerts-realtime')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'alerts',
          filter: `company_id=eq.${company.id}`,
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["alerts", company.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [company?.id, queryClient]);

  const unreadCount = alertsQuery.data?.filter((a) => !a.is_read).length ?? 0;

  const markAsRead = useMutation({
    mutationFn: async (alertId: string) => {
      const { error } = await supabase
        .from("alerts")
        .update({ is_read: true })
        .eq("id", alertId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
    },
    onError: (error) => {
      console.error("Error marking alert as read:", error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer l'alerte comme lue",
        variant: "destructive",
      });
    },
  });

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      if (!company?.id) return;
      
      const { error } = await supabase
        .from("alerts")
        .update({ is_read: true })
        .eq("company_id", company.id)
        .eq("is_read", false);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alerts"] });
      toast({
        title: "Succès",
        description: "Toutes les alertes ont été marquées comme lues",
      });
    },
    onError: (error) => {
      console.error("Error marking all alerts as read:", error);
      toast({
        title: "Erreur",
        description: "Impossible de marquer les alertes comme lues",
        variant: "destructive",
      });
    },
  });

  return {
    alerts: alertsQuery.data ?? [],
    isLoading: alertsQuery.isLoading,
    error: alertsQuery.error,
    unreadCount,
    markAsRead,
    markAllAsRead,
  };
}
