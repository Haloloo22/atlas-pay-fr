import { useEffect, useRef, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  FeatureGroup,
  Polygon,
  Circle,
  Tooltip,
  useMap,
} from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import { MOROCCO_REGIONS_GEO } from "@/data/moroccoRegions";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";

// ── GeoJSON zone types ──
export interface GeoZoneCircle {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };
  properties: {
    radius: number; // metres
    name?: string;
    zoneType: "circle";
  };
}

export interface GeoZonePolygon {
  type: "Feature";
  geometry: {
    type: "Polygon";
    coordinates: [number, number][][]; // [[[lng,lat],...]]
  };
  properties: {
    name?: string;
    zoneType: "polygon";
  };
}

export type GeoZone = GeoZoneCircle | GeoZonePolygon;

// ── Props ──
interface GeofencingZonesMapProps {
  zones: GeoZone[];
  onChange: (zones: GeoZone[]) => void;
  selectedRegions?: string[];
  disabled?: boolean;
  height?: number;
}

// Fit Morocco bounds
function FitMorocco() {
  const map = useMap();
  useEffect(() => {
    map.fitBounds([
      [21.0, -17.5],
      [36.0, -1.0],
    ]);
  }, [map]);
  return null;
}

// Convert a Leaflet layer to our GeoZone format
function layerToGeoZone(layer: L.Layer): GeoZone | null {
  if (layer instanceof L.Circle) {
    const center = layer.getLatLng();
    const radius = layer.getRadius();
    return {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [center.lng, center.lat],
      },
      properties: {
        radius,
        zoneType: "circle",
      },
    };
  }

  if (layer instanceof L.Polygon) {
    const latlngs = layer.getLatLngs()[0] as L.LatLng[];
    const coords = latlngs.map((ll) => [ll.lng, ll.lat] as [number, number]);
    // Close ring
    if (coords.length > 0) {
      coords.push(coords[0]);
    }
    return {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [coords],
      },
      properties: {
        zoneType: "polygon",
      },
    };
  }

  return null;
}

export function GeofencingZonesMap({
  zones,
  onChange,
  selectedRegions = [],
  disabled = false,
  height = 480,
}: GeofencingZonesMapProps) {
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  // Rebuild zones from all layers in the FeatureGroup
  const syncZonesFromLayers = useCallback(() => {
    if (!featureGroupRef.current) return;
    const newZones: GeoZone[] = [];
    featureGroupRef.current.eachLayer((layer) => {
      const zone = layerToGeoZone(layer);
      if (zone) newZones.push(zone);
    });
    onChange(newZones);
  }, [onChange]);

  const handleCreated = useCallback(() => {
    syncZonesFromLayers();
  }, [syncZonesFromLayers]);

  const handleEdited = useCallback(() => {
    syncZonesFromLayers();
  }, [syncZonesFromLayers]);

  const handleDeleted = useCallback(() => {
    syncZonesFromLayers();
  }, [syncZonesFromLayers]);

  return (
    <div className={`rounded-lg overflow-hidden border ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <MapContainer
        center={[29.5, -8.0]}
        zoom={5}
        scrollWheelZoom
        style={{ height, width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitMorocco />

        {/* Show selected region outlines in the background */}
        {MOROCCO_REGIONS_GEO.map((region) => {
          const isSelected = selectedRegions.includes(region.name);
          if (!isSelected) return null;
          return (
            <Polygon
              key={region.name}
              positions={region.polygon}
              pathOptions={{
                color: "hsl(142, 76%, 36%)",
                fillColor: "hsl(142, 76%, 36%)",
                fillOpacity: 0.1,
                weight: 2,
                dashArray: "6 4",
              }}
            >
              <Tooltip direction="center" permanent={false} sticky>
                <span className="font-medium text-sm">{region.name}</span>
              </Tooltip>
            </Polygon>
          );
        })}

        {/* Drawing feature group */}
        <FeatureGroup
          ref={featureGroupRef}
        >
          {!disabled && (
            <EditControl
              position="topright"
              onCreated={handleCreated}
              onEdited={handleEdited}
              onDeleted={handleDeleted}
              draw={{
                rectangle: false,
                polyline: false,
                marker: false,
                circlemarker: false,
                polygon: {
                  allowIntersection: false,
                  shapeOptions: {
                    color: "hsl(220, 70%, 50%)",
                    fillColor: "hsl(220, 70%, 50%)",
                    fillOpacity: 0.25,
                    weight: 2,
                  },
                },
                circle: {
                  shapeOptions: {
                    color: "hsl(280, 70%, 50%)",
                    fillColor: "hsl(280, 70%, 50%)",
                    fillOpacity: 0.2,
                    weight: 2,
                  },
                },
              }}
            />
          )}

          {/* Render existing zones */}
          {zones.map((zone, i) => {
            if (zone.properties.zoneType === "circle") {
              const circleZone = zone as GeoZoneCircle;
              const [lng, lat] = circleZone.geometry.coordinates;
              return (
                <Circle
                  key={`zone-circle-${i}`}
                  center={[lat, lng]}
                  radius={circleZone.properties.radius}
                  pathOptions={{
                    color: "hsl(280, 70%, 50%)",
                    fillColor: "hsl(280, 70%, 50%)",
                    fillOpacity: 0.2,
                    weight: 2,
                  }}
                >
                  <Tooltip>
                    Cercle — rayon {Math.round(circleZone.properties.radius)}m
                  </Tooltip>
                </Circle>
              );
            }

            if (zone.properties.zoneType === "polygon") {
              const polyZone = zone as GeoZonePolygon;
              const positions = polyZone.geometry.coordinates[0].map(
                ([lng, lat]) => [lat, lng] as [number, number]
              );
              return (
                <Polygon
                  key={`zone-poly-${i}`}
                  positions={positions}
                  pathOptions={{
                    color: "hsl(220, 70%, 50%)",
                    fillColor: "hsl(220, 70%, 50%)",
                    fillOpacity: 0.25,
                    weight: 2,
                  }}
                >
                  <Tooltip>Zone polygone</Tooltip>
                </Polygon>
              );
            }

            return null;
          })}
        </FeatureGroup>
      </MapContainer>
    </div>
  );
}
