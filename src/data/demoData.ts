// Static demo data for Bâtiment Alami & Fils — no Supabase dependency

export const demoVehicles = [
  { id: "v1", plate_number: "12345-A-1", brand: "Mitsubishi", model: "Canter", vehicle_type: "truck" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-01-15", updated_at: "2024-01-15" },
  { id: "v2", plate_number: "23456-A-3", brand: "Toyota", model: "Hilux", vehicle_type: "van" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-01-15", updated_at: "2024-01-15" },
  { id: "v3", plate_number: "34567-B-6", brand: "Isuzu", model: "NPR", vehicle_type: "truck" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-02-10", updated_at: "2024-02-10" },
  { id: "v4", plate_number: "45678-A-12", brand: "Renault", model: "Master", vehicle_type: "van" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-02-10", updated_at: "2024-02-10" },
  { id: "v5", plate_number: "56789-B-1", brand: "Mercedes", model: "Actros", vehicle_type: "truck" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-03-01", updated_at: "2024-03-01" },
  { id: "v6", plate_number: "67890-A-5", brand: "Hyundai", model: "HD72", vehicle_type: "truck" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-03-01", updated_at: "2024-03-01" },
  { id: "v7", plate_number: "78901-B-8", brand: "Peugeot", model: "Expert", vehicle_type: "van" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-03-15", updated_at: "2024-03-15" },
  { id: "v8", plate_number: "89012-A-9", brand: "Ford", model: "Transit", vehicle_type: "van" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-03-15", updated_at: "2024-03-15" },
  { id: "v9", plate_number: "90123-B-2", brand: "Mitsubishi", model: "L200", vehicle_type: "van" as const, fuel_type: "gasoil", is_active: false, company_id: "demo", created_at: "2024-04-01", updated_at: "2024-04-01" },
  { id: "v10", plate_number: "11234-A-7", brand: "Isuzu", model: "FRR", vehicle_type: "truck" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-04-01", updated_at: "2024-04-01" },
  { id: "v11", plate_number: "22345-B-4", brand: "DAF", model: "LF", vehicle_type: "truck" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-04-15", updated_at: "2024-04-15" },
  { id: "v12", plate_number: "33456-A-11", brand: "Renault", model: "Kangoo", vehicle_type: "van" as const, fuel_type: "gasoil", is_active: true, company_id: "demo", created_at: "2024-04-15", updated_at: "2024-04-15" },
];

export const demoDrivers = [
  { id: "d1", first_name: "Khalid", last_name: "Benali", email: "k.benali@alami-fils.ma", phone: "+212612345678", license_number: "AB123456", is_active: true, company_id: "demo", created_at: "2024-01-15", updated_at: "2024-01-15" },
  { id: "d2", first_name: "Youssef", last_name: "Tazi", email: "y.tazi@alami-fils.ma", phone: "+212623456789", license_number: "CD789012", is_active: true, company_id: "demo", created_at: "2024-01-15", updated_at: "2024-01-15" },
  { id: "d3", first_name: "Omar", last_name: "Chraibi", email: "o.chraibi@alami-fils.ma", phone: "+212634567890", license_number: "EF345678", is_active: true, company_id: "demo", created_at: "2024-02-10", updated_at: "2024-02-10" },
  { id: "d4", first_name: "Hassan", last_name: "El Amrani", email: "h.elamrani@alami-fils.ma", phone: "+212645678901", license_number: "GH901234", is_active: true, company_id: "demo", created_at: "2024-02-10", updated_at: "2024-02-10" },
  { id: "d5", first_name: "Rachid", last_name: "Moussaoui", email: "r.moussaoui@alami-fils.ma", phone: "+212656789012", license_number: "IJ567890", is_active: true, company_id: "demo", created_at: "2024-03-01", updated_at: "2024-03-01" },
  { id: "d6", first_name: "Amine", last_name: "Fassi", email: "a.fassi@alami-fils.ma", phone: "+212667890123", license_number: "KL123789", is_active: true, company_id: "demo", created_at: "2024-03-01", updated_at: "2024-03-01" },
  { id: "d7", first_name: "Mouad", last_name: "Benjelloun", email: "m.benjelloun@alami-fils.ma", phone: "+212678901234", license_number: "MN456012", is_active: true, company_id: "demo", created_at: "2024-03-15", updated_at: "2024-03-15" },
  { id: "d8", first_name: "Samir", last_name: "Kettani", email: "s.kettani@alami-fils.ma", phone: "+212689012345", license_number: "OP789345", is_active: false, company_id: "demo", created_at: "2024-03-15", updated_at: "2024-03-15" },
];

export const demoCards = [
  { id: "c1", card_number: "4532 **** **** 1001", driver_id: "d1", vehicle_id: "v1", policy_id: "p1", is_active: true, company_id: "demo", daily_limit: 1000, monthly_limit: 15000, created_at: "2024-01-15", updated_at: "2024-01-15" },
  { id: "c2", card_number: "4532 **** **** 1002", driver_id: "d2", vehicle_id: "v2", policy_id: "p1", is_active: true, company_id: "demo", daily_limit: 1000, monthly_limit: 15000, created_at: "2024-01-15", updated_at: "2024-01-15" },
  { id: "c3", card_number: "4532 **** **** 1003", driver_id: "d3", vehicle_id: "v3", policy_id: "p1", is_active: true, company_id: "demo", daily_limit: 1000, monthly_limit: 15000, created_at: "2024-02-10", updated_at: "2024-02-10" },
  { id: "c4", card_number: "4532 **** **** 1004", driver_id: "d4", vehicle_id: "v4", policy_id: "p2", is_active: true, company_id: "demo", daily_limit: 800, monthly_limit: 10000, created_at: "2024-02-10", updated_at: "2024-02-10" },
  { id: "c5", card_number: "4532 **** **** 1005", driver_id: "d5", vehicle_id: "v5", policy_id: "p2", is_active: true, company_id: "demo", daily_limit: 800, monthly_limit: 10000, created_at: "2024-03-01", updated_at: "2024-03-01" },
  { id: "c6", card_number: "4532 **** **** 1006", driver_id: "d6", vehicle_id: "v6", policy_id: "p1", is_active: true, company_id: "demo", daily_limit: 1000, monthly_limit: 15000, created_at: "2024-03-01", updated_at: "2024-03-01" },
  { id: "c7", card_number: "4532 **** **** 1007", driver_id: "d7", vehicle_id: "v7", policy_id: "p2", is_active: true, company_id: "demo", daily_limit: 800, monthly_limit: 10000, created_at: "2024-03-15", updated_at: "2024-03-15" },
  { id: "c8", card_number: "4532 **** **** 1008", driver_id: "d8", vehicle_id: "v8", policy_id: "p2", is_active: false, company_id: "demo", daily_limit: 800, monthly_limit: 10000, created_at: "2024-03-15", updated_at: "2024-03-15" },
  { id: "c9", card_number: "4532 **** **** 1009", driver_id: null, vehicle_id: "v9", policy_id: null, is_active: false, company_id: "demo", daily_limit: 500, monthly_limit: 5000, created_at: "2024-04-01", updated_at: "2024-04-01" },
  { id: "c10", card_number: "4532 **** **** 1010", driver_id: null, vehicle_id: "v10", policy_id: "p1", is_active: true, company_id: "demo", daily_limit: 1000, monthly_limit: 15000, created_at: "2024-04-01", updated_at: "2024-04-01" },
  { id: "c11", card_number: "4532 **** **** 1011", driver_id: null, vehicle_id: "v11", policy_id: "p1", is_active: true, company_id: "demo", daily_limit: 1000, monthly_limit: 15000, created_at: "2024-04-15", updated_at: "2024-04-15" },
  { id: "c12", card_number: "4532 **** **** 1012", driver_id: null, vehicle_id: "v12", policy_id: null, is_active: true, company_id: "demo", daily_limit: 500, monthly_limit: 5000, created_at: "2024-04-15", updated_at: "2024-04-15" },
];

export const demoPolicies = [
  { id: "p1", name: "Standard Chantier", description: "Politique standard pour les véhicules de chantier", is_default: true, per_transaction_limit: 1000, daily_limit: 1500, weekly_limit: 5000, monthly_limit: 15000, block_non_fuel_mcc: true, allow_shop_purchases: false, allowed_hours_start: "06:00", allowed_hours_end: "20:00", allowed_days: [1, 2, 3, 4, 5], geofencing_enabled: true, geofencing_regions: ["Casablanca", "Mohammedia"], max_fills_per_day: 2, max_tank_capacity_mad: 900, enforce_vehicle_fuel_type: true, allowed_fuel_types: ["gasoil"], company_id: "demo", created_at: "2024-01-15", updated_at: "2024-01-15", limit_type: "hard", per_transaction_min: 50, shop_max_amount: 0 },
  { id: "p2", name: "Livraison Urbaine", description: "Politique pour les véhicules de livraison en ville", is_default: false, per_transaction_limit: 800, daily_limit: 1000, weekly_limit: 3500, monthly_limit: 10000, block_non_fuel_mcc: true, allow_shop_purchases: true, allowed_hours_start: "05:00", allowed_hours_end: "22:00", allowed_days: [1, 2, 3, 4, 5, 6], geofencing_enabled: true, geofencing_regions: ["Casablanca"], max_fills_per_day: 3, max_tank_capacity_mad: 600, enforce_vehicle_fuel_type: true, allowed_fuel_types: ["gasoil"], company_id: "demo", created_at: "2024-02-10", updated_at: "2024-02-10", limit_type: "soft", per_transaction_min: 30, shop_max_amount: 100 },
];

const now = Date.now();
const hour = 3600_000;
const day = 24 * hour;

function makeTransaction(id: string, cardId: string, amount: number, stationName: string, stationBrand: string, liters: number, location: string, odometer: number, daysAgo: number) {
  return {
    id,
    card_id: cardId,
    amount,
    station_name: stationName,
    station_brand: stationBrand,
    fuel_type: "gasoil",
    liters,
    location,
    odometer,
    transaction_date: new Date(now - daysAgo * day).toISOString(),
    created_at: new Date(now - daysAgo * day).toISOString(),
  };
}

export const demoTransactions = [
  makeTransaction("t1", "c1", 720, "Afriquia Hay Mohammadi", "Afriquia", 52, "Casablanca", 84500, 0),
  makeTransaction("t2", "c2", 580, "TotalEnergies Ain Sebaa", "TotalEnergies", 42, "Casablanca", 62300, 0),
  makeTransaction("t3", "c3", 890, "Vivo Energy Sidi Maarouf", "Vivo Energy", 64, "Casablanca", 91200, 1),
  makeTransaction("t4", "c4", 450, "Afriquia Bernoussi", "Afriquia", 32, "Casablanca", 45600, 1),
  makeTransaction("t5", "c5", 670, "TotalEnergies Ain Sebaa", "TotalEnergies", 48, "Casablanca", 73100, 2),
  makeTransaction("t6", "c6", 540, "Afriquia Hay Mohammadi", "Afriquia", 39, "Casablanca", 56700, 2),
  makeTransaction("t7", "c7", 810, "Vivo Energy Sidi Maarouf", "Vivo Energy", 58, "Casablanca", 88400, 3),
  makeTransaction("t8", "c1", 660, "TotalEnergies Maarif", "TotalEnergies", 47, "Casablanca", 85200, 3),
  makeTransaction("t9", "c2", 490, "Afriquia Ain Chock", "Afriquia", 35, "Casablanca", 63000, 4),
  makeTransaction("t10", "c3", 780, "Vivo Energy Bouskoura", "Vivo Energy", 56, "Casablanca", 92100, 4),
  makeTransaction("t11", "c4", 520, "TotalEnergies Ain Sebaa", "TotalEnergies", 37, "Casablanca", 46200, 5),
  makeTransaction("t12", "c5", 610, "Afriquia Hay Mohammadi", "Afriquia", 44, "Casablanca", 73800, 5),
  makeTransaction("t13", "c6", 870, "Vivo Energy Sidi Maarouf", "Vivo Energy", 63, "Casablanca", 57500, 6),
  makeTransaction("t14", "c7", 430, "TotalEnergies Maarif", "TotalEnergies", 31, "Casablanca", 89100, 6),
  makeTransaction("t15", "c1", 750, "Afriquia Bernoussi", "Afriquia", 54, "Casablanca", 85900, 7),
  makeTransaction("t16", "c2", 560, "Vivo Energy Bouskoura", "Vivo Energy", 40, "Casablanca", 63700, 8),
  makeTransaction("t17", "c3", 690, "TotalEnergies Ain Sebaa", "TotalEnergies", 50, "Casablanca", 92800, 8),
  makeTransaction("t18", "c4", 480, "Afriquia Hay Mohammadi", "Afriquia", 34, "Casablanca", 46900, 9),
  makeTransaction("t19", "c5", 830, "Vivo Energy Sidi Maarouf", "Vivo Energy", 60, "Casablanca", 74500, 9),
  makeTransaction("t20", "c6", 570, "TotalEnergies Maarif", "TotalEnergies", 41, "Casablanca", 58200, 10),
  makeTransaction("t21", "c7", 640, "Afriquia Ain Chock", "Afriquia", 46, "Casablanca", 89800, 10),
  makeTransaction("t22", "c1", 910, "Vivo Energy Bouskoura", "Vivo Energy", 66, "Casablanca", 86600, 11),
  makeTransaction("t23", "c2", 500, "Afriquia Bernoussi", "Afriquia", 36, "Casablanca", 64400, 12),
  makeTransaction("t24", "c3", 730, "TotalEnergies Ain Sebaa", "TotalEnergies", 53, "Casablanca", 93500, 12),
  makeTransaction("t25", "c4", 460, "Vivo Energy Sidi Maarouf", "Vivo Energy", 33, "Casablanca", 47600, 13),
  makeTransaction("t26", "c5", 850, "Afriquia Hay Mohammadi", "Afriquia", 61, "Casablanca", 75200, 14),
  makeTransaction("t27", "c6", 590, "TotalEnergies Maarif", "TotalEnergies", 43, "Casablanca", 58900, 15),
  makeTransaction("t28", "c7", 710, "Vivo Energy Bouskoura", "Vivo Energy", 51, "Casablanca", 90500, 16),
  makeTransaction("t29", "c1", 680, "Afriquia Ain Chock", "Afriquia", 49, "Casablanca", 87300, 17),
  makeTransaction("t30", "c2", 550, "TotalEnergies Ain Sebaa", "TotalEnergies", 40, "Casablanca", 65100, 18),
  makeTransaction("t31", "c3", 820, "Afriquia Bernoussi", "Afriquia", 59, "Casablanca", 94200, 19),
  makeTransaction("t32", "c4", 470, "Vivo Energy Sidi Maarouf", "Vivo Energy", 34, "Casablanca", 48300, 20),
  makeTransaction("t33", "c5", 760, "TotalEnergies Maarif", "TotalEnergies", 55, "Casablanca", 75900, 21),
  makeTransaction("t34", "c6", 630, "Afriquia Hay Mohammadi", "Afriquia", 45, "Casablanca", 59600, 22),
  makeTransaction("t35", "c7", 840, "Vivo Energy Bouskoura", "Vivo Energy", 61, "Casablanca", 91200, 23),
  makeTransaction("t36", "c1", 510, "TotalEnergies Ain Sebaa", "TotalEnergies", 37, "Casablanca", 88000, 24),
  makeTransaction("t37", "c2", 690, "Afriquia Ain Chock", "Afriquia", 50, "Casablanca", 65800, 25),
  makeTransaction("t38", "c3", 580, "Vivo Energy Sidi Maarouf", "Vivo Energy", 42, "Casablanca", 94900, 26),
  makeTransaction("t39", "c4", 740, "Afriquia Bernoussi", "Afriquia", 53, "Casablanca", 49000, 27),
  makeTransaction("t40", "c5", 620, "TotalEnergies Maarif", "TotalEnergies", 45, "Casablanca", 76600, 28),
  makeTransaction("t41", "c6", 880, "Vivo Energy Bouskoura", "Vivo Energy", 63, "Casablanca", 60300, 29),
  makeTransaction("t42", "c7", 530, "Afriquia Hay Mohammadi", "Afriquia", 38, "Casablanca", 91900, 29),
  // Suspicious transactions
  makeTransaction("t43", "c1", 1180, "Afriquia Hay Mohammadi", "Afriquia", 85, "Casablanca", 88700, 1), // 85L for 60L tank
  makeTransaction("t44", "c2", 650, "TotalEnergies Ain Sebaa", "TotalEnergies", 47, "Casablanca", 66500, 5), // Sunday transaction
  makeTransaction("t45", "c3", 320, "Marjane Ain Sebaa", "Marjane", 0, "Casablanca", 95600, 3), // Non-fuel merchant
];

export const demoAlerts = [
  { id: "a1", alert_type: "suspicious", message: "Khalid Benali a déclaré 85L pour un véhicule avec réservoir de 60L (12345-A-1)", is_read: false, status: "pending", created_at: new Date(now - 1 * day).toISOString(), company_id: "demo", card_id: "c1" },
  { id: "a2", alert_type: "out_of_hours", message: "Youssef Tazi a effectué une transaction le dimanche 23 mars, hors de son planning Lun-Ven", is_read: false, status: "pending", created_at: new Date(now - 5 * day).toISOString(), company_id: "demo", card_id: "c2" },
  { id: "a3", alert_type: "declined", message: "Omar Chraibi a utilisé la carte chez un marchand non-carburant (Marjane Ain Sebaa)", is_read: false, status: "pending", created_at: new Date(now - 3 * day).toISOString(), company_id: "demo", card_id: "c3" },
  { id: "a4", alert_type: "limit_exceeded", message: "Carte c6 — tentative de transaction au-delà de la limite journalière (1 200 MAD / 1 000 MAD max)", is_read: true, status: "resolved", created_at: new Date(now - 10 * day).toISOString(), company_id: "demo", card_id: "c6" },
  { id: "a5", alert_type: "suspicious_activity", message: "2 pleins en moins de 3h détectés sur la carte de Mouad Benjelloun (c7)", is_read: true, status: "resolved", created_at: new Date(now - 15 * day).toISOString(), company_id: "demo", card_id: "c7" },
];

export const demoCompany = {
  id: "demo",
  name: "Bâtiment Alami & Fils",
  siret: "001234567000089",
  address: "Zone industrielle, Lot 45",
  city: "Casablanca",
  postal_code: "20200",
  phone: "+212522334455",
  email: "contact@alami-fils.ma",
  created_at: "2024-01-01",
  updated_at: "2024-01-01",
};

export const demoDashboardStats = {
  thisMonthTotal: 28_450,
  monthlyChange: -8.3,
  activeCards: 10,
  totalCards: 12,
  totalLiters: 3_820,
  unreadAlerts: 3,
  monthlySpending: [
    { month: "Nov", amount: 24_300 },
    { month: "Déc", amount: 27_100 },
    { month: "Jan", amount: 31_500 },
    { month: "Fév", amount: 29_800 },
    { month: "Mar", amount: 31_000 },
    { month: "Avr", amount: 28_450 },
  ],
  spendingByStation: [
    { name: "Afriquia Hay Mohammadi", amount: 12_400 },
    { name: "TotalEnergies Ain Sebaa", amount: 8_950 },
    { name: "Vivo Energy Sidi Maarouf", amount: 7_100 },
  ],
  spendingByVehicle: [
    { id: "v1", plate: "12345-A-1", amount: 5_200 },
    { id: "v2", plate: "23456-A-3", amount: 4_800 },
    { id: "v3", plate: "34567-B-6", amount: 4_100 },
    { id: "v4", plate: "45678-A-12", amount: 3_900 },
    { id: "v5", plate: "56789-B-1", amount: 3_650 },
  ],
  spendingByDriver: [
    { id: "d1", name: "Khalid Benali", amount: 5_800 },
    { id: "d2", name: "Youssef Tazi", amount: 4_950 },
    { id: "d3", name: "Omar Chraibi", amount: 4_200 },
    { id: "d4", name: "Hassan El Amrani", amount: 3_700 },
    { id: "d5", name: "Rachid Moussaoui", amount: 3_400 },
  ],
};
