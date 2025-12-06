import { TrendingDown, Clock, Eye } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Réduisez vos coûts",
    subtitle: "Jusqu'à 15% d'économies",
    description: "Notre IA détecte les anomalies, prévient la fraude et optimise vos dépenses carburant. Résultats mesurables dès le premier mois.",
    color: "from-accent via-accent/80 to-accent/60",
    stat: "-15%"
  },
  {
    icon: Clock,
    title: "Gagnez du temps",
    subtitle: "80% de temps administratif en moins",
    description: "Fini les tickets papier et les notes de frais. Tout est digitalisé, centralisé et automatiquement réconcilié avec votre comptabilité.",
    color: "from-primary via-primary/80 to-primary/60",
    stat: "80%"
  },
  {
    icon: Eye,
    title: "Visibilité totale",
    subtitle: "Données en temps réel",
    description: "Un seul dashboard pour toute votre flotte. Alertes instantanées, rapports automatiques et insights actionnables 24/7.",
    color: "from-success via-success/80 to-success/60",
    stat: "24/7"
  }
];

const Benefits = () => {
  return (
    <section className="py-16 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Des résultats concrets
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Nos clients constatent l'impact dès les premières semaines
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-10 group-hover:opacity-15 transition-opacity`}></div>
              
              <div className="relative bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-primary/30 transition-all">
                <div className="flex items-start justify-between mb-5">
                  <div className={`w-14 h-14 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <benefit.icon className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className={`text-4xl font-black bg-gradient-to-br ${benefit.color} bg-clip-text text-transparent`}>
                      {benefit.stat}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <h3 className="text-xl font-bold mb-1 text-foreground">{benefit.title}</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-wider">{benefit.subtitle}</p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
