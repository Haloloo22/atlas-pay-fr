import { Car } from "lucide-react";
import { Link } from "react-router-dom";

interface SpendingByVehicleWidgetProps {
  data: { id: string; plate: string; amount: number }[];
}

export function SpendingByVehicleWidget({ data }: SpendingByVehicleWidgetProps) {
  const totalAmount = data.reduce((sum, v) => sum + v.amount, 0);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Car className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Par Véhicule</h3>
        </div>
        <Link to="/app/vehicles" className="text-sm text-primary hover:underline">
          Voir tout
        </Link>
      </div>
      
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-6">Aucune donnée disponible</p>
      ) : (
        <div className="space-y-3">
          {data.map((vehicle) => {
            const percentage = totalAmount > 0 ? (vehicle.amount / totalAmount) * 100 : 0;
            return (
              <div key={vehicle.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{vehicle.plate}</p>
                    <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}% du total</p>
                  </div>
                </div>
                <span className="font-bold text-primary">
                  {vehicle.amount.toLocaleString("fr-MA")} MAD
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
