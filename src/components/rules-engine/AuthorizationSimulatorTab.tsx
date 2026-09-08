import { useState } from "react";
import { Send, CheckCircle2, XCircle, PackageCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useCards } from "@/hooks/useCards";
import { useEngineTransactions } from "@/hooks/useRulesEngine";
import { MOROCCAN_REGIONS } from "@/types/card-control";

const STATIONS = [
  { id: "AFR-CASA-012", name: "Afriquia Aïn Sebaâ", city: "Casablanca", region: "Casablanca-Settat", lat: 33.6, lng: -7.53 },
  { id: "SHL-RBT-004", name: "Shell Agdal", city: "Rabat", region: "Rabat-Salé-Kénitra", lat: 33.99, lng: -6.85 },
  { id: "TOT-MRK-021", name: "TotalEnergies Guéliz", city: "Marrakech", region: "Marrakech-Safi", lat: 31.63, lng: -8.01 },
  { id: "WNX-TNG-007", name: "Winxo Tanger Ville", city: "Tanger", region: "Tanger-Tétouan-Al Hoceïma", lat: 35.77, lng: -5.8 },
  { id: "UNKNOWN", name: "Marchand sans localisation", city: "", region: "", lat: null, lng: null },
];

type Result = { decision: "accept" | "decline"; motif: string | null; evaluated_rules: { rule_type: string; result: string; detail: string }[] };

