import { LayoutDashboard, Car, Users, CreditCard, TrendingUp } from "lucide-react";
import { useCompany } from "@/hooks/useCompany";
import { useVehicles } from "@/hooks/useVehicles";
import { useDrivers } from "@/hooks/useDrivers";
import { useCards } from "@/hooks/useCards";
import { CompanyOnboarding } from "@/components/app/CompanyOnboarding";
import { Link } from "react-router-dom";

const AppDashboard = () => {
  const { company, isLoading: companyLoading } = useCompany();
  const { vehicles } = useVehicles();
  const { drivers } = useDrivers();
  const { cards } = useCards();

  if (companyLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!company) {
    return <CompanyOnboarding />;
  }

  const stats = [
    {
      title: "Véhicules",
      value: vehicles.length,
      icon: Car,
      href: "/app/vehicles",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Chauffeurs",
      value: drivers.length,
      icon: Users,
      href: "/app/drivers",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Cartes actives",
      value: cards.filter((c) => c.is_active).length,
      icon: CreditCard,
      href: "/app/cards",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold mb-1">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue sur FleetPay, {company.name}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <Link
            key={stat.title}
            to={stat.href}
            className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <TrendingUp className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <p className="text-3xl font-bold mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.title}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
          <div className="text-center py-8 text-muted-foreground">
            <LayoutDashboard className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>Aucune transaction récente</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4">Alertes</h2>
          <div className="text-center py-8 text-muted-foreground">
            <LayoutDashboard className="w-10 h-10 mx-auto mb-2 opacity-50" />
            <p>Aucune alerte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDashboard;
