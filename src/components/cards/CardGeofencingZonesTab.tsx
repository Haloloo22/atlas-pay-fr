import { useState, useEffect } from "react";
import { MapPin, Shapes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GeofencingZonesMap, type GeoZone } from "./GeofencingZonesMap";

interface CardGeofencingZonesTabProps {
  card: {
    geofencing_enabled: boolean;
    geofencing_regions: string[];
    geofencing_zones: GeoZone[];
  };
  onSave: (data: {
    geofencing_enabled: boolean;
    geofencing_regions: string[];
    geofencing_zones: GeoZone[];
  }) => void;
  isPending?: boolean;
}

export function CardGeofencingZonesTab({
  card,
  onSave,
  isPending,
}: CardGeofencingZonesTabProps) {
  const [enabled, setEnabled] = useState(card.geofencing_enabled ?? false);
  const [zones, setZones] = useState<GeoZone[]>(card.geofencing_zones ?? []);

  useEffect(() => {
    setEnabled(card.geofencing_enabled ?? false);
    setZones(card.geofencing_zones ?? []);
  }, [card]);

  const hasChanges =
    enabled !== card.geofencing_enabled ||
    JSON.stringify(zones) !== JSON.stringify(card.geofencing_zones ?? []);

  const handleSave = () => {
    onSave({
      geofencing_enabled: enabled,
      geofencing_regions: card.geofencing_regions || [],
      geofencing_zones: zones,
    });
  };

  const circleCount = zones.filter((z) => z.properties.zoneType === "circle").length;
  const polygonCount = zones.filter((z) => z.properties.zoneType === "polygon").length;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shapes className="h-5 w-5" />
          Zones de géofencing personnalisées
        </CardTitle>
        <CardDescription>
          Dessinez des polygones ou des cercles directement sur la carte pour
          définir les zones d'utilisation autorisées
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
          <div>
            <Label htmlFor="zones-toggle" className="font-medium">
              Activer les zones personnalisées
            </Label>
            <p className="text-sm text-muted-foreground">
              Les transactions hors de ces zones seront bloquées ou alertées
            </p>
          </div>
          <Switch
            id="zones-toggle"
            checked={enabled}
            onCheckedChange={setEnabled}
          />
        </div>

        {/* Map */}
        <div
          className={`transition-opacity ${
            enabled ? "opacity-100" : "opacity-50 pointer-events-none"
          }`}
        >
          <Label className="text-sm font-medium mb-3 block">
            Utilisez les outils en haut à droite de la carte pour dessiner des
            polygones ou des cercles
          </Label>

          <GeofencingZonesMap
            zones={zones}
            onChange={setZones}
            selectedRegions={card.geofencing_regions || []}
            disabled={!enabled}
            height={480}
          />
        </div>

        {/* Zone summary */}
        {enabled && zones.length > 0 && (
          <div className="flex items-center gap-3 pt-2">
            <span className="text-sm text-muted-foreground">Zones actives :</span>
            {polygonCount > 0 && (
              <Badge variant="secondary">
                {polygonCount} polygone{polygonCount > 1 ? "s" : ""}
              </Badge>
            )}
            {circleCount > 0 && (
              <Badge variant="secondary">
                {circleCount} cercle{circleCount > 1 ? "s" : ""}
              </Badge>
            )}
          </div>
        )}

        {enabled && zones.length === 0 && (
          <p className="text-sm text-muted-foreground italic">
            Aucune zone dessinée. Utilisez les outils de dessin sur la carte.
          </p>
        )}

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} disabled={!hasChanges || isPending}>
            {isPending ? "Enregistrement..." : "Enregistrer les zones"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
