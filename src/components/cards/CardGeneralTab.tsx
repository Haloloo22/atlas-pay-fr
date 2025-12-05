import { CreditCard, User, Car, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface CardGeneralTabProps {
  card: {
    id: string;
    card_number: string;
    is_active: boolean;
    created_at: string;
    driver_id: string | null;
    vehicle_id: string | null;
  };
  driverName: string;
  vehiclePlate: string;
  onToggleActive: (isActive: boolean) => void;
  isPending?: boolean;
}

export function CardGeneralTab({
  card,
  driverName,
  vehiclePlate,
  onToggleActive,
  isPending,
}: CardGeneralTabProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Informations de la carte
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Numéro de carte</span>
            <span className="font-mono font-medium">{card.card_number}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Créée le</span>
            <span className="font-medium">
              {format(new Date(card.created_at), "dd MMM yyyy", { locale: fr })}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="card-status" className="text-muted-foreground">
              Statut
            </Label>
            <div className="flex items-center gap-3">
              <Badge variant={card.is_active ? "default" : "secondary"}>
                {card.is_active ? "Active" : "Inactive"}
              </Badge>
              <Switch
                id="card-status"
                checked={card.is_active}
                onCheckedChange={onToggleActive}
                disabled={isPending}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <User className="h-5 w-5" />
            Assignation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              Chauffeur
            </div>
            <span className="font-medium">{driverName || "Non assigné"}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Car className="h-4 w-4" />
              Véhicule
            </div>
            <span className="font-medium">{vehiclePlate || "Non assigné"}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
