import { useState } from "react";
import { useAlerts } from "@/hooks/useAlerts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  AlertTriangle,
  CreditCard,
  TrendingUp,
  CheckCircle,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const alertTypeConfig: Record<
  string,
  { label: string; icon: React.ElementType; color: string }
> = {
  limit_exceeded: {
    label: "Limite dépassée",
    icon: TrendingUp,
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
  suspicious_activity: {
    label: "Activité suspecte",
    icon: AlertTriangle,
    color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
  },
  low_balance: {
    label: "Solde bas",
    icon: CreditCard,
    color: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  },
  card_blocked: {
    label: "Carte bloquée",
    icon: CreditCard,
    color: "bg-destructive/10 text-destructive border-destructive/20",
  },
};

export default function AlertsPage() {
  const { alerts, isLoading, unreadCount, markAsRead, markAllAsRead } =
    useAlerts();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAlerts = alerts.filter((alert) => {
    if (typeFilter !== "all" && alert.alert_type !== typeFilter) return false;
    if (statusFilter === "unread" && alert.is_read) return false;
    if (statusFilter === "read" && !alert.is_read) return false;
    return true;
  });

  const getAlertConfig = (type: string) => {
    return (
      alertTypeConfig[type] || {
        label: type,
        icon: Bell,
        color: "bg-muted text-muted-foreground border-border",
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Alertes</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} alerte${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}`
              : "Aucune alerte non lue"}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            onClick={() => markAllAsRead.mutate()}
            disabled={markAllAsRead.isPending}
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Type d'alerte" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="limit_exceeded">Limite dépassée</SelectItem>
                <SelectItem value="suspicious_activity">
                  Activité suspecte
                </SelectItem>
                <SelectItem value="low_balance">Solde bas</SelectItem>
                <SelectItem value="card_blocked">Carte bloquée</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="unread">Non lues</SelectItem>
                <SelectItem value="read">Lues</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Alerts List */}
      {filteredAlerts.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Bell className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-1">Aucune alerte</h3>
            <p className="text-muted-foreground text-center max-w-md">
              {alerts.length === 0
                ? "Les alertes sont générées automatiquement lorsqu'une transaction dépasse les limites, est effectuée hors zone ou en dehors des horaires autorisés."
                : "Aucune alerte ne correspond aux filtres sélectionnés"}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredAlerts.map((alert) => {
            const config = getAlertConfig(alert.alert_type);
            const Icon = config.icon;

            return (
              <Card
                key={alert.id}
                className={`transition-colors ${!alert.is_read ? "border-primary/30 bg-primary/5" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg border ${config.color}`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={config.color}>
                          {config.label}
                        </Badge>
                        {!alert.is_read && (
                          <Badge variant="default" className="bg-primary">
                            Nouveau
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm">{alert.message}</p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {format(new Date(alert.created_at), "PPp", {
                          locale: fr,
                        })}
                      </div>
                    </div>

                    {!alert.is_read && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => markAsRead.mutate(alert.id)}
                        disabled={markAsRead.isPending}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
