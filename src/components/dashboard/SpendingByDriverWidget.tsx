import { User } from "lucide-react";
import { Link } from "react-router-dom";

interface SpendingByDriverWidgetProps {
  data: { id: string; name: string; amount: number }[];
}

export function SpendingByDriverWidget({ data }: SpendingByDriverWidgetProps) {
  const totalAmount = data.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Par Conducteur</h3>
        </div>
        <Link to="/app/drivers" className="text-sm text-primary hover:underline">
          Voir tout
        </Link>
      </div>
      
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-6">Aucune donnée disponible</p>
      ) : (
        <div className="space-y-3">
          {data.map((driver) => {
            const percentage = totalAmount > 0 ? (driver.amount / totalAmount) * 100 : 0;
            return (
              <div key={driver.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">{driver.name}</p>
                    <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% du total</p>
                  </div>
                </div>
                <span className="font-bold text-green-600">
                  {driver.amount.toLocaleString("fr-MA")} MAD
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
