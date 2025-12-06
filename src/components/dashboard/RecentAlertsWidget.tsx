import { Bell, AlertTriangle, MapPin, Clock, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { cn } from "@/lib/utils";

interface Alert {
  id: string;
  alert_type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

interface RecentAlertsWidgetProps {
  alerts: Alert[];
}

const alertIcons: Record<string, React.ElementType> = {
  limit_exceeded: AlertTriangle,
  out_of_zone: MapPin,
  out_of_hours: Clock,
  declined: XCircle,
  suspicious: AlertTriangle,
};

const alertColors: Record<string, string> = {
  limit_exceeded: "text-orange-500 bg-orange-500/10",
  out_of_zone: "text-blue-500 bg-blue-500/10",
  out_of_hours: "text-purple-500 bg-purple-500/10",
  declined: "text-red-500 bg-red-500/10",
  suspicious: "text-red-500 bg-red-500/10",
};

export function RecentAlertsWidget({ alerts }: RecentAlertsWidgetProps) {
  const recentAlerts = alerts.slice(0, 5);

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Alertes récentes</h3>
        </div>
        <Link to="/app/alerts" className="text-sm text-primary hover:underline">
          Voir tout
        </Link>
      </div>
      
      {recentAlerts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          <Bell className="w-10 h-10 mx-auto mb-2 opacity-50" />
          <p>Aucune alerte</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentAlerts.map((alert) => {
            const Icon = alertIcons[alert.alert_type] || AlertTriangle;
            const colorClass = alertColors[alert.alert_type] || "text-muted-foreground bg-muted";
            
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg transition-colors",
                  !alert.is_read && "bg-muted/50"
                )}
              >
                <div className={cn("w-9 h-9 rounded-lg flex items-center justify-center shrink-0", colorClass)}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className={cn("text-sm", !alert.is_read && "font-medium")}>
                    {alert.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {format(new Date(alert.created_at), "dd MMM à HH:mm", { locale: fr })}
                  </p>
                </div>
                {!alert.is_read && (
                  <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-2" />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
