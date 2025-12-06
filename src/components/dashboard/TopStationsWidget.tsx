import { Fuel } from "lucide-react";

interface TopStationsWidgetProps {
  data: { name: string; amount: number }[];
}

export function TopStationsWidget({ data }: TopStationsWidgetProps) {
  const maxAmount = data.length > 0 ? data[0].amount : 0;

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-4">
        <Fuel className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold">Top Stations</h3>
      </div>
      
      {data.length === 0 ? (
        <p className="text-muted-foreground text-sm text-center py-6">Aucune donnée disponible</p>
      ) : (
        <div className="space-y-4">
          {data.map((station, index) => (
            <div key={station.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium flex items-center gap-2">
                  <span className="text-muted-foreground">{index + 1}.</span>
                  {station.name}
                </span>
                <span className="text-primary font-semibold">
                  {station.amount.toLocaleString("fr-MA")} MAD
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${(station.amount / maxAmount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
