import { supabase } from "@/integrations/supabase/client";

const moroccanFirstNames = [
  "Ahmed", "Mohammed", "Youssef", "Omar", "Hassan",
  "Karim", "Rachid", "Said", "Khalid", "Mustapha"
];

const moroccanLastNames = [
  "Benali", "El Amrani", "Tazi", "Berrada", "Fassi",
  "Chaoui", "Idrissi", "Alaoui", "Bennani", "Lahlou"
];

const vehicleBrands = [
  { brand: "Toyota", models: ["Hilux", "Land Cruiser", "Corolla", "Yaris"] },
  { brand: "Renault", models: ["Clio", "Megane", "Kangoo", "Master"] },
  { brand: "Dacia", models: ["Duster", "Sandero", "Logan", "Dokker"] },
  { brand: "Hyundai", models: ["Tucson", "i10", "Accent", "Santa Fe"] },
  { brand: "Ford", models: ["Transit", "Ranger", "Focus", "Fiesta"] },
];

const moroccanCities = [
  "Casablanca", "Rabat", "Marrakech", "Fès", "Tanger",
  "Agadir", "Meknès", "Oujda", "Kénitra", "Tétouan"
];

const fuelStations = [
  { brand: "Shell", names: ["Shell Express", "Shell Auto", "Shell Station"] },
  { brand: "Afriquia", names: ["Afriquia Service", "Afriquia Station", "Afriquia Plus"] },
  { brand: "Total", names: ["Total Energies", "Total Access", "Total Station"] },
  { brand: "Winxo", names: ["Winxo Service", "Winxo Station"] },
  { brand: "Oilibya", names: ["Oilibya Station", "Oilibya Service"] },
];

const fuelTypes = ["diesel", "essence", "gasoil"];

// Helper functions
const randomElement = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const randomBetween = (min: number, max: number): number => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const generatePlateNumber = (): string => {
  const num1 = randomBetween(10000, 99999);
  const letter = String.fromCharCode(65 + randomBetween(0, 25));
  const num2 = randomBetween(10, 99);
  return `${num1}-${letter}-${num2}`;
};

const generateCardNumber = (): string => {
  return `4532 **** **** ${randomBetween(1000, 9999)}`;
};

