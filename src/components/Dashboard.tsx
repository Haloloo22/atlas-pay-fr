import { TrendingUp, TrendingDown, CreditCard, Fuel, AlertCircle } from "lucide-react";

const Dashboard = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Un tableau de bord limpide
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Visualisez toutes vos dépenses en un coup d'œil. Graphiques, transactions, statistiques véhicule par véhicule.
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/50 to-background rounded-2xl border-2 border-border p-8 md:p-12 shadow-2xl">
          <div className="bg-background rounded-xl p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-border">
              <div>
                <h3 className="text-2xl font-bold mb-1">Vue d'ensemble</h3>
                <p className="text-sm text-muted-foreground">Mars 2025</p>
              </div>
              <div className="flex gap-3 mt-4 md:mt-0">
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium">
                  Ce mois
                </button>
                <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium">
                  Trimestre
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                    <Fuel className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-accent">
                    <TrendingDown className="w-4 h-4" />
                    <span>-8%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Dépenses carburant</p>
                  <p className="text-3xl font-bold text-foreground">45,280 MAD</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-6 border border-accent/20">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-accent">
                    <TrendingUp className="w-4 h-4" />
                    <span>+12%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Économies réalisées</p>
                  <p className="text-3xl font-bold text-foreground">12,450 MAD</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-6 border border-border">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 bg-background/50 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-muted-foreground">
                    <span>34/42</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground font-medium">Cartes actives</p>
                  <p className="text-3xl font-bold text-foreground">34</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-secondary/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h4 className="font-bold text-lg">Consommation mensuelle</h4>
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
              <div className="h-48 flex items-end justify-between gap-3">
                {[65, 78, 90, 85, 72, 88, 95, 100, 92, 85, 78, 82].map((height, i) => (
                  <div key={i} className="flex-1 flex flex-col gap-2 items-center">
                    <div className="w-full bg-primary/80 rounded-t-lg hover:bg-primary transition-colors" style={{height: `${height}%`}}></div>
                    <div className="w-full bg-accent/40 rounded-t-lg" style={{height: `${height * 0.3}%`}}></div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-3 text-xs text-muted-foreground font-medium">
                <span>Jan</span>
                <span>Fév</span>
                <span>Mar</span>
                <span>Avr</span>
                <span>Mai</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aoû</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Déc</span>
              </div>
            </div>

            {/* Transactions */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-bold text-lg">Dernières transactions</h4>
                <button className="text-sm font-medium text-primary hover:underline">
                  Voir tout
                </button>
              </div>
              <div className="space-y-3">
                {[
                  { vehicle: "Camion #1245", driver: "Ahmed B.", amount: "450 MAD", station: "Total - Casablanca", time: "Il y a 15 min" },
                  { vehicle: "Fourgon #0892", driver: "Karim M.", amount: "320 MAD", station: "Shell - Rabat", time: "Il y a 2h" },
                  { vehicle: "VL #3421", driver: "Sara K.", amount: "280 MAD", station: "Afriquia - Marrakech", time: "Il y a 4h" }
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg hover:bg-secondary/70 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Fuel className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{tx.vehicle} • {tx.driver}</p>
                        <p className="text-xs text-muted-foreground">{tx.station}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{tx.amount}</p>
                      <p className="text-xs text-muted-foreground">{tx.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-sm mb-1">2 anomalies détectées</p>
                  <p className="text-xs text-muted-foreground">
                    Consommation inhabituelle sur Camion #1245 - Écart de 15% par rapport à la moyenne
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
