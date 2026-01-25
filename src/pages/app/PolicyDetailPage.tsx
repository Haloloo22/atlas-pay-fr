import { useParams, useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { usePolicy } from "@/hooks/usePolicies";
import { useCards } from "@/hooks/useCards";
import { CardLimitsTab } from "@/components/cards/CardLimitsTab";
import { CardRestrictionsTab } from "@/components/cards/CardRestrictionsTab";
import { CardScheduleTab } from "@/components/cards/CardScheduleTab";
import { CardGeofencingTab } from "@/components/cards/CardGeofencingTab";
import { CardVehicleRulesTab } from "@/components/cards/CardVehicleRulesTab";
import { toast } from "sonner";

export default function PolicyDetailPage() {
  const { policyId } = useParams<{ policyId: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: policy, isLoading } = usePolicy(policyId);
  const { cards } = useCards();

  const linkedCards = cards.filter((c) => c.policy_id === policyId);

  const updatePolicy = useMutation({
    mutationFn: async (updates: Record<string, unknown>) => {
      if (!policyId) throw new Error("Policy ID manquant");

      const { data, error } = await supabase
        .from("policies")
        .update(updates)
        .eq("id", policyId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["policy", policyId] });
      queryClient.invalidateQueries({ queryKey: ["policies"] });
      toast.success("Politique mise à jour");
    },
    onError: (error) => {
      toast.error("Erreur lors de la mise à jour");
      console.error(error);
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!policy) {
    return (
      <div className="text-center py-24">
        <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Politique non trouvée</h2>
        <Button onClick={() => navigate("/app/policies")}>Retour aux politiques</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/app/policies")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            {policy.name}
          </h1>
          <p className="text-muted-foreground">
            {policy.description || "Aucune description"}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-muted-foreground" />
          <Badge variant="outline">{linkedCards.length} carte(s) liée(s)</Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="limits" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 lg:w-auto lg:inline-grid">
          <TabsTrigger value="limits">Limites</TabsTrigger>
          <TabsTrigger value="restrictions">Restrictions</TabsTrigger>
          <TabsTrigger value="schedule">Horaires</TabsTrigger>
          <TabsTrigger value="geofencing">Géofencing</TabsTrigger>
          <TabsTrigger value="vehicle">Véhicule</TabsTrigger>
        </TabsList>

        <TabsContent value="limits">
          <CardLimitsTab
            card={{
              per_transaction_limit: Number(policy.per_transaction_limit) || 200,
              per_transaction_min: Number(policy.per_transaction_min) || 0,
              daily_limit: Number(policy.daily_limit) || 500,
              weekly_limit: Number(policy.weekly_limit) || 2000,
              monthly_limit: Number(policy.monthly_limit) || 5000,
              limit_type: policy.limit_type || "hard",
            }}
            onSave={(limits) => updatePolicy.mutate(limits)}
            isPending={updatePolicy.isPending}
          />
        </TabsContent>

        <TabsContent value="restrictions">
          <CardRestrictionsTab
            card={{
              allowed_fuel_types: policy.allowed_fuel_types || ["diesel", "essence", "gasoil"],
              allow_shop_purchases: policy.allow_shop_purchases ?? false,
              shop_max_amount: Number(policy.shop_max_amount) || 50,
              block_non_fuel_mcc: policy.block_non_fuel_mcc ?? true,
            }}
            onSaveFuelTypes={(fuelTypes) =>
              updatePolicy.mutate({ allowed_fuel_types: fuelTypes })
            }
            onSaveShopRules={(rules) => updatePolicy.mutate(rules)}
            isPending={updatePolicy.isPending}
          />
        </TabsContent>

        <TabsContent value="schedule">
          <CardScheduleTab
            card={{
              allowed_hours_start: policy.allowed_hours_start || "06:00",
              allowed_hours_end: policy.allowed_hours_end || "22:00",
              allowed_days: policy.allowed_days || [1, 2, 3, 4, 5, 6, 7],
            }}
            onSave={(schedule) => updatePolicy.mutate(schedule)}
            isPending={updatePolicy.isPending}
          />
        </TabsContent>

        <TabsContent value="geofencing">
          <CardGeofencingTab
            card={{
              geofencing_enabled: policy.geofencing_enabled ?? false,
              geofencing_regions: policy.geofencing_regions || [],
            }}
            onSave={(geofencing) => updatePolicy.mutate(geofencing)}
            isPending={updatePolicy.isPending}
          />
        </TabsContent>

        <TabsContent value="vehicle">
          <CardVehicleRulesTab
            card={{
              max_fills_per_day: policy.max_fills_per_day || 2,
              max_tank_capacity_mad: Number(policy.max_tank_capacity_mad) || 800,
              enforce_vehicle_fuel_type: policy.enforce_vehicle_fuel_type ?? true,
            }}
            onSave={(rules) => updatePolicy.mutate(rules)}
            isPending={updatePolicy.isPending}
          />
        </TabsContent>
      </Tabs>

      {/* Linked Cards Section */}
      {linkedCards.length > 0 && (
        <div className="bg-card border border-border rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Cartes utilisant cette politique</h3>
          <div className="flex flex-wrap gap-2">
            {linkedCards.map((card) => (
              <Badge
                key={card.id}
                variant="secondary"
                className="cursor-pointer hover:bg-secondary/80"
                onClick={() => navigate(`/app/cards/${card.id}`)}
              >
                <CreditCard className="w-3 h-3 mr-1" />
                {card.card_number}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
