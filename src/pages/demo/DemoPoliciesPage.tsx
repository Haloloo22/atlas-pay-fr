import { Shield, CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { demoPolicies, demoCards } from "@/data/demoData";

export default function DemoPoliciesPage() {
  const getCardCount = (policyId: string) => demoCards.filter(c => c.policy_id === policyId).length;

  const getActiveRulesCount = (p: typeof demoPolicies[0]) => {
    let count = 0;
    if (p.per_transaction_limit && p.per_transaction_limit > 0) count++;
    if (p.daily_limit && p.daily_limit > 0) count++;
    if (p.weekly_limit && p.weekly_limit > 0) count++;
    if (p.monthly_limit && p.monthly_limit > 0) count++;
    if (p.block_non_fuel_mcc) count++;
    if (p.geofencing_enabled) count++;
    if (p.allowed_hours_start && p.allowed_hours_end) count++;
    if (p.max_fills_per_day && p.max_fills_per_day > 0) count++;
    return count;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Politiques</h1>
        <p className="text-muted-foreground">Règles réutilisables appliquées aux cartes</p>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Règles actives</TableHead>
              <TableHead>Cartes liées</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {demoPolicies.map(p => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    {p.name}
                    {p.is_default && <Badge variant="secondary" className="text-xs">Par défaut</Badge>}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground max-w-xs truncate">{p.description || "—"}</TableCell>
                <TableCell><Badge variant="outline">{getActiveRulesCount(p)} règles</Badge></TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span>{getCardCount(p.id)}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
