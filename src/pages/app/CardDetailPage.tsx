import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CreditCard, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useDrivers } from "@/hooks/useDrivers";
import { useVehicles } from "@/hooks/useVehicles";
import { usePolicies } from "@/hooks/usePolicies";
import { CardGeneralTab } from "@/components/cards/CardGeneralTab";
import { CardAlertsTab } from "@/components/cards/CardAlertsTab";
import { CardGeofencingTab } from "@/components/cards/CardGeofencingTab";
import { CardGeofencingZonesTab } from "@/components/cards/CardGeofencingZonesTab";
import type { GeoZone } from "@/components/cards/GeofencingZonesMap";
import { toast } from "sonner";

export default function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { drivers } = useDrivers();
  const { vehicles } = useVehicles();
  const { policies } = usePolicies();

  const { data: card, isLoading } = useQuery({
    queryKey: ["card", cardId],
    queryFn: async () => {
      if (!cardId) throw new Error("Card ID manquant");

      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .eq("id", cardId)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!cardId,
  });

  const updateCard = useMutation({
    mutationFn: async (updates: Record<string, unknown>) => {
      if (!cardId) throw new Error("Card ID manquant");

      const { data, error } = await supabase
        .from("cards")
        .update(updates)
        .eq("id", cardId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["card", cardId] });
      queryClient.invalidateQueries({ queryKey: ["cards"] });
      toast.success("Carte mise à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  const getDriverName = (driverId: string | null) => {
    if (!driverId) return "";
    const driver = drivers.find((d) => d.id === driverId);
    return driver ? `${driver.first_name} ${driver.last_name}` : "";
  };

  const getVehiclePlate = (vehicleId: string | null) => {
    if (!vehicleId) return "";
    const vehicle = vehicles.find((v) => v.id === vehicleId);
    return vehicle?.plate_number || "";
  };

  const getCurrentPolicy = () => {
    if (!card?.policy_id) return null;
    return policies.find((p) => p.id === card.policy_id);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!card) {
    return (
      <div className="text-center py-24">
        <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Carte non trouvée</h2>
        <Button onClick={() => navigate("/app/cards")}>Retour aux cartes</Button>
      </div>
    );
  }

  const currentPolicy = getCurrentPolicy();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/app/cards")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Détails de la carte
          </h1>
          <p className="text-muted-foreground font-mono">{card.card_number}</p>
        </div>
      </div>

      {/* Policy Selection Card */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-primary" />
            <div>
              <h3 className="font-semibold">Politique appliquée</h3>
              <p className="text-sm text-muted-foreground">
                Les règles de cette politique s'appliquent à cette carte
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={card.policy_id || "none"}
              onValueChange={(value) => {
                updateCard.mutate({ policy_id: value === "none" ? null : value });
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sélectionner une politique" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Aucune politique</SelectItem>
                {policies.map((policy) => (
                  <SelectItem key={policy.id} value={policy.id}>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {policy.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {currentPolicy && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(`/app/policies/${currentPolicy.id}`)}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Modifier la politique
              </Button>
            )}
          </div>
        </div>

        {currentPolicy && (
          <div className="mt-4 p-4 bg-muted/50 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Limite journalière</span>
                <p className="font-semibold">{Number(currentPolicy.daily_limit).toLocaleString()} MAD</p>
              </div>
              <div>
                <span className="text-muted-foreground">Limite mensuelle</span>
                <p className="font-semibold">{Number(currentPolicy.monthly_limit).toLocaleString()} MAD</p>
              </div>
              <div>
                <span className="text-muted-foreground">Horaires</span>
                <p className="font-semibold">{currentPolicy.allowed_hours_start} - {currentPolicy.allowed_hours_end}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Géofencing</span>
                <Badge variant={currentPolicy.geofencing_enabled ? "default" : "secondary"}>
                  {currentPolicy.geofencing_enabled ? "Activé" : "Désactivé"}
                </Badge>
              </div>
            </div>
          </div>
        )}

        {!currentPolicy && (
          <div className="mt-4 p-4 bg-muted/30 rounded-lg border border-dashed border-border">
            <p className="text-sm text-muted-foreground text-center">
              Aucune politique appliquée. Sélectionnez une politique ou{" "}
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={() => navigate("/app/policies")}
              >
                créez-en une nouvelle
              </Button>
              .
            </p>
          </div>
        )}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="alerts">Alertes</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <CardGeneralTab
            card={{
              id: card.id,
              card_number: card.card_number,
              is_active: card.is_active ?? true,
              created_at: card.created_at,
              driver_id: card.driver_id,
              vehicle_id: card.vehicle_id,
            }}
            driverName={getDriverName(card.driver_id)}
            vehiclePlate={getVehiclePlate(card.vehicle_id)}
            drivers={drivers}
            vehicles={vehicles}
            onToggleActive={(isActive) => updateCard.mutate({ is_active: isActive })}
            onUpdateAssignment={(field, value) => updateCard.mutate({ [field]: value })}
            isPending={updateCard.isPending}
          />
        </TabsContent>

        <TabsContent value="alerts">
          <CardAlertsTab cardId={card.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
