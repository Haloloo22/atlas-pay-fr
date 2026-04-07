import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { demoDrivers } from "@/data/demoData";

export default function DemoDriversPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    if (!searchTerm) return demoDrivers;
    const t = searchTerm.toLowerCase();
    return demoDrivers.filter(d =>
      d.first_name.toLowerCase().includes(t) || d.last_name.toLowerCase().includes(t) || d.email?.toLowerCase().includes(t)
    );
  }, [searchTerm]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Chauffeurs</h1>
        <p className="text-muted-foreground">{demoDrivers.length} chauffeurs enregistrés</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input placeholder="Rechercher par nom, email..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Téléphone</TableHead>
              <TableHead>N° Permis</TableHead>
              <TableHead>Statut</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map(d => (
              <TableRow key={d.id}>
                <TableCell className="font-medium">{d.first_name} {d.last_name}</TableCell>
                <TableCell>{d.email || "—"}</TableCell>
                <TableCell>{d.phone || "—"}</TableCell>
                <TableCell>{d.license_number || "—"}</TableCell>
                <TableCell>
                  <Badge variant={d.is_active ? "default" : "secondary"}>{d.is_active ? "Actif" : "Inactif"}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
