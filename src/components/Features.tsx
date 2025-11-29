import { CreditCard, Bell, Shield, Gauge, Satellite, Activity } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Carte carburant intelligente",
    description: "Limites par conducteur et catégories de dépenses contrôlées (carburant, maintenance, péages)."
  },
  {
    icon: Bell,
    title: "Suivi en temps réel",
    description: "Notifications instantanées. Transactions visibles seconde par seconde sur votre dashboard."
  },
  {
    icon: Shield,
    title: "Anti-fraude et contrôle avancé",
    description: "Comparaison litres consommés vs kilomètres parcourus. Détection automatique des anomalies."
  },
  {
    icon: Satellite,
    title: "Intégration télématique",
    description: "Connectez GPS, odomètre et données de consommation. Réconciliation automatique des dépenses."
  },
  {
    icon: Gauge,
    title: "Optimisation carburant",
    description: "Analyse de la consommation par véhicule et conducteur. Recommandations d'optimisation."
  },
  {
    icon: Activity,
    title: "Rapports détaillés",
    description: "Tableaux de bord personnalisables, exports Excel, prévisions de dépenses et analyses approfondies."
  }
];

const Features = () => {
  return (
    <section id="fonctionnalites" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold px-4 py-2 rounded-full bg-primary/10 text-primary">
              Caractéristiques principales
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Tout ce dont votre flotte a besoin
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une solution complète pour contrôler chaque dépense, chaque litre, chaque kilomètre
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-background p-8 rounded-xl border-2 border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
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
