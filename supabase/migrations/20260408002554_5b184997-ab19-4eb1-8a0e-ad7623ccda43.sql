ALTER TABLE public.cards
ADD COLUMN station_ids text[] NOT NULL DEFAULT '{}'::text[];

ALTER TABLE public.policies
ADD COLUMN station_ids text[] NOT NULL DEFAULT '{}'::text[];

COMMENT ON COLUMN public.cards.station_ids IS 'Array of whitelisted fuel station IDs';
COMMENT ON COLUMN public.policies.station_ids IS 'Array of whitelisted fuel station IDs';