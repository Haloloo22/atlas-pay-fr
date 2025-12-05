import { useState, useEffect } from "react";
import { Bell, Mail, MessageSquare, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useCardAlertSettings } from "@/hooks/useCardAlertSettings";

interface CardAlertsTabProps {
  cardId: string;
}

const ALERT_TYPES = [
  {
    key: "alert_on_declined",
    label: "Transaction refusée",
    description: "Alerte lorsqu'une transaction est refusée",
  },
  {
    key: "alert_on_out_of_hours",
    label: "Hors horaires autorisés",
    description: "Alerte lors d'une tentative hors des plages horaires",
  },
  {
    key: "alert_on_out_of_zone",
    label: "Hors zone géographique",
    description: "Alerte lors d'une tentative hors des zones autorisées",
  },
  {
    key: "alert_on_limit_exceeded",
    label: "Dépassement de limite",
    description: "Alerte lorsqu'une limite de dépense est dépassée",
  },
  {
    key: "alert_on_suspicious",
    label: "Activité suspecte",
    description: "Alerte en cas de comportement frauduleux détecté",
  },
] as const;

const NOTIFICATION_CHANNELS: Array<{
  key: "notify_app" | "notify_email" | "notify_sms";
  label: string;
  description: string;
  icon: React.ElementType;
  disabled?: boolean;
  disabledReason?: string;
}> = [
  {
    key: "notify_app",
    label: "In-app",
    description: "Notifications dans l'application",
    icon: Bell,
  },
  {
    key: "notify_email",
    label: "Email",
    description: "Notifications par email",
    icon: Mail,
  },
  {
    key: "notify_sms",
    label: "SMS",
    description: "Notifications par SMS",
    icon: Smartphone,
    disabled: true,
    disabledReason: "Bientôt disponible",
  },
];

export function CardAlertsTab({ cardId }: CardAlertsTabProps) {
  const { alertSettings, isLoading, upsertSettings } = useCardAlertSettings(cardId);

  const [settings, setSettings] = useState({
    alert_on_declined: true,
    alert_on_out_of_hours: true,
    alert_on_out_of_zone: true,
    alert_on_limit_exceeded: true,
    alert_on_suspicious: true,
    notify_email: true,
    notify_sms: false,
    notify_app: true,
  });

  useEffect(() => {
    if (alertSettings) {
      setSettings({
        alert_on_declined: alertSettings.alert_on_declined,
        alert_on_out_of_hours: alertSettings.alert_on_out_of_hours,
        alert_on_out_of_zone: alertSettings.alert_on_out_of_zone,
        alert_on_limit_exceeded: alertSettings.alert_on_limit_exceeded,
        alert_on_suspicious: alertSettings.alert_on_suspicious,
        notify_email: alertSettings.notify_email,
        notify_sms: alertSettings.notify_sms,
        notify_app: alertSettings.notify_app,
      });
    }
  }, [alertSettings]);

  const handleSave = () => {
    upsertSettings.mutate(settings);
  };

  const hasChanges = alertSettings
    ? Object.keys(settings).some(
        (key) =>
          settings[key as keyof typeof settings] !==
          alertSettings[key as keyof typeof alertSettings]
      )
    : true;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Types d'alertes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Types d'alertes
          </CardTitle>
          <CardDescription>
            Sélectionnez les événements qui doivent déclencher une alerte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ALERT_TYPES.map((alertType) => (
            <div
              key={alertType.key}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="space-y-0.5">
                <Label className="text-base">{alertType.label}</Label>
                <p className="text-sm text-muted-foreground">
                  {alertType.description}
                </p>
              </div>
              <Switch
                checked={settings[alertType.key]}
                onCheckedChange={(checked) =>
                  setSettings((s) => ({ ...s, [alertType.key]: checked }))
                }
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Canaux de notification */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Canaux de notification
          </CardTitle>
          <CardDescription>
            Choisissez comment vous souhaitez recevoir les alertes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {NOTIFICATION_CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.key}
                className={`flex items-center justify-between rounded-lg border p-4 ${
                  channel.disabled ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-muted">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <Label className="text-base">{channel.label}</Label>
                    <p className="text-sm text-muted-foreground">
                      {channel.disabled
                        ? channel.disabledReason
                        : channel.description}
                    </p>
                  </div>
                </div>
                <Switch
                  checked={settings[channel.key]}
                  onCheckedChange={(checked) =>
                    setSettings((s) => ({ ...s, [channel.key]: checked }))
                  }
                  disabled={channel.disabled}
                />
              </div>
            );
          })}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={!hasChanges || upsertSettings.isPending}
        >
          {upsertSettings.isPending
            ? "Enregistrement..."
            : "Enregistrer les alertes"}
        </Button>
      </div>
    </div>
  );
}
