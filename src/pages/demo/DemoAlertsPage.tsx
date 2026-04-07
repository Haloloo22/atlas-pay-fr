import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Bell, AlertTriangle, CreditCard, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { demoAlerts } from "@/data/demoData";

const alertTypeConfig: Record<string, { label: string; icon: React.ElementType; color: string }> = {
  limit_exceeded: { label: "Limite dépassée", icon: TrendingUp, color: "bg-destructive/10 text-destructive border-destructive/20" },
  suspicious: { label: "Activité suspecte", icon: AlertTriangle, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  suspicious_activity: { label: "Activité suspecte", icon: AlertTriangle, color: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20" },
  out_of_hours: { label: "Hors horaires", icon: Clock, color: "bg-orange-500/10 text-orange-600 border-orange-500/20" },
  declined: { label: "Refusée", icon: CreditCard, color: "bg-destructive/10 text-destructive border-destructive/20" },
};

export default function DemoAlertsPage() {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const unreadCount = demoAlerts.filter(a => !a.is_read).length;

  const filtered = demoAlerts.filter(a => {
    if (typeFilter !== "all" && a.alert_type !== typeFilter) return false;
    if (statusFilter === "unread" && a.is_read) return false;
    if (statusFilter === "read" && !a.is_read) return false;
    return true;
  });

  const getConfig = (type: string) => alertTypeConfig[type] || { label: type, icon: Bell, color: "bg-muted text-muted-foreground border-border" };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Alertes</h1>
        <p className="text-muted-foreground">
          {unreadCount > 0 ? `${unreadCount} alerte${unreadCount > 1 ? "s" : ""} non lue${unreadCount > 1 ? "s" : ""}` : "Aucune alerte non lue"}
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Type d'alerte" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="suspicious">Activité suspecte</SelectItem>
                <SelectItem value="out_of_hours">Hors horaires</SelectItem>
                <SelectItem value="declined">Refusée</SelectItem>
                <SelectItem value="limit_exceeded">Limite dépassée</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[200px]"><SelectValue placeholder="Statut" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="unread">Non lues</SelectItem>
                <SelectItem value="read">Lues</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {filtered.map(alert => {
          const config = getConfig(alert.alert_type);
          const Icon = config.icon;
          return (
            <Card key={alert.id} className={`transition-colors ${!alert.is_read ? "border-primary/30 bg-primary/5" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg border ${config.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className={config.color}>{config.label}</Badge>
                      {!alert.is_read && <Badge variant="default" className="bg-primary">Nouveau</Badge>}
                    </div>
                    <p className="text-sm">{alert.message}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {format(new Date(alert.created_at), "PPp", { locale: fr })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
