import { supabase } from "@/integrations/supabase/client";

const vehicles = [
  { plate_number: "24531-A-8", brand: "Renault", model: "Master", vehicle_type: "van" as const, fuel_type: "gasoil" },
  { plate_number: "31245-B-12", brand: "Mercedes", model: "Sprinter", vehicle_type: "van" as const, fuel_type: "gasoil" },
  { plate_number: "45672-H-3", brand: "Iveco", model: "Daily", vehicle_type: "van" as const, fuel_type: "gasoil" },
  { plate_number: "18734-D-22", brand: "Ford", model: "Transit", vehicle_type: "van" as const, fuel_type: "gasoil" },
  { plate_number: "52389-A-45", brand: "Renault", model: "Kangoo", vehicle_type: "van" as const, fuel_type: "gasoil" },
  { plate_number: "67821-C-7", brand: "Mercedes", model: "Actros", vehicle_type: "truck" as const, fuel_type: "gasoil" },
  { plate_number: "39104-B-31", brand: "Volvo", model: "FH16", vehicle_type: "truck" as const, fuel_type: "gasoil" },
  { plate_number: "78456-E-9", brand: "MAN", model: "TGS", vehicle_type: "truck" as const, fuel_type: "gasoil" },
  { plate_number: "42198-A-15", brand: "Scania", model: "R450", vehicle_type: "truck" as const, fuel_type: "gasoil" },
  { plate_number: "85623-D-2", brand: "DAF", model: "XF", vehicle_type: "truck" as const, fuel_type: "gasoil" },
  { plate_number: "11987-C-41", brand: "Iveco", model: "Stralis", vehicle_type: "truck" as const, fuel_type: "gasoil" },
  { plate_number: "93450-B-6", brand: "Mitsubishi", model: "Canter", vehicle_type: "truck" as const, fuel_type: "gasoil" },
];

const drivers = [
  { first_name: "Khalid", last_name: "Benali", email: "k.benali@alami-fils.ma", phone: "+212 661234567", license_number: "P234567" },
  { first_name: "Youssef", last_name: "Tazi", email: "y.tazi@alami-fils.ma", phone: "+212 662345678", license_number: "P345678" },
  { first_name: "Omar", last_name: "Chraibi", email: "o.chraibi@alami-fils.ma", phone: "+212 663456789", license_number: "P456789" },
  { first_name: "Abdellah", last_name: "El Fassi", email: "a.elfassi@alami-fils.ma", phone: "+212 664567890", license_number: "P567890" },
  { first_name: "Rachid", last_name: "Lahlou", email: "r.lahlou@alami-fils.ma", phone: "+212 665678901", license_number: "P678901" },
  { first_name: "Mustapha", last_name: "Idrissi", email: "m.idrissi@alami-fils.ma", phone: "+212 666789012", license_number: "P789012" },
  { first_name: "Hamid", last_name: "Alaoui", email: "h.alaoui@alami-fils.ma", phone: "+212 667890123", license_number: "P890123" },
  { first_name: "Saïd", last_name: "Bennani", email: "s.bennani@alami-fils.ma", phone: "+212 668901234", license_number: "P901234" },
];

const stationBrands = [
  { brand: "Afriquia", names: ["Afriquia Aïn Sebaâ", "Afriquia Hay Hassani", "Afriquia Sidi Maârouf"] },
  { brand: "TotalEnergies", names: ["TotalEnergies Maarif", "TotalEnergies Bouskoura", "TotalEnergies Ain Diab"] },
  { brand: "Vivo Energy", names: ["Shell Derb Sultan", "Shell Casa Port", "Shell Bernoussi"] },
];

