import { useState, useEffect } from "react";
import { MapPin, Shapes, Trash2, Circle as CircleIcon, Pentagon } from "lucide-react";
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

        {/* Zone summary cards */}
        {enabled && zones.length > 0 && (
          <div className="space-y-2 pt-2">
            <span className="text-sm font-medium text-muted-foreground">
              Zones actives ({zones.length})
            </span>
            <div className="grid gap-2">
              {zones.map((zone, i) => {
                const isCircle = zone.properties.zoneType === "circle";
                const circleZone = isCircle ? (zone as import("./GeofencingZonesMap").GeoZoneCircle) : null;
                return (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/20"
                  >
                    <div className="flex items-center gap-3">
                      {isCircle ? (
                        <CircleIcon className="h-4 w-4 text-purple-500" />
                      ) : (
                        <Pentagon className="h-4 w-4 text-blue-500" />
                      )}
                      <div>
                        <p className="text-sm font-medium">
                          {isCircle ? "Cercle" : "Polygone"} #{i + 1}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {isCircle && circleZone
                            ? `Rayon : ${Math.round(circleZone.properties.radius)} m`
                            : `${(zone as import("./GeofencingZonesMap").GeoZonePolygon).geometry.coordinates[0].length - 1} sommets`}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => {
                        setZones((prev) => prev.filter((_, idx) => idx !== i));
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                );
              })}
            </div>
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
