import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, MapPin, Shapes } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { MoroccoMap } from "@/components/cards/MoroccoMap";
import { GeofencingZonesMap, type GeoZone } from "@/components/cards/GeofencingZonesMap";
import { MOROCCAN_REGIONS } from "@/types/card-control";
import { demoCards, demoDrivers, demoVehicles, demoPolicies } from "@/data/demoData";

export default function DemoCardDetailPage() {
  const { cardId } = useParams<{ cardId: string }>();
  const navigate = useNavigate();

  const card = demoCards.find((c) => c.id === cardId);
  const driver = card?.driver_id
    ? demoDrivers.find((d) => d.id === card.driver_id)
    : null;
  const vehicle = card?.vehicle_id
    ? demoVehicles.find((v) => v.id === card.vehicle_id)
    : null;
  const policy = card?.policy_id
    ? demoPolicies.find((p) => p.id === card.policy_id)
    : null;

  // Demo state for geofencing regions
  const [geofencingEnabled, setGeofencingEnabled] = useState(
    policy?.geofencing_enabled ?? false
  );
  const [selectedRegions, setSelectedRegions] = useState<string[]>(
    policy?.geofencing_regions ?? []
  );

  // Demo state for custom zones
  const [zonesEnabled, setZonesEnabled] = useState(false);
  const [zones, setZones] = useState<GeoZone[]>([]);

  const handleRegionToggle = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  if (!card) {
    return (
      <div className="text-center py-24">
        <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Carte non trouvée</h2>
        <Button onClick={() => navigate("/demo/cards")}>Retour aux cartes</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/demo/cards")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Détails de la carte
          </h1>
          <p className="text-muted-foreground font-mono">{card.card_number}</p>
        </div>
        <Badge variant={card.is_active ? "default" : "secondary"}>
          {card.is_active ? "Active" : "Inactive"}
        </Badge>
      </div>

      {/* Info summary */}
      <div className="bg-card border border-border rounded-2xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Chauffeur</span>
            <p className="font-semibold">
              {driver ? `${driver.first_name} ${driver.last_name}` : "—"}
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Véhicule</span>
            <p className="font-semibold">{vehicle?.plate_number ?? "—"}</p>
          </div>
          <div>
            <span className="text-muted-foreground">Limite/jour</span>
            <p className="font-semibold">
              {card.daily_limit?.toLocaleString("fr-MA")} MAD
            </p>
          </div>
          <div>
            <span className="text-muted-foreground">Politique</span>
            <p className="font-semibold">{policy?.name ?? "Aucune"}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="regions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid">
          <TabsTrigger value="regions" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Régions
          </TabsTrigger>
          <TabsTrigger value="zones" className="flex items-center gap-2">
            <Shapes className="h-4 w-4" />
            Zones
          </TabsTrigger>
        </TabsList>

        {/* Regions tab */}
        <TabsContent value="regions">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Géofencing par région
              </CardTitle>
              <CardDescription>
                Restreignez l'utilisation de la carte à des régions spécifiques
                du Maroc
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label htmlFor="demo-geo-toggle" className="font-medium">
                    Activer le géofencing
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    La carte ne fonctionnera que dans les régions sélectionnées
                  </p>
                </div>
                <Switch
                  id="demo-geo-toggle"
                  checked={geofencingEnabled}
                  onCheckedChange={setGeofencingEnabled}
                />
              </div>

              <div
                className={`transition-opacity ${
                  geofencingEnabled
                    ? "opacity-100"
                    : "opacity-50 pointer-events-none"
                }`}
              >
                <Label className="text-sm font-medium mb-3 block">
                  Cliquez sur les régions pour les sélectionner / désélectionner
                </Label>
                <MoroccoMap
                  selectedRegions={selectedRegions}
                  onToggleRegion={handleRegionToggle}
                  disabled={!geofencingEnabled}
                />
                <div className="flex flex-wrap gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setSelectedRegions([
                        "Casablanca-Settat",
                        "Rabat-Salé-Kénitra",
                      ])
                    }
                  >
                    Axe Casa-Rabat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRegions([...MOROCCAN_REGIONS])}
                  >
                    Tout le Maroc
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedRegions([])}
                  >
                    Aucune
                  </Button>
                </div>
              </div>

              {geofencingEnabled && selectedRegions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-sm text-muted-foreground">
                    Régions actives :
                  </span>
                  {selectedRegions.map((r) => (
                    <Badge key={r} variant="secondary">
                      {r}
                    </Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Custom zones tab */}
        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shapes className="h-5 w-5" />
                Zones personnalisées
              </CardTitle>
              <CardDescription>
                Dessinez des polygones ou des cercles directement sur la carte
                pour définir les zones autorisées
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/30">
                <div>
                  <Label htmlFor="demo-zones-toggle" className="font-medium">
                    Activer les zones personnalisées
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Les transactions hors de ces zones seront bloquées ou
                    alertées
                  </p>
                </div>
                <Switch
                  id="demo-zones-toggle"
                  checked={zonesEnabled}
                  onCheckedChange={setZonesEnabled}
                />
              </div>

              <div
                className={`transition-opacity ${
                  zonesEnabled
                    ? "opacity-100"
                    : "opacity-50 pointer-events-none"
                }`}
              >
                <Label className="text-sm font-medium mb-3 block">
                  Utilisez les outils en haut à droite pour dessiner des
                  polygones ou des cercles
                </Label>
                <GeofencingZonesMap
                  zones={zones}
                  onChange={setZones}
                  selectedRegions={selectedRegions}
                  disabled={!zonesEnabled}
                  height={480}
                />
              </div>

              {zonesEnabled && zones.length > 0 && (
                <div className="flex items-center gap-3 pt-2">
                  <span className="text-sm text-muted-foreground">
                    Zones actives :
                  </span>
                  <Badge variant="secondary">
                    {zones.filter((z) => z.properties.zoneType === "polygon").length}{" "}
                    polygone(s)
                  </Badge>
                  <Badge variant="secondary">
                    {zones.filter((z) => z.properties.zoneType === "circle").length}{" "}
                    cercle(s)
                  </Badge>
                </div>
              )}

              {zonesEnabled && zones.length === 0 && (
                <p className="text-sm text-muted-foreground italic">
                  Aucune zone dessinée. Utilisez les outils de dessin sur la
                  carte.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
