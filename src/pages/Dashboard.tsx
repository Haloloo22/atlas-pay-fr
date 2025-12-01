import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  TrendingUp, 
  TrendingDown, 
  CreditCard, 
  Fuel, 
  AlertCircle, 
  MapPin, 
  Download,
  Filter,
  Calendar,
  ChevronRight,
  Truck,
  User,
  Settings
} from "lucide-react";

const Dashboard = () => {
  const menuItems = [
    { name: "Vue d'ensemble", icon: TrendingUp, active: true },
    { name: "Véhicules", icon: Truck, active: false },
    { name: "Chauffeurs", icon: User, active: false },
    { name: "Transactions", icon: CreditCard, active: false },
    { name: "Rapports", icon: Download, active: false },
    { name: "Paramètres", icon: Settings, active: false }
  ];

  const stationLocations = [
    { name: "Total Casa-Port", lat: "33.5731", lng: "-7.5898", type: "Total" },
    { name: "Shell Anfa", lat: "33.5692", lng: "-7.6563", type: "Shell" },
    { name: "Afriquia Maarif", lat: "33.5775", lng: "-7.6321", type: "Afriquia" },
    { name: "Winxo Bouskoura", lat: "33.4489", lng: "-7.6514", type: "Winxo" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-[1600px]">
          <div className="grid lg:grid-cols-[280px_1fr] gap-8">
            {/* Sidebar Menu */}
            <aside className="bg-card rounded-2xl border-2 border-border p-6 h-fit sticky top-32">
              <div className="space-y-2">
                {menuItems.map((item, i) => (
                  <button
                    key={i}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all ${
                      item.active
                        ? 'bg-primary text-primary-foreground shadow-lg'
                        : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.name}</span>
                    {item.active && <ChevronRight className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-border">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4">
                  <p className="text-sm font-bold mb-2">🎉 Support 24/7</p>
                  <p className="text-xs text-muted-foreground mb-3">Besoin d'aide ? Notre équipe est là.</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Contacter
                  </Button>
                </div>
              </div>
            </aside>

            {/* Main Dashboard Content */}
            <div className="space-y-8">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-extrabold mb-2">Tableau de bord</h1>
                  <p className="text-muted-foreground text-lg">
                    Visualisez toutes vos dépenses en un coup d'œil. Graphiques, transactions, statistiques.
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Calendar className="w-5 h-5" />
                    Mars 2025
                  </Button>
                  <Button size="lg" className="gap-2">
                    <Download className="w-5 h-5" />
                    Exporter
                  </Button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 border-2 border-primary/20 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-primary/20 rounded-xl flex items-center justify-center">
                      <Fuel className="w-7 h-7 text-primary" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-success">
                      <TrendingDown className="w-4 h-4" />
                      <span>-8%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-semibold">Dépenses carburant</p>
                    <p className="text-4xl font-extrabold text-foreground">45,280 MAD</p>
                    <p className="text-xs text-muted-foreground">vs 49,217 MAD le mois dernier</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 border-2 border-accent/20 hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-accent/20 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-accent" />
                    </div>
                    <div className="flex items-center gap-1 text-sm font-bold text-accent">
                      <TrendingUp className="w-4 h-4" />
                      <span>+12%</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-semibold">Économies réalisées</p>
                    <p className="text-4xl font-extrabold text-foreground">12,450 MAD</p>
                    <p className="text-xs text-muted-foreground">Grâce aux alertes et optimisations</p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-2xl p-8 border-2 border-border hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-background/50 rounded-xl flex items-center justify-center">
                      <CreditCard className="w-7 h-7 text-foreground" />
                    </div>
                    <div className="text-sm font-bold text-muted-foreground">
                      34/42
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground font-semibold">Cartes actives</p>
                    <p className="text-4xl font-extrabold text-foreground">34</p>
                    <p className="text-xs text-muted-foreground">8 cartes disponibles</p>
                  </div>
                </div>
              </div>

              {/* Chart & Map Row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Monthly Consumption Chart */}
                <div className="bg-card rounded-2xl p-8 border-2 border-border">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-xl">Consommation mensuelle</h3>
                    <div className="flex gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                        <span className="text-muted-foreground">Carburant</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-accent"></div>
                        <span className="text-muted-foreground">Maintenance</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-64 flex items-end justify-between gap-2">
                    {[65, 78, 90, 85, 72, 88, 95, 100, 92, 85, 78, 82].map((height, i) => (
                      <div key={i} className="flex-1 flex flex-col gap-2 items-center group">
                        <div 
                          className="w-full bg-primary/80 rounded-t-lg hover:bg-primary transition-all cursor-pointer" 
                          style={{height: `${height}%`}}
                        ></div>
                        <div 
                          className="w-full bg-accent/40 rounded-t-lg hover:bg-accent/60 transition-all" 
                          style={{height: `${height * 0.3}%`}}
                        ></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground font-semibold">
                    {["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jul", "Aoû", "Sep", "Oct", "Nov", "Déc"].map(m => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Map View */}
                <div className="bg-card rounded-2xl p-8 border-2 border-border">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-xl">Stations utilisées</h3>
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      Voir carte
                    </Button>
                  </div>
                  <div className="bg-secondary/30 rounded-xl h-64 relative overflow-hidden">
                    {/* Simplified map illustration */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5"></div>
                    {stationLocations.map((station, i) => (
                      <div
                        key={i}
                        className="absolute w-10 h-10 rounded-full bg-primary/80 border-4 border-background shadow-xl flex items-center justify-center text-xs font-bold text-primary-foreground hover:scale-125 transition-transform cursor-pointer"
                        style={{
                          top: `${20 + i * 15}%`,
                          left: `${15 + i * 20}%`
                        }}
                      >
                        <Fuel className="w-5 h-5" />
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-4">
                    {stationLocations.map((station, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <div className={`w-2 h-2 rounded-full ${
                          station.type === 'Total' ? 'bg-red-500' :
                          station.type === 'Shell' ? 'bg-yellow-500' :
                          station.type === 'Afriquia' ? 'bg-green-500' : 'bg-blue-500'
                        }`}></div>
                        <span className="text-muted-foreground font-medium">{station.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-card rounded-2xl p-8 border-2 border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-xl">Dernières transactions</h3>
                  <div className="flex gap-3">
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filtrer
                    </Button>
                    <Button variant="outline" size="sm">
                      Voir tout
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { vehicle: "Camion #1245", driver: "Ahmed B.", amount: "450 MAD", station: "Total - Casablanca", time: "Il y a 15 min", type: "Carburant" },
                    { vehicle: "Fourgon #0892", driver: "Karim M.", amount: "320 MAD", station: "Shell - Rabat", time: "Il y a 2h", type: "Carburant" },
                    { vehicle: "VL #3421", driver: "Sara K.", amount: "280 MAD", station: "Afriquia - Marrakech", time: "Il y a 4h", type: "Carburant" },
                    { vehicle: "Camion #1245", driver: "Ahmed B.", amount: "850 MAD", station: "Garage Central - Casa", time: "Il y a 1j", type: "Maintenance" },
                    { vehicle: "VL #2217", driver: "Youssef T.", amount: "180 MAD", station: "Winxo - Tanger", time: "Il y a 2j", type: "Carburant" }
                  ].map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-secondary/50 rounded-xl hover:bg-secondary/70 transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                          tx.type === 'Carburant' ? 'bg-primary/10' : 'bg-warning/10'
                        }`}>
                          <Fuel className={`w-6 h-6 ${tx.type === 'Carburant' ? 'text-primary' : 'text-warning'}`} />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{tx.vehicle} • {tx.driver}</p>
                          <p className="text-xs text-muted-foreground">{tx.station}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-base">{tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-gradient-to-br from-warning/5 to-warning/10 border-2 border-warning/20 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-warning/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <AlertCircle className="w-6 h-6 text-warning" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-lg mb-2">⚠️ 2 anomalies détectées</p>
                    <p className="text-muted-foreground mb-4">
                      Consommation inhabituelle sur <span className="font-semibold text-foreground">Camion #1245</span> - Écart de 15% par rapport à la moyenne hebdomadaire.
                    </p>
                    <Button variant="outline" size="sm">
                      Voir détails
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