const randomBetween = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export async function seedAlamiData() {
  // 1. Create company via RPC
  const { data: companyId, error: companyError } = await supabase.rpc(
    "create_company_with_owner",
    {
      _name: "Bâtiment Alami & Fils",
      _city: "Casablanca",
      _address: "Zone Industrielle Ain Sebaâ, Lot 42",
      _postal_code: "20250",
      _phone: "+212 522 351 200",
      _email: "contact@alami-fils.ma",
    }
  );

  if (companyError) throw companyError;
  const cid = companyId as string;

  // 2. Insert vehicles
  const { data: dbVehicles, error: vErr } = await supabase
    .from("vehicles")
    .insert(vehicles.map((v) => ({ ...v, company_id: cid, is_active: true })))
    .select();
  if (vErr) throw vErr;

  // 3. Insert drivers
  const { data: dbDrivers, error: dErr } = await supabase
    .from("drivers")
    .insert(drivers.map((d) => ({ ...d, company_id: cid, is_active: true })))
    .select();
  if (dErr) throw dErr;

  // 4. Create policies
  const { data: dbPolicies, error: pErr } = await supabase
    .from("policies")
    .insert([
      {
        company_id: cid,
        name: "Chantier Standard",
        description: "Politique par défaut pour les véhicules de chantier",
        daily_limit: 1200,
        weekly_limit: 5000,
        monthly_limit: 15000,
        per_transaction_limit: 900,
        is_default: true,
        allowed_days: [1, 2, 3, 4, 5],
      },
    ])
    .select();
  if (pErr) throw pErr;

  // 5. Create cards (one per driver, assigned to a vehicle)
  const cardsToCreate = dbDrivers!.map((driver, i) => ({
    company_id: cid,
    card_number: `4532 **** **** ${(1001 + i).toString()}`,
    driver_id: driver.id,
    vehicle_id: dbVehicles![i % dbVehicles!.length].id,
    policy_id: dbPolicies![0].id,
    is_active: true,
    daily_limit: 1200,
    monthly_limit: 15000,
    allowed_days: [1, 2, 3, 4, 5],
  }));

  const { data: dbCards, error: cErr } = await supabase
    .from("cards")
    .insert(cardsToCreate)
    .select();
  if (cErr) throw cErr;

  // Helper to find card by driver name
  const cardOf = (firstName: string) => {
    const driver = dbDrivers!.find((d) => d.first_name === firstName);
    return dbCards!.find((c) => c.driver_id === driver?.id);
  };

  // 6. Create 45 transactions over last 30 days
  const txs = [];
  const now = new Date();

  for (let i = 0; i < 42; i++) {
    const card = randomElement(dbCards!);
    const stData = randomElement(stationBrands);
    const date = new Date(now);
    date.setDate(date.getDate() - randomBetween(0, 29));
    date.setHours(randomBetween(6, 18), randomBetween(0, 59));
    // Skip weekends for normal transactions
    while (date.getDay() === 0 || date.getDay() === 6) {
      date.setDate(date.getDate() - 1);
    }

    const liters = randomBetween(35, 70);
    const pricePerLiter = 12.5 + Math.random() * 1.5; // ~12.5-14 MAD/L
    const amount = Math.round(liters * pricePerLiter * 100) / 100;

    txs.push({
      card_id: card.id,
      amount: Math.min(Math.max(amount, 450), 900),
      liters,
      fuel_type: "gasoil",
      station_name: randomElement(stData.names),
      station_brand: stData.brand,
      location: "Casablanca",
      transaction_date: date.toISOString(),
      odometer: randomBetween(80000, 250000),
    });
  }

  // Suspicious tx 1: Khalid Benali — 85L on a 60L tank vehicle
  const khalidCard = cardOf("Khalid")!;
  const susTx1Date = new Date(now);
  susTx1Date.setDate(susTx1Date.getDate() - 3);
  susTx1Date.setHours(14, 22);
  txs.push({
    card_id: khalidCard.id,
    amount: 85 * 13.2,
    liters: 85,
    fuel_type: "gasoil",
    station_name: "Afriquia Aïn Sebaâ",
    station_brand: "Afriquia",
    location: "Casablanca",
    transaction_date: susTx1Date.toISOString(),
    odometer: 142300,
  });

  // Suspicious tx 2: Youssef Tazi — Sunday 23 March 2025
  const youssefCard = cardOf("Youssef")!;
  const susTx2Date = new Date("2025-03-23T10:15:00");
  txs.push({
    card_id: youssefCard.id,
    amount: 620,
    liters: 48,
    fuel_type: "gasoil",
    station_name: "TotalEnergies Maarif",
    station_brand: "TotalEnergies",
    location: "Casablanca",
    transaction_date: susTx2Date.toISOString(),
    odometer: 95200,
  });

  // Suspicious tx 3: Omar Chraibi — non-fuel merchant
  const omarCard = cardOf("Omar")!;
  const susTx3Date = new Date(now);
  susTx3Date.setDate(susTx3Date.getDate() - 5);
  susTx3Date.setHours(12, 45);
  txs.push({
    card_id: omarCard.id,
    amount: 350,
    liters: null,
    fuel_type: null,
    station_name: "Marjane Ain Sebaâ",
    station_brand: "Marjane",
    location: "Casablanca",
    transaction_date: susTx3Date.toISOString(),
    odometer: 178500,
  });

  const { error: txErr } = await supabase.from("transactions").insert(txs);
  if (txErr) throw txErr;

  // 7. Create 3 unresolved alerts
  const alertsToCreate = [
    {
      company_id: cid,
      card_id: khalidCard.id,
      alert_type: "suspicious",
      message:
        "Le chauffeur Khalid Benali a déclaré 85 litres pour un véhicule avec un réservoir de 60L. Possible fraude au carburant.",
      is_read: false,
      status: "new",
    },
    {
      company_id: cid,
      card_id: youssefCard.id,
      alert_type: "out_of_hours",
      message:
        "Le chauffeur Youssef Tazi a effectué une transaction le dimanche 23 mars, en dehors de son planning Lun-Ven.",
      is_read: false,
      status: "new",
    },
    {
      company_id: cid,
      card_id: omarCard.id,
      alert_type: "declined",
      message:
        "Le chauffeur Omar Chraibi a utilisé la carte chez un commerçant non-carburant (Marjane Ain Sebaâ).",
      is_read: false,
      status: "new",
    },
  ];

  // Use the seed_company_alerts RPC to bypass the restrictive INSERT policy
  const { error: alertErr } = await supabase.rpc("seed_company_alerts", {
    _company_id: cid,
    _alerts: JSON.stringify(alertsToCreate),
  } as any);
  if (alertErr) {
    console.warn("Alerts insertion failed:", alertErr.message);
  }

  return {
    companyId: cid,
    vehicles: dbVehicles!.length,
    drivers: dbDrivers!.length,
    cards: dbCards!.length,
    transactions: txs.length,
  };
}
