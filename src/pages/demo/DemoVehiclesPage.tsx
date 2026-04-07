import { useState, useMemo } from "react";
import { Search, Car } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { demoVehicles } from "@/data/demoData";

const vehicleTypeLabels: Record<string, string> = {
  car: "Voiture", truck: "Camion", van: "Utilitaire", motorcycle: "Moto",
};

export default function DemoVehiclesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    if (!searchTerm) return demoVehicles;
    const t = searchTerm.toLowerCase();
    return demoVehicles.filter(v =>
      v.plate_number.toLowerCase().includes(t) || v.brand?.toLowerCase().includes(t) || v.model?.toLowerCase().includes(t)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Véhicules</h1>
        <p className="text-muted-foreground">Flotte de Bâtiment Alami &amp; Fils — {demoVehicles.length} véhicules</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Rechercher par immatriculation, marque..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Immatriculation</TableHead>
              <TableHead>Marque / Modèle</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Carburant</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(v => (
              <TableRow key={v.id}>
                <TableCell className="font-medium">{v.plate_number}</TableCell>
                <TableCell>{v.brand} {v.model}</TableCell>
                <TableCell>{vehicleTypeLabels[v.vehicle_type] || v.vehicle_type}</TableCell>
                <TableCell>{v.fuel_type}</TableCell>
                <TableCell>
                  <Badge variant={v.is_active ? "default" : "secondary"}>{v.is_active ? "Actif" : "Inactif"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
