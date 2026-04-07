import { useState } from "react";
import { Link } from "react-router-dom";
import { CreditCard, Receipt, Bell, Droplets, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TopStationsWidget } from "@/components/dashboard/TopStationsWidget";
import { SpendingByVehicleWidget } from "@/components/dashboard/SpendingByVehicleWidget";
import { SpendingByDriverWidget } from "@/components/dashboard/SpendingByDriverWidget";
import { RecentAlertsWidget } from "@/components/dashboard/RecentAlertsWidget";
import { RecentTransactionsWidget } from "@/components/dashboard/RecentTransactionsWidget";
import { DateRangeFilter, DateRangeOption } from "@/components/dashboard/DateRangeFilter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Static demo data for Bâtiment Alami & Fils
const demoStats = {
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
  recentTransactions: [
    { id: "t1", card_id: "c1", amount: 720, station_name: "Afriquia Hay Mohammadi", station_brand: "Afriquia", fuel_type: "gasoil", liters: 52, location: "Casablanca", odometer: 84500, transaction_date: new Date(Date.now() - 2 * 3600_000).toISOString(), created_at: new Date().toISOString() },
    { id: "t2", card_id: "c2", amount: 580, station_name: "TotalEnergies Ain Sebaa", station_brand: "TotalEnergies", fuel_type: "gasoil", liters: 42, location: "Casablanca", odometer: 62300, transaction_date: new Date(Date.now() - 5 * 3600_000).toISOString(), created_at: new Date().toISOString() },
    { id: "t3", card_id: "c3", amount: 890, station_name: "Vivo Energy Sidi Maarouf", station_brand: "Vivo Energy", fuel_type: "gasoil", liters: 64, location: "Casablanca", odometer: 91200, transaction_date: new Date(Date.now() - 8 * 3600_000).toISOString(), created_at: new Date().toISOString() },
    { id: "t4", card_id: "c4", amount: 450, station_name: "Afriquia Bernoussi", station_brand: "Afriquia", fuel_type: "gasoil", liters: 32, location: "Casablanca", odometer: 45600, transaction_date: new Date(Date.now() - 24 * 3600_000).toISOString(), created_at: new Date().toISOString() },
    { id: "t5", card_id: "c5", amount: 670, station_name: "TotalEnergies Ain Sebaa", station_brand: "TotalEnergies", fuel_type: "gasoil", liters: 48, location: "Casablanca", odometer: 73100, transaction_date: new Date(Date.now() - 26 * 3600_000).toISOString(), created_at: new Date().toISOString() },
  ],
};

const demoAlerts = [
  { id: "a1", alert_type: "suspicious", message: "Khalid Benali a déclaré 85L pour un véhicule avec réservoir de 60L (12345-A-1)", is_read: false, created_at: new Date(Date.now() - 3 * 3600_000).toISOString() },
  { id: "a2", alert_type: "out_of_hours", message: "Youssef Tazi a effectué une transaction le dimanche 23 mars, hors de son planning Lun-Ven", is_read: false, created_at: new Date(Date.now() - 12 * 3600_000).toISOString() },
  { id: "a3", alert_type: "declined", message: "Omar Chraibi a utilisé la carte chez un marchand non-carburant (Marjane)", is_read: false, created_at: new Date(Date.now() - 24 * 3600_000).toISOString() },
];

const Demo = () => {
  const [dateRange, setDateRange] = useState<DateRangeOption>("6m");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Demo Banner */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground border-b border-primary/20">
        <div className="container mx-auto max-w-7xl px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-center sm:text-left">
            <span className="bg-primary-foreground/20 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
              Mode Démo
            </span>
            <span>Bâtiment Alami &amp; Fils — Ceci est un exemple de tableau de bord FleetPay</span>
          </div>
          <Link to="/auth">
            <Button size="sm" variant="secondary" className="font-semibold whitespace-nowrap">
              Créer mon compte gratuit
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="flex-1 bg-background">
        <div className="container mx-auto max-w-7xl px-6 py-8 space-y-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
              <p className="text-muted-foreground">
                Bienvenue sur FleetPay, Bâtiment Alami &amp; Fils
              </p>
            </div>
            <DateRangeFilter value={dateRange} onChange={setDateRange} />
          </div>

          {/* KPI Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
              title="Dépenses ce mois"
              value={`${demoStats.thisMonthTotal.toLocaleString("fr-MA")} MAD`}
              icon={Receipt}
              trend={demoStats.monthlyChange}
              trendLabel="vs mois dernier"
            />
            <StatCard
              title="Cartes actives"
              value={`${demoStats.activeCards}/${demoStats.totalCards}`}
              icon={CreditCard}
            />
            <StatCard
              title="Litres consommés"
              value={`${demoStats.totalLiters.toLocaleString("fr-MA")} L`}
              icon={Droplets}
            />
            <StatCard
              title="Alertes non lues"
              value={demoStats.unreadAlerts}
              icon={Bell}
            />
          </div>

          {/* Spending Chart */}
          <SpendingChart data={demoStats.monthlySpending} title="Évolution des dépenses (6 derniers mois)" />

          {/* Stats Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            <TopStationsWidget data={demoStats.spendingByStation} />
            <SpendingByVehicleWidget data={demoStats.spendingByVehicle} />
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <SpendingByDriverWidget data={demoStats.spendingByDriver} />
            <RecentAlertsWidget alerts={demoAlerts} />
          </div>

          {/* Recent Transactions */}
          <RecentTransactionsWidget transactions={demoStats.recentTransactions} />

          {/* Bottom CTA */}
          <div className="text-center py-8 space-y-4">
            <h2 className="text-xl font-bold">Prêt à gérer votre flotte ?</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Créez votre compte gratuitement et commencez à contrôler vos dépenses carburant en moins de 48h.
            </p>
            <Link to="/auth">
              <Button size="lg" className="font-semibold px-8">
                Créer mon compte gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Demo;
