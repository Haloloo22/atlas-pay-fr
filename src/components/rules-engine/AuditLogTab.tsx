import { ScrollText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuditLog } from "@/hooks/useRulesEngine";

const ENTITY_LABEL: Record<string, string> = {
  rule_engine_limits: "Plafond",
  rule_engine_geo: "Zone géographique",
  authorization: "Autorisation",
  erp_export: "Export ERP",
};

export function AuditLogTab() {
  const { data: entries = [], isLoading } = useAuditLog();

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold">Journal d'audit</h2>
        <p className="text-sm text-muted-foreground">Toute décision d'autorisation et toute modification de règle est journalisée avec l'état avant/après et l'acteur (§8).</p>
      </div>
      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Chargement…</div>
        ) : entries.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground"><ScrollText className="w-8 h-8 mx-auto mb-2" />Journal vide.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Horodatage</TableHead>
                <TableHead>Entité</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Acteur</TableHead>
                <TableHead>Détail</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(e.created_at).toLocaleString("fr-MA")}</TableCell>
                  <TableCell className="text-sm">{ENTITY_LABEL[e.entity] ?? e.entity}</TableCell>
                  <TableCell><Badge variant="outline">{e.action}</Badge></TableCell>
                  <TableCell className="text-xs font-mono">{e.actor ? e.actor.slice(0, 8) : "émetteur / système"}</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[420px] truncate" title={JSON.stringify(e.data_after ?? e.data_before)}>
                    {JSON.stringify(e.data_after ?? e.data_before)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
