import { useState, useMemo } from "react";
import { Search, Calendar, MapPin, Fuel } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { demoTransactions, demoCards, demoDrivers, demoVehicles } from "@/data/demoData";

export default function DemoTransactionsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const getCardNumber = (cardId: string) => demoCards.find(c => c.id === cardId)?.card_number || "—";
  const getDriverForCard = (cardId: string) => {
    const card = demoCards.find(c => c.id === cardId);
    if (!card?.driver_id) return "—";
    const d = demoDrivers.find(d => d.id === card.driver_id);
    return d ? `${d.first_name} ${d.last_name}` : "—";
  };
  const getVehicleForCard = (cardId: string) => {
    const card = demoCards.find(c => c.id === cardId);
    if (!card?.vehicle_id) return "—";
    return demoVehicles.find(v => v.id === card.vehicle_id)?.plate_number || "—";
  };

  const filtered = useMemo(() => {
    if (!searchTerm) return demoTransactions;
    const t = searchTerm.toLowerCase();
    return demoTransactions.filter(tx =>
      tx.station_name?.toLowerCase().includes(t) || tx.station_brand?.toLowerCase().includes(t) || tx.location?.toLowerCase().includes(t)
    );
  }, [searchTerm]);

  const totalAmount = filtered.reduce((s, tx) => s + tx.amount, 0);
  const totalLiters = filtered.reduce((s, tx) => s + (tx.liters || 0), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Transactions</h1>
        <p className="text-muted-foreground">Historique des transactions carburant</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Total transactions</p>
          <p className="text-2xl font-bold">{filtered.length}</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Montant total</p>
          <p className="text-2xl font-bold">{totalAmount.toLocaleString("fr-MA")} MAD</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Litres totaux</p>
          <p className="text-2xl font-bold">{totalLiters.toLocaleString("fr-MA")} L</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <p className="text-sm text-muted-foreground mb-1">Prix moyen/L</p>
          <p className="text-2xl font-bold">{totalLiters > 0 ? (totalAmount / totalLiters).toFixed(2) : "0"} MAD</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Rechercher par station, lieu..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Carte</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Chauffeur</TableHead>
              <TableHead>Station</TableHead>
              <TableHead>Carburant</TableHead>
              <TableHead className="text-right">Litres</TableHead>
              <TableHead className="text-right">Montant</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(tx => (
              <TableRow key={tx.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {format(new Date(tx.transaction_date), "dd MMM yyyy", { locale: fr })}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">{getCardNumber(tx.card_id)}</TableCell>
                <TableCell>{getVehicleForCard(tx.card_id)}</TableCell>
                <TableCell>{getDriverForCard(tx.card_id)}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{tx.station_name}</p>
                    {tx.location && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />{tx.location}
                      </p>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {tx.fuel_type && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-muted rounded-full text-xs">
                      <Fuel className="w-3 h-3" />{tx.fuel_type}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right font-medium">
                  {tx.liters ? `${tx.liters} L` : "—"}
                </TableCell>
                <TableCell className="text-right font-bold text-primary">
                  {tx.amount.toLocaleString("fr-MA")} MAD
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
