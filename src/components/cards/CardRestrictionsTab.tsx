import { useState, useEffect } from "react";
import { Fuel, Store, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FUEL_TYPES } from "@/types/card-control";
import { useAllowedMerchants, MOROCCAN_STATIONS } from "@/hooks/useAllowedMerchants";

interface CardRestrictionsTabProps {
  card: {
    allowed_fuel_types: string[];
  };
  onSaveFuelTypes: (fuelTypes: string[]) => void;
  isPending?: boolean;
}

export function CardRestrictionsTab({
  card,
  onSaveFuelTypes,
  isPending,
}: CardRestrictionsTabProps) {
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>(
    card.allowed_fuel_types || ["diesel", "essence", "gasoil"]
  );
  const { merchants, isLoading, toggleMerchant, initializeDefaultMerchants } =
    useAllowedMerchants();

  useEffect(() => {
    setSelectedFuelTypes(card.allowed_fuel_types || ["diesel", "essence", "gasoil"]);
  }, [card.allowed_fuel_types]);

  const handleFuelTypeToggle = (fuelType: string) => {
    setSelectedFuelTypes((prev) =>
      prev.includes(fuelType)
        ? prev.filter((f) => f !== fuelType)
        : [...prev, fuelType]
    );
  };

  const handleSaveFuelTypes = () => {
    onSaveFuelTypes(selectedFuelTypes);
  };

  const hasChanges =
    JSON.stringify(selectedFuelTypes.sort()) !==
    JSON.stringify((card.allowed_fuel_types || []).sort());

  return (
    <div className="space-y-6">
      {/* Types de carburant */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="h-5 w-5" />
            Types de carburant autorisés
          </CardTitle>
          <CardDescription>
            Sélectionnez les types de carburant que cette carte peut acheter
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {FUEL_TYPES.map((fuel) => (
              <div
                key={fuel.value}
                className="flex items-center space-x-3 rounded-lg border p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleFuelTypeToggle(fuel.value)}
              >
                <Checkbox
                  id={fuel.value}
                  checked={selectedFuelTypes.includes(fuel.value)}
                  onCheckedChange={() => handleFuelTypeToggle(fuel.value)}
                />
                <Label htmlFor={fuel.value} className="cursor-pointer flex-1">
                  {fuel.label}
                </Label>
              </div>
            ))}
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleSaveFuelTypes} disabled={!hasChanges || isPending}>
              {isPending ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stations whitelist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Store className="h-5 w-5" />
            Stations-service autorisées
          </CardTitle>
          <CardDescription>
            Gérez la liste des stations où cette carte peut être utilisée
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          ) : merchants.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-muted-foreground mb-4">
                Aucune station configurée. Initialisez avec les stations marocaines.
              </p>
              <Button
                onClick={() => initializeDefaultMerchants.mutate()}
                disabled={initializeDefaultMerchants.isPending}
              >
                Initialiser les stations marocaines
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {MOROCCAN_STATIONS.map((station) => {
                const merchant = merchants.find((m) => m.brand === station.brand);
                const isWhitelisted = merchant?.is_whitelisted ?? false;

                return (
                  <div
                    key={station.brand}
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                      isWhitelisted
                        ? "border-primary/50 bg-primary/5"
                        : "hover:bg-muted/50"
                    }`}
                    onClick={() => {
                      if (merchant) {
                        toggleMerchant.mutate({
                          id: merchant.id,
                          is_whitelisted: !isWhitelisted,
                        });
                      }
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isWhitelisted
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        {isWhitelisted && <Check className="h-4 w-4" />}
                      </div>
                      <span className="font-medium">{station.brand}</span>
                    </div>
                    <Badge variant={isWhitelisted ? "default" : "secondary"}>
                      {isWhitelisted ? "Autorisé" : "Bloqué"}
                    </Badge>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
