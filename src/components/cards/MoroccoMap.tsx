import { useEffect } from "react";
import { MapContainer, TileLayer, Polygon, Tooltip, useMap } from "react-leaflet";
import { MOROCCO_REGIONS_GEO, type MoroccoRegion } from "@/data/moroccoRegions";
import "leaflet/dist/leaflet.css";

interface MoroccoMapProps {
  selectedRegions: string[];
  onToggleRegion: (region: string) => void;
  disabled?: boolean;
}

function FitMorocco() {
  const map = useMap();
  useEffect(() => {
    map.setView([33.5731, -7.5898], 6);
  }, [map]);
  return null;
}

function RegionPolygon({
  region,
  isSelected,
  onToggle,
  disabled,
}: {
  region: MoroccoRegion;
  isSelected: boolean;
  onToggle: () => void;
  disabled?: boolean;
}) {
  return (
    <Polygon
      positions={region.polygon}
      pathOptions={{
        color: isSelected ? "hsl(142, 76%, 36%)" : "hsl(215, 20%, 65%)",
        fillColor: isSelected ? "hsl(142, 76%, 36%)" : "hsl(215, 14%, 90%)",
        fillOpacity: isSelected ? 0.4 : 0.15,
        weight: isSelected ? 3 : 1.5,
      }}
      eventHandlers={{
        click: () => {
          if (!disabled) onToggle();
        },
      }}
    >
      <Tooltip direction="center" permanent={false} sticky>
        <span className="font-medium text-sm">
          {region.name} {isSelected ? "✓" : ""}
        </span>
      </Tooltip>
    </Polygon>
  );
}

export function MoroccoMap({ selectedRegions, onToggleRegion, disabled }: MoroccoMapProps) {
  return (
    <div className={`rounded-lg overflow-hidden border ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <MapContainer
        center={[29.5, -8.0]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: 420, width: "100%" }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FitMorocco />
        {MOROCCO_REGIONS_GEO.map((region) => (
          <RegionPolygon
            key={region.name}
            region={region}
            isSelected={selectedRegions.includes(region.name)}
            onToggle={() => onToggleRegion(region.name)}
            disabled={disabled}
          />
        ))}
      </MapContainer>
    </div>
  );
}
