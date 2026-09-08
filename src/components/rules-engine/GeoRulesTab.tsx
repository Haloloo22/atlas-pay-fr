import { useState } from "react";
import { Plus, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGeoRules, type ScopeType } from "@/hooks/useRulesEngine";
import { MOROCCAN_REGIONS } from "@/types/card-control";
import { ScopeSelect, SCOPE_LABELS, useScopeLabel, SyncBadgeClass, SYNC_LABELS } from "./ScopeSelect";

const ZONE_TYPES = [
  { value: "region", label: "Région" },
  { value: "city", label: "Ville" },
  { value: "radius_km", label: "Rayon (km)" },
  { value: "merchant_list", label: "Liste de marchands" },
];
const ZONE_LABEL = Object.fromEntries(ZONE_TYPES.map((z) => [z.value, z.label]));

export function GeoRulesTab() {
  const { rules, isLoading, create, remove, toggle } = useGeoRules();
  const scopeLabel = useScopeLabel();
  const [open, setOpen] = useState(false);
  const [scopeType, setScopeType] = useState<ScopeType>("card");
  const [scopeId, setScopeId] = useState("");
  const [zoneType, setZoneType] = useState("region");
  const [reference, setReference] = useState("Casablanca-Settat");
  const [lat, setLat] = useState("33.5731");
  const [lng, setLng] = useState("-7.5898");
  const [radius, setRadius] = useState("50");
  const [merchants, setMerchants] = useState("");
  const [missingPolicy, setMissingPolicy] = useState("block");
  const [isException, setIsException] = useState(false);
  const [expiresAt, setExpiresAt] = useState("");

  const valid = !!scopeId && (!isException || !!expiresAt) &&
    (zoneType === "radius_km" ? !!lat && !!lng : zoneType === "merchant_list" ? !!merchants.trim() : !!reference.trim());

  const submit = async () => {
    if (!valid) return;
    await create.mutateAsync({
      scope_type: scopeType, scope_id: scopeId, zone_type: zoneType,
      geo_reference: zoneType === "region" || zoneType === "city" ? reference.trim() : null,
      center_lat: zoneType === "radius_km" ? Number(lat) : null,
      center_lng: zoneType === "radius_km" ? Number(lng) : null,
      radius_km: zoneType === "radius_km" ? Number(radius) || 50 : null,
      merchant_whitelist: zoneType === "merchant_list" ? merchants.split(",").map((s) => s.trim()).filter(Boolean) : [],
      missing_location_policy: missingPolicy, is_exception: isException,
      expires_at: isException && expiresAt ? new Date(expiresAt).toISOString() : null,
    });
    setOpen(false);
    setScopeId("");
  };

  const describe = (r: (typeof rules)[number]) => {
    if (r.zone_type === "radius_km") return `${r.radius_km} km autour de ${r.center_lat?.toFixed(3)}, ${r.center_lng?.toFixed(3)}`;
    if (r.zone_type === "merchant_list") return r.merchant_whitelist.join(", ");
    return r.geo_reference ?? "—";
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">Restrictions géographiques</h2>
          <p className="text-sm text-muted-foreground">
            La localisation provient des données de l'émetteur à l'autorisation (RG-G1). Une exception temporaire doit porter une date d'expiration (RG-G3).
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="w-4 h-4 mr-2" />Nouvelle zone</Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader><DialogTitle>Définir une zone autorisée</DialogTitle></DialogHeader>
            <div className="space-y-4">
              <ScopeSelect scopeType={scopeType} scopeId={scopeId} onChange={(t, id) => { setScopeType(t); setScopeId(id); }} />
              <div className="space-y-1.5">
                <Label>Type de zone</Label>
                <Select value={zoneType} onValueChange={setZoneType}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{ZONE_TYPES.map((z) => <SelectItem key={z.value} value={z.value}>{z.label}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {zoneType === "region" && (
                <div className="space-y-1.5">
                  <Label>Région (référentiel Maroc)</Label>
                  <Select value={reference} onValueChange={setReference}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>{MOROCCAN_REGIONS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
              {zoneType === "city" && (
                <div className="space-y-1.5">
                  <Label>Ville</Label>
                  <Input placeholder="ex. Casablanca" value={reference} onChange={(e) => setReference(e.target.value)} />
                </div>
              )}
              {zoneType === "radius_km" && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1.5"><Label>Latitude</Label><Input value={lat} onChange={(e) => setLat(e.target.value)} /></div>
                  <div className="space-y-1.5"><Label>Longitude</Label><Input value={lng} onChange={(e) => setLng(e.target.value)} /></div>
                  <div className="space-y-1.5"><Label>Rayon (km)</Label><Input type="number" value={radius} onChange={(e) => setRadius(e.target.value)} /></div>
                </div>
              )}
              {zoneType === "merchant_list" && (
                <div className="space-y-1.5">
                  <Label>Identifiants marchand émetteur (séparés par virgule)</Label>
                  <Input placeholder="ex. AFR-CASA-012, SHL-RBT-004" value={merchants} onChange={(e) => setMerchants(e.target.value)} />
                </div>
              )}
              <div className="space-y-1.5">
                <Label>Si la localisation du marchand est absente (RG-G2)</Label>
                <Select value={missingPolicy} onValueChange={setMissingPolicy}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="block">Bloquer par prudence</SelectItem>
                    <SelectItem value="allow">Autoriser par défaut</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-3">
                <div>
                  <p className="text-sm font-medium">Exception temporaire</p>
                  <p className="text-xs text-muted-foreground">Autorisation ponctuelle hors zone, expiration obligatoire</p>
                </div>
                <Switch checked={isException} onCheckedChange={setIsException} />
              </div>
              {isException && (
                <div className="space-y-1.5">
                  <Label>Expire le</Label>
                  <Input type="datetime-local" value={expiresAt} onChange={(e) => setExpiresAt(e.target.value)} />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Annuler</Button>
              <Button onClick={submit} disabled={!valid || create.isPending}>{create.isPending ? "Synchronisation…" : "Enregistrer"}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card border border-border rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Chargement…</div>
        ) : rules.length === 0 ? (
          <div className="p-12 text-center">
            <MapPin className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium">Aucune restriction géographique</p>
            <p className="text-sm text-muted-foreground">Ex. : restreindre la carte du chauffeur X à la région Casablanca-Settat.</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Portée</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Localisation absente</TableHead>
                <TableHead>Expiration</TableHead>
                <TableHead>Synchro</TableHead>
                <TableHead>Actif</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((r) => {
                const expired = r.expires_at && new Date(r.expires_at) < new Date();
                return (
                  <TableRow key={r.id} className={expired ? "opacity-60" : ""}>
                    <TableCell>
                      <span className="text-xs text-muted-foreground mr-1">{SCOPE_LABELS[r.scope_type as ScopeType]}</span>
                      <span className="font-medium">{scopeLabel(r.scope_type, r.scope_id)}</span>
                    </TableCell>
                    <TableCell>
                      {ZONE_LABEL[r.zone_type]}
                      {r.is_exception && <Badge variant="outline" className="ml-2 text-xs">Exception</Badge>}
                    </TableCell>
                    <TableCell className="text-sm">{describe(r)}</TableCell>
                    <TableCell className="text-xs">{r.missing_location_policy === "block" ? "Bloquer" : "Autoriser"}</TableCell>
                    <TableCell className="text-xs">{r.expires_at ? new Date(r.expires_at).toLocaleString("fr-MA") + (expired ? " (expirée)" : "") : "—"}</TableCell>
                    <TableCell><Badge variant="outline" className={SyncBadgeClass(r.sync_status)}>{SYNC_LABELS[r.sync_status]}</Badge></TableCell>
                    <TableCell><Switch checked={r.is_active} onCheckedChange={() => toggle.mutate(r)} /></TableCell>
                    <TableCell className="text-right">
                      <Button size="icon" variant="ghost" className="h-8 w-8 text-destructive" onClick={() => remove.mutate(r)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
