import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Shield } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { demoCards, demoDrivers, demoVehicles, demoPolicies } from "@/data/demoData";

export default function DemoCardsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const getDriverName = (id: string | null) => {
    if (!id) return "—";
    const d = demoDrivers.find(d => d.id === id);
    return d ? `${d.first_name} ${d.last_name}` : "—";
  };
  const getVehiclePlate = (id: string | null) => {
    if (!id) return "—";
    return demoVehicles.find(v => v.id === id)?.plate_number || "—";
  };
  const getPolicyName = (id: string | null) => {
    if (!id) return null;
    return demoPolicies.find(p => p.id === id)?.name || null;
  };

  const filtered = useMemo(() => {
    if (!searchTerm) return demoCards;
    const t = searchTerm.toLowerCase();
    return demoCards.filter(c => {
      const driver = demoDrivers.find(d => d.id === c.driver_id);
      const vehicle = demoVehicles.find(v => v.id === c.vehicle_id);
      return c.card_number.toLowerCase().includes(t) ||
        driver?.first_name?.toLowerCase().includes(t) ||
        driver?.last_name?.toLowerCase().includes(t) ||
        vehicle?.plate_number?.toLowerCase().includes(t);
    });
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Cartes carburant</h1>
        <p className="text-muted-foreground">{demoCards.length} cartes au total</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Rechercher par numéro, chauffeur, véhicule..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>N° Carte</TableHead>
              <TableHead>Politique</TableHead>
              <TableHead>Chauffeur</TableHead>
              <TableHead>Véhicule</TableHead>
              <TableHead>Limite/jour</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(c => {
              const policyName = getPolicyName(c.policy_id);
              return (
                <TableRow key={c.id} className="cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/demo/cards/${c.id}`)}>
                  <TableCell className="font-medium font-mono">{c.card_number}</TableCell>
                  <TableCell>
                    {policyName ? (
                      <Badge variant="outline">
                        <Shield className="w-3 h-3 mr-1" />
                        {policyName}
                      </Badge>
                    ) : "—"}
                  </TableCell>
                  <TableCell>{getDriverName(c.driver_id)}</TableCell>
                  <TableCell>{getVehiclePlate(c.vehicle_id)}</TableCell>
                  <TableCell>{c.daily_limit?.toLocaleString("fr-MA")} MAD</TableCell>
                  <TableCell>
                    <Badge variant={c.is_active ? "default" : "secondary"}>{c.is_active ? "Active" : "Inactive"}</Badge>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
