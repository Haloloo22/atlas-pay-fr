import { useEffect, useState } from "react";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useAlertSettings, ALERT_TYPES } from "@/hooks/useRulesEngine";
import { useAlerts } from "@/hooks/useAlerts";

const CHANNELS = [
  { value: "email", label: "Email", icon: Mail },
  { value: "sms", label: "SMS", icon: MessageSquare },
  { value: "in_app", label: "In-app", icon: Smartphone },
];

type Draft = { channels: string[]; recipients: string; is_enabled: boolean };

export function AlertSettingsTab() {
  const { settings, upsert } = useAlertSettings();
  const { alerts, markAsRead } = useAlerts();
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});

  useEffect(() => {
    const d: Record<string, Draft> = {};
    for (const t of ALERT_TYPES) {
      const s = settings.find((x) => x.alert_type === t.value);
      d[t.value] = { channels: s?.channels ?? t.defaults, recipients: (s?.recipients ?? []).join(", "), is_enabled: s?.is_enabled ?? true };
    }
    setDrafts(d);
  }, [settings]);

  const engineTypes = new Set(ALERT_TYPES.map((t) => t.value));
  const engineAlerts = alerts.filter((a) => engineTypes.has(a.alert_type)).slice(0, 15);
  const labelOf = (t: string) => ALERT_TYPES.find((x) => x.value === t)?.label ?? t;

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Canaux et destinataires par type d'alerte</h2>
          <p className="text-sm text-muted-foreground">Par défaut, le gestionnaire de flotte reçoit toutes les alertes (RG-A2). Les destinataires supplémentaires reçoivent une copie.</p>
        </div>
        {ALERT_TYPES.map((t) => {
          const d = drafts[t.value];
          if (!d) return null;
          return (
            <div key={t.value} className="bg-card border border-border rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium">{t.label}</p>
                <Switch checked={d.is_enabled} onCheckedChange={(v) => setDrafts({ ...drafts, [t.value]: { ...d, is_enabled: v } })} />
              </div>
              <div className="flex flex-wrap gap-4">
                {CHANNELS.map((c) => (
                  <label key={c.value} className="flex items-center gap-2 text-sm cursor-pointer">
                    <Checkbox
                      checked={d.channels.includes(c.value)}
                      onCheckedChange={(v) =>
                        setDrafts({ ...drafts, [t.value]: { ...d, channels: v ? [...d.channels, c.value] : d.channels.filter((x) => x !== c.value) } })
                      }
                    />
                    <c.icon className="w-4 h-4 text-muted-foreground" />{c.label}
                  </label>
                ))}
              </div>
              <div className="flex gap-2">
                <Input placeholder="Destinataires supplémentaires (emails / numéros, séparés par virgule)" value={d.recipients}
                  onChange={(e) => setDrafts({ ...drafts, [t.value]: { ...d, recipients: e.target.value } })} />
                <Button variant="outline" disabled={upsert.isPending}
                  onClick={() => upsert.mutate({ alert_type: t.value, channels: d.channels, is_enabled: d.is_enabled, recipients: d.recipients.split(",").map((s) => s.trim()).filter(Boolean) })}>
                  Enregistrer
                </Button>
              </div>
            </div>
          );
        })}
        <p className="text-xs text-muted-foreground">L'envoi SMS / email est simulé (MOCK) — les alertes sont stockées et affichées in-app.</p>
      </div>

      <div className="lg:col-span-2 space-y-3">
        <h2 className="text-lg font-semibold">Alertes déclenchées par le moteur</h2>
        <div className="bg-card border border-border rounded-2xl divide-y divide-border">
          {engineAlerts.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              <Bell className="w-8 h-8 mx-auto mb-2" />Aucune alerte pour l'instant. Lancez une transaction dans le simulateur.
            </div>
          ) : engineAlerts.map((a) => (
            <div key={a.id} className={`p-3 ${!a.is_read ? "bg-primary/5" : ""}`}>
              <div className="flex items-center justify-between gap-2 mb-1">
                <Badge variant="outline" className={a.alert_type === "limit_exceeded" || a.alert_type === "out_of_zone" ? "bg-destructive/10 text-destructive border-destructive/20" : ""}>
                  {labelOf(a.alert_type)}
                </Badge>
                <span className="text-xs text-muted-foreground">{new Date(a.created_at).toLocaleString("fr-MA")}</span>
              </div>
              <p className="text-sm">{a.message}</p>
              {!a.is_read && (
                <button className="text-xs text-primary mt-1 hover:underline" onClick={() => markAsRead.mutate(a.id)}>Marquer comme lue</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
