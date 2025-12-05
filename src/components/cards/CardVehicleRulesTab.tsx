import { useState, useEffect } from "react";
import { Car, Fuel, GaugeCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

interface CardVehicleRulesTabProps {
  card: {
    max_fills_per_day: number;
    max_tank_capacity_mad: number;
    enforce_vehicle_fuel_type: boolean;
  };
  onSave: (rules: {
    max_fills_per_day: number;
    max_tank_capacity_mad: number;
    enforce_vehicle_fuel_type: boolean;
  }) => void;
  isPending?: boolean;
}

export function CardVehicleRulesTab({ card, onSave, isPending }: CardVehicleRulesTabProps) {
  const [rules, setRules] = useState({
    max_fills_per_day: card.max_fills_per_day || 2,
    max_tank_capacity_mad: card.max_tank_capacity_mad || 800,
    enforce_vehicle_fuel_type: card.enforce_vehicle_fuel_type ?? true,
  });

  useEffect(() => {
    setRules({
      max_fills_per_day: card.max_fills_per_day || 2,
      max_tank_capacity_mad: card.max_tank_capacity_mad || 800,
      enforce_vehicle_fuel_type: card.enforce_vehicle_fuel_type ?? true,
    });
  }, [card]);

  const handleSave = () => {
    onSave(rules);
  };

  const hasChanges =
    rules.max_fills_per_day !== (card.max_fills_per_day || 2) ||
    rules.max_tank_capacity_mad !== (card.max_tank_capacity_mad || 800) ||
    rules.enforce_vehicle_fuel_type !== (card.enforce_vehicle_fuel_type ?? true);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Car className="h-5 w-5" />
          Règles liées au véhicule
        </CardTitle>
        <CardDescription>
          Configurez les restrictions basées sur les caractéristiques du véhicule
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Max fills per day */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GaugeCircle className="h-4 w-4 text-muted-foreground" />
            <Label className="text-base font-medium">Nombre maximum de pleins par jour</Label>
          </div>
          <div className="flex items-center gap-4">
            <Slider
              value={[rules.max_fills_per_day]}
              onValueChange={([val]) =>
                setRules((r) => ({ ...r, max_fills_per_day: val }))
              }
              min={1}
              max={5}
              step={1}
              className="flex-1"
            />
            <div className="w-20 flex items-center gap-1">
              <Input
                type="number"
                value={rules.max_fills_per_day}
                onChange={(e) =>
                  setRules((r) => ({
                    ...r,
                    max_fills_per_day: Number(e.target.value),
                  }))
                }
                min={1}
                max={5}
                className="text-center"
              />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Limite le nombre de transactions de type "plein" autorisées par période de 24h
          </p>
        </div>

        {/* Max tank capacity */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Fuel className="h-4 w-4 text-muted-foreground" />
            <Label className="text-base font-medium">Montant maximum par plein (réservoir)</Label>
          </div>
          <div className="flex items-center gap-4">
            <Slider
              value={[rules.max_tank_capacity_mad]}
              onValueChange={([val]) =>
                setRules((r) => ({ ...r, max_tank_capacity_mad: val }))
              }
              min={200}
              max={2000}
              step={50}
              className="flex-1"
            />
            <div className="w-28 flex items-center gap-1">
              <Input
                type="number"
                value={rules.max_tank_capacity_mad}
                onChange={(e) =>
                  setRules((r) => ({
                    ...r,
                    max_tank_capacity_mad: Number(e.target.value),
                  }))
                }
                className="text-right"
              />
              <span className="text-muted-foreground text-sm">MAD</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Bloque les transactions dépassant la capacité estimée du réservoir du véhicule
          </p>
        </div>

        {/* Enforce vehicle fuel type */}
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="space-y-1">
            <Label className="text-base font-medium">Forcer le type de carburant compatible</Label>
            <p className="text-sm text-muted-foreground">
              Autorise uniquement le carburant correspondant au véhicule assigné (diesel/essence)
            </p>
          </div>
          <Switch
            checked={rules.enforce_vehicle_fuel_type}
            onCheckedChange={(checked) =>
              setRules((r) => ({ ...r, enforce_vehicle_fuel_type: checked }))
            }
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={!hasChanges || isPending}>
            {isPending ? "Enregistrement..." : "Enregistrer les règles"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
