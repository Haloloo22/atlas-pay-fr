import { TrendingUp, TrendingDown, CreditCard, Fuel, AlertCircle, MapPin, Car, User } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const mockMonthlyData = [
  { month: "Jan", amount: 38500 },
  { month: "Fév", amount: 42100 },
  { month: "Mar", amount: 39800 },
  { month: "Avr", amount: 45200 },
  { month: "Mai", amount: 41600 },
  { month: "Jun", amount: 48900 },
];

const mockStations = [
  { name: "Total", amount: 15200, color: "hsl(var(--primary))" },
  { name: "Shell", amount: 12800, color: "hsl(var(--accent))" },
  { name: "Afriquia", amount: 9400, color: "hsl(var(--primary)/0.7)" },
  { name: "Winxo", amount: 6100, color: "hsl(var(--accent)/0.7)" },
];

const mockVehicles = [
  { name: "Camion #1245", amount: 8500 },
  { name: "Fourgon #0892", amount: 6200 },
  { name: "VL #3421", amount: 4100 },
];

const mockTransactions = [
  { vehicle: "Camion #1245", driver: "Ahmed B.", amount: 450, station: "Total", city: "Casablanca", fuel: "Diesel", liters: 38, time: "Il y a 15 min" },
  { vehicle: "Fourgon #0892", driver: "Karim M.", amount: 320, station: "Shell", city: "Rabat", fuel: "Essence", liters: 25, time: "Il y a 2h" },
  { vehicle: "VL #3421", driver: "Sara K.", amount: 280, station: "Afriquia", city: "Marrakech", fuel: "Diesel", liters: 22, time: "Il y a 4h" },
];

const Dashboard = () => {
  const maxStationAmount = Math.max(...mockStations.map(s => s.amount));

  return (
    <section className="py-20 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Un tableau de bord limpide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Visualisez toutes vos dépenses en un coup d'œil
          </p>
        </div>

        <div className="bg-gradient-to-br from-secondary/50 to-background rounded-2xl border-2 border-border p-4 md:p-8 shadow-2xl">
          <div className="bg-background rounded-xl p-4 md:p-6 space-y-5">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-border">
              <div>
                <h3 className="text-xl font-bold mb-1">Vue d'ensemble</h3>
                <p className="text-sm text-muted-foreground">Décembre 2025</p>
              </div>
              <div className="flex gap-2 mt-3 md:mt-0">
                <button className="px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-medium">
                  Ce mois
                </button>
                <button className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium">
                  Trimestre
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-4 border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <Fuel className="w-5 h-5 text-primary" />
                  <div className="flex items-center gap-1 text-xs font-semibold text-accent">
                    <TrendingDown className="w-3 h-3" />
                    <span>-8%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Dépenses</p>
                <p className="text-xl font-bold text-foreground">48,900 MAD</p>
              </div>

              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl p-4 border border-accent/20">
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="w-5 h-5 text-accent" />
                  <div className="flex items-center gap-1 text-xs font-semibold text-accent">
                    <TrendingUp className="w-3 h-3" />
                    <span>+12%</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">Économies</p>
                <p className="text-xl font-bold text-foreground">12,450 MAD</p>
              </div>

              <div className="bg-gradient-to-br from-secondary/80 to-secondary/40 rounded-xl p-4 border border-border">
                <div className="flex items-center justify-between mb-2">
                  <CreditCard className="w-5 h-5 text-foreground" />
                  <span className="text-xs font-semibold text-muted-foreground">34/42</span>
                </div>
                <p className="text-xs text-muted-foreground">Cartes actives</p>
                <p className="text-xl font-bold text-foreground">34</p>
              </div>

              <div className="bg-gradient-to-br from-warning/10 to-warning/5 rounded-xl p-4 border border-warning/20">
                <div className="flex items-center justify-between mb-2">
                  <AlertCircle className="w-5 h-5 text-warning" />
                  <span className="text-xs font-semibold text-warning">2 nouvelles</span>
                </div>
                <p className="text-xs text-muted-foreground">Alertes</p>
                <p className="text-xl font-bold text-foreground">3</p>
              </div>
            </div>

            {/* Chart + Widgets Row */}
            <div className="grid md:grid-cols-3 gap-4">
              {/* Main Chart */}
              <div className="md:col-span-2 bg-secondary/30 rounded-xl p-4">
                <h4 className="font-semibold text-sm mb-3">Évolution des dépenses</h4>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockMonthlyData}>
                      <defs>
                        <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <XAxis 
                        dataKey="month" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
                      />
                      <YAxis hide />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--background))', 
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                        formatter={(value: number) => [`${value.toLocaleString()} MAD`, 'Dépenses']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="amount" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#colorAmount)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Top Stations */}
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-sm">Top Stations</h4>
                </div>
                <div className="space-y-3">
                  {mockStations.map((station, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium">{station.name}</span>
                        <span className="text-muted-foreground">{(station.amount / 1000).toFixed(1)}k MAD</span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${(station.amount / maxStationAmount) * 100}%`,
                            backgroundColor: station.color
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Vehicles + Transactions Row */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* By Vehicle */}
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Car className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-sm">Par Véhicule</h4>
                </div>
                <div className="space-y-2">
                  {mockVehicles.map((vehicle, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                      <span className="text-xs font-medium">{vehicle.name}</span>
                      <span className="text-xs font-bold text-primary">{vehicle.amount.toLocaleString()} MAD</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Transactions */}
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-sm">Dernières transactions</h4>
                  <button className="text-xs font-medium text-primary hover:underline">Voir tout</button>
                </div>
                <div className="space-y-2">
                  {mockTransactions.map((tx, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-background/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Fuel className="w-3.5 h-3.5 text-primary" />
                        </div>
                        <div>
                          <p className="text-xs font-medium">{tx.vehicle}</p>
                          <p className="text-[10px] text-muted-foreground">{tx.station} • {tx.liters}L</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">{tx.amount} MAD</p>
                        <p className="text-[10px] text-muted-foreground">{tx.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-accent/5 border border-accent/20 rounded-xl p-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-xs mb-0.5">2 anomalies détectées</p>
                  <p className="text-[11px] text-muted-foreground">
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