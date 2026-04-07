import { useState } from "react";
import { CreditCard, Receipt, Bell, Droplets } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TopStationsWidget } from "@/components/dashboard/TopStationsWidget";
import { SpendingByVehicleWidget } from "@/components/dashboard/SpendingByVehicleWidget";
import { SpendingByDriverWidget } from "@/components/dashboard/SpendingByDriverWidget";
import { RecentAlertsWidget } from "@/components/dashboard/RecentAlertsWidget";
import { RecentTransactionsWidget } from "@/components/dashboard/RecentTransactionsWidget";
import { DateRangeFilter, DateRangeOption } from "@/components/dashboard/DateRangeFilter";
import { demoDashboardStats, demoAlerts, demoTransactions } from "@/data/demoData";

export default function DemoDashboard() {
  const [dateRange, setDateRange] = useState<DateRangeOption>("6m");
  const stats = demoDashboardStats;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
          <p className="text-muted-foreground">Bienvenue, Bâtiment Alami &amp; Fils</p>
        </div>
        <DateRangeFilter value={dateRange} onChange={setDateRange} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Dépenses ce mois" value={`${stats.thisMonthTotal.toLocaleString("fr-MA")} MAD`} icon={Receipt} trend={stats.monthlyChange} trendLabel="vs mois dernier" />
        <StatCard title="Cartes actives" value={`${stats.activeCards}/${stats.totalCards}`} icon={CreditCard} />
        <StatCard title="Litres consommés" value={`${stats.totalLiters.toLocaleString("fr-MA")} L`} icon={Droplets} />
        <StatCard title="Alertes non lues" value={stats.unreadAlerts} icon={Bell} />
      </div>

      <SpendingChart data={stats.monthlySpending} title="Évolution des dépenses (6 derniers mois)" />

      <div className="grid lg:grid-cols-2 gap-6">
        <TopStationsWidget data={stats.spendingByStation} />
        <SpendingByVehicleWidget data={stats.spendingByVehicle} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SpendingByDriverWidget data={stats.spendingByDriver} />
        <RecentAlertsWidget alerts={demoAlerts} />
      </div>

      <RecentTransactionsWidget transactions={demoTransactions.slice(0, 5)} />
    </div>
  );
}
