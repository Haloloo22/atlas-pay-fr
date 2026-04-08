ALTER TABLE public.cards
ADD COLUMN geofencing_zones jsonb NOT NULL DEFAULT '[]'::jsonb;

ALTER TABLE public.policies
ADD COLUMN geofencing_zones jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.cards.geofencing_zones IS 'Array of GeoJSON Feature objects (polygons/circles) representing authorized zones';
COMMENT ON COLUMN public.policies.geofencing_zones IS 'Array of GeoJSON Feature objects (polygons/circles) representing authorized zones';