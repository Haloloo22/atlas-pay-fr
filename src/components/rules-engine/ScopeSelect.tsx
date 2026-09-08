import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCards } from "@/hooks/useCards";
import { useVehicles } from "@/hooks/useVehicles";
import { useDrivers } from "@/hooks/useDrivers";
import type { ScopeType } from "@/hooks/useRulesEngine";

export const SCOPE_LABELS: Record<ScopeType, string> = { card: "Carte", vehicle: "Véhicule", driver: "Chauffeur" };

interface Props {
  scopeType: ScopeType;
  scopeId: string;
  onChange: (scopeType: ScopeType, scopeId: string) => void;
}

export function ScopeSelect({ scopeType, scopeId, onChange }: Props) {
  const { cards } = useCards();
  const { vehicles } = useVehicles();
  const { drivers } = useDrivers();

  const options =
    scopeType === "card"
      ? cards.map((c) => ({ id: c.id, label: c.card_number }))
      : scopeType === "vehicle"
        ? vehicles.map((v) => ({ id: v.id, label: `${v.plate_number}${v.brand ? ` · ${v.brand} ${v.model ?? ""}` : ""}` }))
        : drivers.map((d) => ({ id: d.id, label: `${d.first_name} ${d.last_name}` }));

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <Label>Portée</Label>
        <Select value={scopeType} onValueChange={(v) => onChange(v as ScopeType, "")}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            {(Object.keys(SCOPE_LABELS) as ScopeType[]).map((k) => (
              <SelectItem key={k} value={k}>{SCOPE_LABELS[k]}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1.5">
        <Label>{SCOPE_LABELS[scopeType]}</Label>
        <Select value={scopeId} onValueChange={(v) => onChange(scopeType, v)}>
          <SelectTrigger><SelectValue placeholder="Sélectionner…" /></SelectTrigger>
          <SelectContent>
            {options.length === 0 && <div className="px-3 py-2 text-sm text-muted-foreground">Aucun élément</div>}
            {options.map((o) => <SelectItem key={o.id} value={o.id}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

/** Résout un libellé lisible pour une portée (utilisé dans les listes). */
export function useScopeLabel() {
  const { cards } = useCards();
  const { vehicles } = useVehicles();
  const { drivers } = useDrivers();
  return (scopeType: string, scopeId: string) => {
    if (scopeType === "card") return cards.find((c) => c.id === scopeId)?.card_number ?? "Carte inconnue";
    if (scopeType === "vehicle") return vehicles.find((v) => v.id === scopeId)?.plate_number ?? "Véhicule inconnu";
    const d = drivers.find((x) => x.id === scopeId);
    return d ? `${d.first_name} ${d.last_name}` : "Chauffeur inconnu";
  };
}

export function SyncBadgeClass(status: string) {
  return status === "active"
    ? "bg-primary/10 text-primary border-primary/20"
    : status === "failed"
      ? "bg-destructive/10 text-destructive border-destructive/20"
      : "bg-muted text-muted-foreground border-border";
}

export const SYNC_LABELS: Record<string, string> = { pending: "En cours de synchronisation", active: "Actif", failed: "Échec de synchronisation" };
