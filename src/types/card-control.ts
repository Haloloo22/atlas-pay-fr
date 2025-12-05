// Types pour le Card Control Engine

export interface CardWithControls {
  id: string;
  card_number: string;
  company_id: string;
  driver_id: string | null;
  vehicle_id: string | null;
  is_active: boolean;
  // Limites
  daily_limit: number;
  weekly_limit: number;
  monthly_limit: number;
  per_transaction_limit: number;
  // Restrictions carburant
  allowed_fuel_types: string[];
  // Horaires
  allowed_hours_start: string;
  allowed_hours_end: string;
  allowed_days: number[];
  // Géofencing
  geofencing_enabled: boolean;
  geofencing_regions: string[];
  // Timestamps
  created_at: string;
  updated_at: string;
}

export const FUEL_TYPES = [
  { value: "diesel", label: "Diesel" },
  { value: "essence", label: "Essence" },
  { value: "gasoil", label: "Gasoil" },
  { value: "gpl", label: "GPL" },
] as const;

export const DAYS_OF_WEEK = [
  { value: 1, label: "Lun", fullLabel: "Lundi" },
  { value: 2, label: "Mar", fullLabel: "Mardi" },
  { value: 3, label: "Mer", fullLabel: "Mercredi" },
  { value: 4, label: "Jeu", fullLabel: "Jeudi" },
  { value: 5, label: "Ven", fullLabel: "Vendredi" },
  { value: 6, label: "Sam", fullLabel: "Samedi" },
  { value: 7, label: "Dim", fullLabel: "Dimanche" },
] as const;

export const MOROCCAN_REGIONS = [
  "Casablanca-Settat",
  "Rabat-Salé-Kénitra",
  "Marrakech-Safi",
  "Fès-Meknès",
  "Tanger-Tétouan-Al Hoceïma",
  "Souss-Massa",
  "Oriental",
  "Béni Mellal-Khénifra",
  "Drâa-Tafilalet",
  "Laâyoune-Sakia El Hamra",
  "Guelmim-Oued Noun",
  "Dakhla-Oued Ed-Dahab",
] as const;

export type RuleType = 
  | "mcc_filter"
  | "product_restriction"
  | "merchant_whitelist"
  | "vehicle_limit";

export interface MCCFilterConfig {
  allowed_mcc: string[];
}

export interface ProductRestrictionConfig {
  fuel: boolean;
  snacks: boolean;
  services: boolean;
}

export interface MerchantWhitelistConfig {
  brands: string[];
}

export interface VehicleLimitConfig {
  max_liters_per_day: number;
}
