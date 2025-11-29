import { TrendingDown, Clock, Eye } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Réduisez vos coûts carburant",
    description: "Optimisation intelligente, règles automatiques, prévention de la fraude. Économisez jusqu'à 15% sur vos dépenses de flotte.",
    color: "from-accent/10 to-accent/5 border-accent/20"
  },
  {
    icon: Clock,
    title: "Gagnez du temps",
    description: "Plus de tickets papier à gérer. Plus de notes de frais. Tout est digitalisé et centralisé en temps réel.",
    color: "from-primary/10 to-primary/5 border-primary/20"
  },
  {
    icon: Eye,
    title: "Visibilité totale",
    description: "Toutes les dépenses de votre flotte centralisées sur un seul tableau de bord. Rapports instantanés et exports comptables.",
    color: "from-accent/10 to-accent/5 border-accent/20"
  }
];

const Benefits = () => {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Pourquoi choisir FleetPay ?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des avantages concrets dès le premier jour
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${benefit.color} rounded-2xl p-8 border-2`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <benefit.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
