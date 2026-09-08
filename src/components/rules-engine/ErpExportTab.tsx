import { useState } from "react";
import { Database, Play, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useErpExports, useEngineTransactions, type ErpExport } from "@/hooks/useRulesEngine";

export function ErpExportTab() {
  const { exports, run } = useErpExports();
  const { transactions } = useEngineTransactions();
  const [failureRate, setFailureRate] = useState("0");
  const [selected, setSelected] = useState<ErpExport | null>(null);

  const captured = transactions.filter((t) => t.status === "accept" && t.is_captured);
  const exportedOk = new Set(exports.filter((e) => e.status === "success").map((e) => e.transaction_id));
  const pending = captured.filter((t) => !exportedOk.has(t.id)).length;
  const success = exports.filter((e) => e.status === "success").length;
  const failed = exports.filter((e) => e.status === "failed").length;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: "Transactions capturées", value: captured.length },
          { label: "En attente d'export", value: pending },
          { label: "Écritures Odoo créées", value: success },
          { label: "Échecs (rejoués au prochain batch)", value: failed },
        ].map((k) => (
          <div key={k.label} className="bg-card border border-border rounded-2xl p-4">
            <p className="text-xs text-muted-foreground">{k.label}</p>
            <p className="text-2xl font-display font-bold">{k.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-2xl p-5 flex flex-col md:flex-row md:items-end gap-4">
        <div className="flex-1">
          <h2 className="text-lg font-semibold">Synchronisation ERP (type Odoo)</h2>
          <p className="text-sm text-muted-foreground">
            Batch quotidien par défaut, ici lancé à la demande. Chaque transaction capturée génère une écriture <code className="text-xs">account.move</code> et une ligne <code className="text-xs">account.analytic.line</code> ventilée par véhicule (RG-E1). Les transactions refusées ne sont jamais exportées. Appel Odoo simulé (MOCK).
          </p>
        </div>
        <div className="space-y-1.5 w-full md:w-52">
          <Label>Taux d'échec simulé</Label>
          <Select value={failureRate} onValueChange={setFailureRate}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0 % (Odoo disponible)</SelectItem>
              <SelectItem value="0.5">50 %</SelectItem>
              <SelectItem value="1">100 % (Odoo indisponible)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={() => run.mutate(Number(failureRate))} disabled={run.isPending}>
          <Play className="w-4 h-4 mr-2" />{run.isPending ? "Export en cours…" : "Lancer le batch"}
        </Button>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h3 className="font-semibold">Rapport de synchronisation</h3></div>
        {exports.length === 0 ? (
          <div className="p-10 text-center text-sm text-muted-foreground">
            <Database className="w-8 h-8 mx-auto mb-2" />Aucun export exécuté.
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Exporté le</TableHead>
                <TableHead>Transaction</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Réf. écriture Odoo</TableHead>
                <TableHead>Tentative</TableHead>
                <TableHead>Erreur</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {exports.map((e) => (
                <TableRow key={e.id}>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(e.exported_at).toLocaleString("fr-MA")}</TableCell>
                  <TableCell className="font-mono text-xs">FLECT-{e.transaction_id.slice(0, 8).toUpperCase()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={e.status === "success" ? "bg-primary/10 text-primary border-primary/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                      {e.status === "success" ? "Succès" : "Échec"}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{e.odoo_move_reference ?? "—"}</TableCell>
                  <TableCell className="text-xs">{e.attempts} / 3</TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[260px] truncate">{e.error_message ?? "—"}</TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setSelected(e)}><FileJson className="w-3 h-3 mr-1" />Écriture</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      <Dialog open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Écriture envoyée à Odoo</DialogTitle></DialogHeader>
          <pre className="text-xs bg-muted rounded-xl p-4 overflow-auto max-h-[60vh]">{JSON.stringify(selected?.payload, null, 2)}</pre>
        </DialogContent>
      </Dialog>
    </div>
  );
}