export function AuthorizationSimulatorTab() {
  const { cards } = useCards();
  const { transactions, authorize, confirm } = useEngineTransactions();
  const [cardId, setCardId] = useState("");
  const [amount, setAmount] = useState("620");
  const [mcc, setMcc] = useState("5541");
  const [stationId, setStationId] = useState(STATIONS[0].id);
  const [region, setRegion] = useState<string>(STATIONS[0].region);
  const [autoCapture, setAutoCapture] = useState(true);
  const [result, setResult] = useState<Result | null>(null);

  const station = STATIONS.find((s) => s.id === stationId)!;

  const submit = async () => {
    if (!cardId) return;
    const res = await authorize.mutateAsync({
      card_id: cardId,
      issuer_transaction_id: `SIM-${Date.now()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      amount: Number(amount), mcc,
      merchant_id: station.id === "UNKNOWN" ? null : station.id,
      merchant_name: station.name,
      location_city: station.city || null,
      location_region: station.id === "UNKNOWN" ? null : region,
      lat: station.lat, lng: station.lng,
      auto_capture: autoCapture,
    });
    setResult(res);
  };

  const cardNumber = (id: string) => cards.find((c) => c.id === id)?.card_number ?? "—";

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-2xl p-5 space-y-4">
          <div>
            <h2 className="text-lg font-semibold">Simulateur d'autorisation</h2>
            <p className="text-sm text-muted-foreground">Reproduit l'appel <code className="text-xs">POST /webhooks/authorization</code> de l'émetteur (MOCK).</p>
          </div>
          <div className="space-y-1.5">
            <Label>Carte</Label>
            <Select value={cardId} onValueChange={setCardId}>
              <SelectTrigger><SelectValue placeholder="Sélectionner une carte…" /></SelectTrigger>
              <SelectContent>{cards.map((c) => <SelectItem key={c.id} value={c.id}>{c.card_number}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5"><Label>Montant (MAD)</Label><Input type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} /></div>
            <div className="space-y-1.5">
              <Label>MCC</Label>
              <Select value={mcc} onValueChange={setMcc}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5541">5541 — Station-service</SelectItem>
                  <SelectItem value="5542">5542 — Pompe automatique</SelectItem>
                  <SelectItem value="5411">5411 — Supermarché (hors carburant)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Station / marchand</Label>
            <Select value={stationId} onValueChange={(v) => { setStationId(v); const s = STATIONS.find((x) => x.id === v); if (s?.region) setRegion(s.region); }}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{STATIONS.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}{s.city ? ` (${s.city})` : ""}</SelectItem>)}</SelectContent>
            </Select>
          </div>
          {station.id !== "UNKNOWN" && (
            <div className="space-y-1.5">
              <Label>Région transmise par l'émetteur</Label>
              <Select value={region} onValueChange={setRegion}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{MOROCCAN_REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          <div className="flex items-center justify-between rounded-xl border border-border p-3">
            <div>
              <p className="text-sm font-medium">Capture immédiate</p>
              <p className="text-xs text-muted-foreground">Sinon, confirmer manuellement (webhook transaction-confirmed)</p>
            </div>
            <Switch checked={autoCapture} onCheckedChange={setAutoCapture} />
          </div>
          <Button className="w-full" onClick={submit} disabled={!cardId || authorize.isPending}>
            <Send className="w-4 h-4 mr-2" />{authorize.isPending ? "Évaluation…" : "Soumettre la demande d'autorisation"}
          </Button>
        </div>

        <div className="lg:col-span-3 bg-card border border-border rounded-2xl p-5">
          <h3 className="font-semibold mb-3">Réponse Flect → émetteur</h3>
          {!result ? (
            <p className="text-sm text-muted-foreground">Aucune demande soumise.</p>
          ) : (
            <div className="space-y-4">
              <div className={`flex items-center gap-3 rounded-xl p-4 border ${result.decision === "accept" ? "border-primary/30 bg-primary/5" : "border-destructive/30 bg-destructive/5"}`}>
                {result.decision === "accept" ? <CheckCircle2 className="w-8 h-8 text-primary" /> : <XCircle className="w-8 h-8 text-destructive" />}
                <div>
                  <p className="font-display font-bold text-xl">{result.decision === "accept" ? "ACCEPT" : "DECLINE"}</p>
                  <p className="text-sm text-muted-foreground">{result.motif ?? "Toutes les règles actives sont respectées"}</p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Règles évaluées ({result.evaluated_rules.length})</p>
                {result.evaluated_rules.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Aucune règle active ne s'applique à cette carte.</p>
                ) : (
                  <ul className="space-y-1.5">
                    {result.evaluated_rules.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Badge variant="outline" className={r.result === "pass" ? "bg-primary/10 text-primary border-primary/20" : r.result === "decline" || r.result === "fail" ? "bg-destructive/10 text-destructive border-destructive/20" : ""}>
                          {r.rule_type} · {r.result}
                        </Badge>
                        <span className="text-muted-foreground">{r.detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <pre className="text-xs bg-muted rounded-xl p-3 overflow-x-auto">{JSON.stringify({ decision: result.decision, motif: result.motif }, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border"><h3 className="font-semibold">Journal des autorisations</h3></div>
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Aucune transaction.</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Carte</TableHead>
                <TableHead>Marchand</TableHead>
                <TableHead>Région</TableHead>
                <TableHead>MCC</TableHead>
                <TableHead className="text-right">Montant</TableHead>
                <TableHead>Décision</TableHead>
                <TableHead>Motif</TableHead>
                <TableHead>Capture</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="text-xs whitespace-nowrap">{new Date(t.occurred_at).toLocaleString("fr-MA")}</TableCell>
                  <TableCell className="font-mono text-xs">{cardNumber(t.card_id)}</TableCell>
                  <TableCell className="text-sm">{t.merchant_name ?? "—"}</TableCell>
                  <TableCell className="text-xs">{t.location_region ?? "—"}</TableCell>
                  <TableCell className="text-xs">{t.mcc}</TableCell>
                  <TableCell className="text-right font-mono">{Number(t.amount).toLocaleString("fr-MA")} MAD</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={t.status === "accept" ? "bg-primary/10 text-primary border-primary/20" : "bg-destructive/10 text-destructive border-destructive/20"}>
                      {t.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground max-w-[220px] truncate">{t.decline_reason ?? "—"}</TableCell>
                  <TableCell>
                    {t.status === "decline" ? <span className="text-xs text-muted-foreground">—</span>
                      : t.is_captured ? <span className="text-xs text-primary">Capturée</span>
                      : <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => confirm.mutate(t.issuer_transaction_id)}><PackageCheck className="w-3 h-3 mr-1" />Confirmer</Button>}
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
