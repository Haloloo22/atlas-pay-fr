import { Car, Users, CreditCard, Receipt, Bell, Droplets } from "lucide-react";
import { useCompany } from "@/hooks/useCompany";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { CompanyOnboarding } from "@/components/app/CompanyOnboarding";
import { StatCard } from "@/components/dashboard/StatCard";
import { SpendingChart } from "@/components/dashboard/SpendingChart";
import { TopStationsWidget } from "@/components/dashboard/TopStationsWidget";
import { SpendingByVehicleWidget } from "@/components/dashboard/SpendingByVehicleWidget";
import { SpendingByDriverWidget } from "@/components/dashboard/SpendingByDriverWidget";
import { RecentAlertsWidget } from "@/components/dashboard/RecentAlertsWidget";
import { RecentTransactionsWidget } from "@/components/dashboard/RecentTransactionsWidget";

const AppDashboard = () => {
  const { company, isLoading: companyLoading } = useCompany();
  const { stats, alerts, isLoading: statsLoading } = useDashboardStats();

  if (companyLoading || statsLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!company) {
    return <CompanyOnboarding />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue sur FleetPay, {company.name}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Dépenses ce mois"
          value={`${stats.thisMonthTotal.toLocaleString("fr-MA")} MAD`}
          icon={Receipt}
          href="/app/transactions"
          trend={stats.monthlyChange}
          trendLabel="vs mois dernier"
        />
        <StatCard
          title="Cartes actives"
          value={`${stats.activeCards}/${stats.totalCards}`}
          icon={CreditCard}
          href="/app/cards"
        />
        <StatCard
          title="Litres consommés"
          value={`${stats.totalLiters.toLocaleString("fr-MA")} L`}
          icon={Droplets}
          href="/app/transactions"
        />
        <StatCard
          title="Alertes non lues"
          value={stats.unreadAlerts}
          icon={Bell}
          href="/app/alerts"
        />
      </div>

      {/* Spending Chart */}
      <SpendingChart data={stats.monthlySpending} title="Évolution des dépenses (6 derniers mois)" />

      {/* Stats Grid */}
      <div className="grid lg:grid-cols-2 gap-6">
        <TopStationsWidget data={stats.spendingByStation} />
        <SpendingByVehicleWidget data={stats.spendingByVehicle} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <SpendingByDriverWidget data={stats.spendingByDriver} />
        <RecentAlertsWidget alerts={alerts} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactionsWidget transactions={stats.recentTransactions} />
    </div>
  );
};

export default AppDashboard;
