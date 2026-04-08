import { useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useCompany } from "./useCompany";
import type { Database } from "@/integrations/supabase/types";

type Transaction = Database["public"]["Tables"]["transactions"]["Row"];

export interface TransactionWithDetails extends Transaction {
  card?: {
    card_number: string;
    vehicle_id: string | null;
    driver_id: string | null;
  } | null;
}

export const useTransactions = () => {
  const { company } = useCompany();
  const queryClient = useQueryClient();

  const { data: transactions = [], isLoading } = useQuery({
    queryKey: ["transactions", company?.id],
    queryFn: async () => {
      if (!company) return [];

      // First get all cards for this company
      const { data: companyCards, error: cardsError } = await supabase
        .from("cards")
        .select("id, card_number, vehicle_id, driver_id")
        .eq("company_id", company.id);

      if (cardsError) throw cardsError;
      if (!companyCards || companyCards.length === 0) return [];

      const cardIds = companyCards.map((c) => c.id);

      // Then get all transactions for those cards
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .in("card_id", cardIds)
        .order("transaction_date", { ascending: false });

      if (error) throw error;

      // Map transactions with card details
      const transactionsWithDetails: TransactionWithDetails[] = (data || []).map((tx) => ({
        ...tx,
        card: companyCards.find((c) => c.id === tx.card_id) || null,
      }));

      return transactionsWithDetails;
    },
    enabled: !!company,
  });

  // Realtime subscription
  useEffect(() => {
    if (!company?.id) return;

    const channel = supabase
      .channel('transactions-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'transactions',
        },
        () => {
          queryClient.invalidateQueries({ queryKey: ["transactions", company.id] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [company?.id, queryClient]);

  // Calculate totals
  const totalAmount = transactions.reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  const totalLiters = transactions.reduce((sum, tx) => sum + Number(tx.liters || 0), 0);

  return {
    transactions,
    isLoading,
    totalAmount,
    totalLiters,
  };
};
