import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useDrivers } from "@/hooks/useDrivers";
import { useVehicles } from "@/hooks/useVehicles";
import { CardGeneralTab } from "@/components/cards/CardGeneralTab";
import { CardLimitsTab } from "@/components/cards/CardLimitsTab";
import { CardRestrictionsTab } from "@/components/cards/CardRestrictionsTab";
import { CardScheduleTab } from "@/components/cards/CardScheduleTab";
import { CardGeofencingTab } from "@/components/cards/CardGeofencingTab";
import { toast } from "sonner";

export default function CardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { drivers } = useDrivers();
  const { vehicles } = useVehicles();

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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/app/cards")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Configuration de la carte
          </h1>
          <p className="text-muted-foreground font-mono">{card.card_number}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="limits">Limites</TabsTrigger>
          <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
          <TabsTrigger value="schedule">Horaires</TabsTrigger>
          <TabsTrigger value="geofencing">Géofencing</TabsTrigger>
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
            onToggleActive={(isActive) => updateCard.mutate({ is_active: isActive })}
            isPending={updateCard.isPending}
          />
        </TabsContent>

        <TabsContent value="limits">
          <CardLimitsTab
            card={{
              per_transaction_limit: Number(card.per_transaction_limit) || 200,
              daily_limit: Number(card.daily_limit) || 500,
              weekly_limit: Number(card.weekly_limit) || 2000,
              monthly_limit: Number(card.monthly_limit) || 5000,
            }}
            onSave={(limits) => updateCard.mutate(limits)}
            isPending={updateCard.isPending}
          />
        </TabsContent>

        <TabsContent value="restrictions">
          <CardRestrictionsTab
            card={{
              allowed_fuel_types: card.allowed_fuel_types || ["diesel", "essence", "gasoil"],
            }}
            onSaveFuelTypes={(fuelTypes) =>
              updateCard.mutate({ allowed_fuel_types: fuelTypes })
            }
            isPending={updateCard.isPending}
          />
        </TabsContent>

        <TabsContent value="schedule">
          <CardScheduleTab
            card={{
              allowed_hours_start: card.allowed_hours_start || "06:00",
              allowed_hours_end: card.allowed_hours_end || "22:00",
              allowed_days: card.allowed_days || [1, 2, 3, 4, 5, 6, 7],
            }}
            onSave={(schedule) => updateCard.mutate(schedule)}
            isPending={updateCard.isPending}
          />
        </TabsContent>

        <TabsContent value="geofencing">
          <CardGeofencingTab
            card={{
              geofencing_enabled: card.geofencing_enabled ?? false,
              geofencing_regions: card.geofencing_regions || [],
            }}
            onSave={(geofencing) => updateCard.mutate(geofencing)}
            isPending={updateCard.isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
