import { useState, useEffect } from "react";
import { MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MOROCCAN_REGIONS } from "@/types/card-control";
import { MoroccoMap } from "./MoroccoMap";

interface CardGeofencingTabProps {
  card: {
    geofencing_enabled: boolean;
    geofencing_regions: string[];
  };
  onSave: (geofencing: {
    geofencing_enabled: boolean;
    geofencing_regions: string[];
  }) => void;
  isPending?: boolean;
}

export function CardGeofencingTab({ card, onSave, isPending }: CardGeofencingTabProps) {
  const [geofencing, setGeofencing] = useState({
    geofencing_enabled: card.geofencing_enabled ?? false,
    geofencing_regions: card.geofencing_regions || [],
  });

  useEffect(() => {
    setGeofencing({
      geofencing_enabled: card.geofencing_enabled ?? false,
      geofencing_regions: card.geofencing_regions || [],
    });
  }, [card]);

  const handleRegionToggle = (region: string) => {
    setGeofencing((prev) => ({
      ...prev,
      geofencing_regions: prev.geofencing_regions.includes(region)
        ? prev.geofencing_regions.filter((r) => r !== region)
        : [...prev.geofencing_regions, region],
    }));
  };

  const handleSave = () => {
    onSave(geofencing);
  };

  const hasChanges =
    geofencing.geofencing_enabled !== card.geofencing_enabled ||
    JSON.stringify(geofencing.geofencing_regions.sort()) !==
      JSON.stringify((card.geofencing_regions || []).sort());

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Géofencing
        </CardTitle>
        <CardDescription>
          Restreignez l'utilisation de la carte à des régions spécifiques du Maroc
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Toggle activation */}
        <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
          <div>
            <Label htmlFor="geofencing-toggle" className="font-medium">
              Activer le géofencing
            </Label>
            <p className="text-sm text-muted-foreground">
              Lorsqu'activé, la carte ne fonctionnera que dans les régions sélectionnées
            </p>
          </div>
          <Switch
            id="geofencing-toggle"
            checked={geofencing.geofencing_enabled}
            onCheckedChange={(checked) =>
              setGeofencing((prev) => ({ ...prev, geofencing_enabled: checked }))
            }
          />
        </div>

        {/* Sélection des régions */}
        <div
          className={`transition-opacity ${
            geofencing.geofencing_enabled ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <Label className="text-sm font-medium mb-3 block">
            Cliquez sur les régions pour les sélectionner / désélectionner
          </Label>

          <MoroccoMap
            selectedRegions={geofencing.geofencing_regions}
            onToggleRegion={handleRegionToggle}
            disabled={!geofencing.geofencing_enabled}
          />

          <div className="flex flex-wrap gap-2 mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setGeofencing((prev) => ({
                  ...prev,
                  geofencing_regions: ["Casablanca-Settat", "Rabat-Salé-Kénitra"],
                }))
              }
            >
              Axe Casa-Rabat
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setGeofencing((prev) => ({
                  ...prev,
                  geofencing_regions: [...MOROCCAN_REGIONS],
                }))
              }
            >
              Tout le Maroc
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setGeofencing((prev) => ({
                  ...prev,
                  geofencing_regions: [],
                }))
              }
            >
              Aucune
            </Button>
          </div>
        </div>

        {/* Info */}
        {geofencing.geofencing_enabled && geofencing.geofencing_regions.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="text-sm text-muted-foreground">Régions actives :</span>
            {geofencing.geofencing_regions.map((region) => (
              <Badge key={region} variant="secondary">
                {region}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} disabled={!hasChanges || isPending}>
            {isPending ? "Enregistrement..." : "Enregistrer le géofencing"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
