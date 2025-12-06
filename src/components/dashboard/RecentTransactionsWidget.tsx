import { Receipt, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { TransactionWithDetails } from "@/hooks/useTransactions";

interface RecentTransactionsWidgetProps {
  transactions: TransactionWithDetails[];
}

export function RecentTransactionsWidget({ transactions }: RecentTransactionsWidgetProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Transactions récentes</h3>
        <Link
          to="/app/transactions"
          className="text-sm text-primary hover:underline flex items-center gap-1"
        >
          Voir tout <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      {transactions.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Receipt className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>Aucune transaction récente</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                  <Receipt className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium">{tx.station_name || tx.station_brand || "Station"}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {format(new Date(tx.transaction_date), "dd MMM yyyy à HH:mm", { locale: fr })}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-primary">
                  {Number(tx.amount).toLocaleString("fr-MA")} MAD
                </p>
                {tx.liters && (
                  <p className="text-xs text-muted-foreground">
                    {Number(tx.liters).toLocaleString("fr-MA")} L
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
