import { CreditCard, Bell, Shield, Satellite, Gauge, Activity } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Carte carburant intelligente",
    description: "Limites par conducteur et catégories de dépenses contrôlées. Carburant, maintenance, péages.",
    gradient: "from-primary/10 via-primary/5 to-transparent"
  },
  {
    icon: Bell,
    title: "Suivi en temps réel",
    description: "Notifications push instantanées. Chaque transaction visible seconde par seconde.",
    gradient: "from-accent/10 via-accent/5 to-transparent"
  },
  {
    icon: Shield,
    title: "Anti-fraude automatique",
    description: "IA qui détecte les anomalies. Comparaison litres vs kilomètres en temps réel.",
    gradient: "from-success/10 via-success/5 to-transparent"
  },
  {
    icon: Satellite,
    title: "Intégration GPS",
    description: "Connectez vos boîtiers télématiques. Réconciliation automatique des dépenses.",
    gradient: "from-warning/10 via-warning/5 to-transparent"
  },
  {
    icon: Gauge,
    title: "Optimisation carburant",
    description: "Analyses avancées par véhicule. Recommandations d'économies personnalisées.",
    gradient: "from-primary/10 via-accent/5 to-transparent"
  },
  {
    icon: Activity,
    title: "Rapports intelligents",
    description: "Dashboard personnalisable. Exports comptables en un clic. Prévisions IA.",
    gradient: "from-accent/10 via-primary/5 to-transparent"
  }
];

const Features = () => {
  return (
    <section id="fonctionnalites" className="py-32 px-6 bg-gradient-to-b from-secondary/40 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-6 mb-24">
          <div className="inline-block">
            <span className="text-sm font-bold px-5 py-2.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
              Tout en un
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight leading-tight">
            Votre flotte sous contrôle
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Une plateforme complète qui fait bien plus que gérer vos cartes carburant
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-card rounded-3xl p-10 border-2 border-border hover:border-primary/30 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_rgba(21,94,160,0.2)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}></div>
              
              <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                <feature.icon className="w-8 h-8 text-primary group-hover:text-accent transition-colors" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