export async function seedDemoData(companyId: string) {
  try {
    // 1. Create vehicles (8 vehicles)
    const vehicleTypes: Array<"car" | "truck" | "van" | "motorcycle"> = ["car", "truck", "van", "motorcycle"];
    const vehiclesToCreate = [];
    
    for (let i = 0; i < 8; i++) {
      const brandData = randomElement(vehicleBrands);
      vehiclesToCreate.push({
        company_id: companyId,
        plate_number: generatePlateNumber(),
        brand: brandData.brand,
        model: randomElement(brandData.models),
        vehicle_type: randomElement(vehicleTypes),
        fuel_type: randomElement(fuelTypes),
        is_active: Math.random() > 0.1,
      });
    }

    const { data: vehicles, error: vehiclesError } = await supabase
      .from("vehicles")
      .insert(vehiclesToCreate)
      .select();

    if (vehiclesError) throw vehiclesError;

    // 2. Create drivers (8 drivers)
    const driversToCreate = [];
    for (let i = 0; i < 8; i++) {
      driversToCreate.push({
        company_id: companyId,
        first_name: randomElement(moroccanFirstNames),
        last_name: randomElement(moroccanLastNames),
        email: `driver${i + 1}@fleetpay-demo.ma`,
        phone: `+212 6${randomBetween(10000000, 99999999)}`,
        license_number: `P${randomBetween(100000, 999999)}`,
        is_active: Math.random() > 0.1,
      });
    }

    const { data: drivers, error: driversError } = await supabase
      .from("drivers")
      .insert(driversToCreate)
      .select();

    if (driversError) throw driversError;

    // 3. Create policies (3 policies)
    const policiesToCreate = [
      {
        company_id: companyId,
        name: "Standard",
        description: "Politique par défaut pour tous les employés",
        daily_limit: 500,
        weekly_limit: 2000,
        monthly_limit: 5000,
        per_transaction_limit: 200,
        is_default: true,
      },
      {
        company_id: companyId,
        name: "Livreurs",
        description: "Politique pour les chauffeurs-livreurs avec limites plus élevées",
        daily_limit: 800,
        weekly_limit: 3500,
        monthly_limit: 8000,
        per_transaction_limit: 350,
        max_fills_per_day: 3,
      },
      {
        company_id: companyId,
        name: "Cadres",
        description: "Politique premium pour les cadres supérieurs",
        daily_limit: 1000,
        weekly_limit: 5000,
        monthly_limit: 15000,
        per_transaction_limit: 500,
        allow_shop_purchases: true,
        shop_max_amount: 100,
      },
    ];

    const { data: policies, error: policiesError } = await supabase
      .from("policies")
      .insert(policiesToCreate)
      .select();

    if (policiesError) throw policiesError;

    // 4. Create cards (12 cards linked to drivers/vehicles)
    const cardsToCreate = [];
    for (let i = 0; i < 12; i++) {
      const driver = vehicles && drivers ? drivers[i % drivers.length] : null;
      const vehicle = vehicles ? vehicles[i % vehicles.length] : null;
      const policy = policies ? policies[i % policies.length] : null;
      
      cardsToCreate.push({
        company_id: companyId,
        card_number: generateCardNumber(),
        driver_id: driver?.id || null,
        vehicle_id: vehicle?.id || null,
        policy_id: policy?.id || null,
        is_active: Math.random() > 0.1,
        daily_limit: randomBetween(300, 800),
        monthly_limit: randomBetween(3000, 10000),
      });
    }

    const { data: cards, error: cardsError } = await supabase
      .from("cards")
      .insert(cardsToCreate)
      .select();

    if (cardsError) throw cardsError;

    // 5. Create transactions (last 6 months of data)
    const transactionsToCreate = [];
    const now = new Date();
    
    for (let monthsAgo = 0; monthsAgo < 6; monthsAgo++) {
      const transactionsThisMonth = randomBetween(15, 40);
      
      for (let t = 0; t < transactionsThisMonth; t++) {
        const card = cards ? randomElement(cards) : null;
        if (!card) continue;

        const stationData = randomElement(fuelStations);
        const date = new Date(now);
        date.setMonth(date.getMonth() - monthsAgo);
        date.setDate(randomBetween(1, 28));
        date.setHours(randomBetween(6, 21), randomBetween(0, 59));

        const liters = randomBetween(20, 80);
        const pricePerLiter = 12 + Math.random() * 4; // 12-16 MAD/L
        const amount = Math.round(liters * pricePerLiter * 100) / 100;

        transactionsToCreate.push({
          card_id: card.id,
          amount,
          liters,
          fuel_type: randomElement(fuelTypes),
          station_name: randomElement(stationData.names),
          station_brand: stationData.brand,
          location: randomElement(moroccanCities),
          transaction_date: date.toISOString(),
          odometer: randomBetween(50000, 200000),
        });
      }
    }

    const { error: transactionsError } = await supabase
      .from("transactions")
      .insert(transactionsToCreate);

    if (transactionsError) throw transactionsError;

    // 6. Create sample alerts
    const alertTypes = [
      { type: "limit_exceeded", message: "Limite de transaction dépassée" },
      { type: "out_of_hours", message: "Transaction hors horaires autorisés" },
      { type: "suspicious", message: "Activité suspecte détectée" },
      { type: "declined", message: "Transaction refusée" },
    ];

    const alertsToCreate = [];
    for (let i = 0; i < 5; i++) {
      const card = cards ? randomElement(cards) : null;
      const alertData = randomElement(alertTypes);
      const date = new Date();
      date.setDate(date.getDate() - randomBetween(0, 14));

      alertsToCreate.push({
        company_id: companyId,
        card_id: card?.id || null,
        alert_type: alertData.type,
        message: alertData.message,
        is_read: Math.random() > 0.6,
        status: Math.random() > 0.5 ? "new" : "resolved",
      });
    }

    // Note: Alerts are created via service role in real app, so this might fail due to RLS
    // We'll handle this gracefully
    try {
      await supabase.from("alerts").insert(alertsToCreate);
    } catch {
      console.log("Alerts could not be created (RLS restriction)");
    }

    return {
      success: true,
      stats: {
        vehicles: vehiclesToCreate.length,
        drivers: driversToCreate.length,
        policies: policiesToCreate.length,
        cards: cardsToCreate.length,
        transactions: transactionsToCreate.length,
      },
    };
  } catch (error) {
    console.error("Error seeding demo data:", error);
    throw error;
  }
}
