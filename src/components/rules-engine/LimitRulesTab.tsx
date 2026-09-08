import { useState } from "react";
import { Plus, Trash2, RefreshCw, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useLimitRules, type ScopeType } from "@/hooks/useRulesEngine";
import { ScopeSelect, SCOPE_LABELS, useScopeLabel, SyncBadgeClass, SYNC_LABELS } from "./ScopeSelect";

const PERIODS = [
  { value: "per_transaction", label: "Par transaction" },
  { value: "day", label: "Jour" },
  { value: "week", label: "Semaine" },
  { value: "month", label: "Mois" },
];
const PERIOD_LABEL = Object.fromEntries(PERIODS.map((p) => [p.value, p.label]));

export function LimitRulesTab() {
  const { rules, isLoading, create, update, remove, resync } = useLimitRules();
  const scopeLabel = useScopeLabel();
  const [open, setOpen] = useState(false);
  const [scopeType, setScopeType] = useState<ScopeType>("card");
  const [scopeId, setScopeId] = useState("");
  const [period, setPeriod] = useState("month");
  const [amount, setAmount] = useState("3000");
  const [mcc, setMcc] = useState("");
  const [threshold, setThreshold] = useState("80");
  const [onExceed, setOnExceed] = useState("decline");
  const [multiCard, setMultiCard] = useState("per_card");

  const submit = async () => {
    if (!scopeId || Number(amount) <= 0) return;
    await create.mutateAsync({
      scope_type: scopeType, scope_id: scopeId, period, amount: Number(amount),
      mcc_filter: mcc.split(",").map((s) => s.trim()).filter(Boolean),
      alert_threshold_pct: Number(threshold) || 80, on_exceed: onExceed, multi_card_mode: multiCard,
    });
    setOpen(false);
    setScopeId("");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Plafonds de paiement</h2>
          <p className="text-sm text-muted-foreground">
            Évalués à chaque tentative avant autorisation. Une transaction est refusée si au moins un plafond actif est dépassé (RG-P1).
            Remise à zéro au fuseau Afrique/Casablanca (RG-P3).
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Nouveau plafond</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Définir un plafond</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <ScopeSelect scopeType={scopeType} scopeId={scopeId} onChange={(t, id) => { setScopeType(t); setScopeId(id); }} />
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label>Périodicité</Label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{PERIODS.map((p) => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Montant (MAD)</Label>
                  <Input type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label>Catégories marchand (MCC, séparés par virgule)</Label>
                <Input placeholder="ex. 5541, 5542 — vide = toutes catégories carburant" value={mcc} onChange={(e) => setMcc(e.target.value)} />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <Label>Seuil d'alerte (%)</Label>
                  <Input type="number" min={1} max={100} value={threshold} onChange={(e) => setThreshold(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Au dépassement</Label>
                  <Select value={onExceed} onValueChange={setOnExceed}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="decline">Refus (decline)</SelectItem>
                      <SelectItem value="soft_warning">Autorisé + alerte</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label>Cumul multi-cartes</Label>
                  <Select value={multiCard} onValueChange={setMultiCard} disabled={scopeType === "card"}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="per_card">Par carte</SelectItem>
                      <SelectItem value="consolidated">Consolidé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button onClick={submit} disabled={!scopeId || create.isPending}>{create.isPending ? "Synchronisation…" : "Enregistrer"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Chargement…</div>
        ) : rules.length === 0 ? (
          <div className="p-12 text-center">
            <Wallet className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">Aucun plafond défini</p>
            <p className="text-sm text-muted-foreground">Ex. : plafond mensuel de 3 000 MAD sur la carte du véhicule V-123.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Portée</TableHead>
                <TableHead>Périodicité</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead>MCC</TableHead>
                <TableHead>Seuil</TableHead>
                <TableHead>Dépassement</TableHead>
                <TableHead>Synchro émetteur</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((r) => (
                <TableRow key={r.id}>
                  <TableCell>
                    <span className="text-xs text-muted-foreground mr-1">{SCOPE_LABELS[r.scope_type as ScopeType]}</span>
                    <span className="font-medium">{scopeLabel(r.scope_type, r.scope_id)}</span>
                  </TableCell>
                  <TableCell>{PERIOD_LABEL[r.period]}</TableCell>
                  <TableCell className="text-right font-mono">{Number(r.amount).toLocaleString("fr-MA")} MAD</TableCell>
                  <TableCell className="text-xs">{r.mcc_filter.length ? r.mcc_filter.join(", ") : "Carburant (tous)"}</TableCell>
                  <TableCell>{r.alert_threshold_pct} %</TableCell>
                  <TableCell className="text-xs">{r.on_exceed === "decline" ? "Refus" : "Autorisé + alerte"}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Badge variant="outline" className={SyncBadgeClass(r.sync_status)}>{SYNC_LABELS[r.sync_status]}</Badge>
                      {r.sync_status !== "active" && (
                        <Button size="icon" variant="ghost" className="h-7 w-7" title="Relancer la synchronisation" onClick={() => resync.mutate({ id: r.id })}>
                          <RefreshCw className={`w-3.5 h-3.5 ${resync.isPending ? "animate-spin" : ""}`} />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Switch checked={r.is_active} onCheckedChange={(v) => update.mutate({ id: r.id, before: r, is_active: v })} />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove.mutate(r)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
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
