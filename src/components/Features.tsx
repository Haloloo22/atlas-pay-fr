import { CreditCard, Bell, Shield, Satellite, Gauge, Activity, MapPin, FileText, Users, TrendingDown } from "lucide-react";

const stationLogos = [
  { name: "Total", color: "from-red-500 to-red-600" },
  { name: "Shell", color: "from-yellow-400 to-yellow-500" },
  { name: "Afriquia", color: "from-green-500 to-green-600" },
  { name: "Winxo", color: "from-blue-500 to-blue-600" }
];

const features = [
  {
    icon: Users,
    title: "Gestion multi-véhicules et multi-chauffeurs",
    description: "Créez votre flotte, ajoutez vos véhicules et attribuez des cartes physiques ou virtuelles à chaque chauffeur.",
    gradient: "from-primary/10 via-primary/5 to-transparent",
    miniDashboard: true
  },
  {
    icon: CreditCard,
    title: "Cartes Visa Fleet prépayées",
    description: "Cartes physiques et virtuelles. Limites par conducteur, catégories contrôlées : carburant, maintenance, péages.",
    gradient: "from-accent/10 via-accent/5 to-transparent",
    miniDashboard: false
  },
  {
    icon: Bell,
    title: "Contrôle dépenses en temps réel",
    description: "Chaque transaction apparaît instantanément. Notifications push pour chaque paiement, dépassement de limite détecté.",
    gradient: "from-success/10 via-success/5 to-transparent",
    miniDashboard: false
  },
  {
    icon: Shield,
    title: "Alertes automatiques",
    description: "IA qui détecte les anomalies : transactions suspectes, limites dépassées, consommation inhabituelle comparée à la moyenne.",
    gradient: "from-warning/10 via-warning/5 to-transparent",
    miniDashboard: false
  },
  {
    icon: FileText,
    title: "Rapports & analytics exportables",
    description: "Dashboard personnalisable. Exports PDF et Excel pour votre comptabilité. Graphiques détaillés par véhicule, chauffeur, station.",
    gradient: "from-primary/10 via-accent/5 to-transparent",
    miniDashboard: true
  },
  {
    icon: MapPin,
    title: "Accepté dans toutes les stations",
    description: "Total, Shell, Afriquia, Winxo et plus. Votre carte FleetPay fonctionne partout au Maroc.",
    gradient: "from-accent/10 via-primary/5 to-transparent",
    miniDashboard: false,
    showStations: true
  }
];

const Features = () => {
  return (
    <section id="fonctionnalites" className="py-20 px-6 bg-gradient-to-b from-secondary/40 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="text-sm font-bold px-4 py-2 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
              Tout en un
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            Votre flotte sous contrôle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Une plateforme complète qui fait bien plus que gérer vos cartes carburant
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
              
              <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-4">
                {feature.description}
              </p>

              {/* Mini Dashboard Illustration */}
              {feature.miniDashboard && (
                <div className="mt-6 bg-secondary/50 rounded-xl p-4 border border-border overflow-hidden">
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Dashboard</span>
                      <span className="text-primary font-semibold">Live</span>
                    </div>
                    <div className="flex items-end gap-1.5 h-16">
                      {[
                        { height: 40, color: 'bg-primary/30' },
                        { height: 65, color: 'bg-primary/50' },
                        { height: 50, color: 'bg-accent/40' },
                        { height: 75, color: 'bg-primary/60' },
                        { height: 55, color: 'bg-accent/50' }
                      ].map((bar, i) => (
                        <div 
                          key={i} 
                          className={`flex-1 ${bar.color} rounded-t transition-all hover:opacity-80`} 
                          style={{height: `${bar.height}px`}}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Jan</span>
                    <span>Fév</span>
                    <span>Mar</span>
                    <span>Avr</span>
                    <span>Mai</span>
                  </div>
                </div>
              )}

              {/* Station Logos */}
              {feature.showStations && (
                <div className="mt-6 grid grid-cols-4 gap-3">
                  {stationLogos.map((station, i) => (
                    <div key={i} className={`h-12 bg-gradient-to-br ${station.color} rounded-lg flex items-center justify-center text-white text-[10px] font-bold shadow-lg transform hover:scale-110 transition-transform`}>
                      {station.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
