import { CreditCard, Shield, Zap, BarChart3, Smartphone, Lock } from "lucide-react";

const features = [
  {
    icon: CreditCard,
    title: "Paiements multiples",
    description: "Acceptez les cartes bancaires, virements et paiements mobiles en un seul endroit."
  },
  {
    icon: Shield,
    title: "Sécurité maximale",
    description: "Protection bancaire avec cryptage de bout en bout et conformité PCI DSS."
  },
  {
    icon: Zap,
    title: "Intégration rapide",
    description: "API simple et documentation complète. Intégrez en quelques minutes."
  },
  {
    icon: BarChart3,
    title: "Tableau de bord analytique",
    description: "Suivez vos transactions en temps réel avec des rapports détaillés."
  },
  {
    icon: Smartphone,
    title: "Mobile-first",
    description: "Interface optimisée pour tous les appareils, desktop et mobile."
  },
  {
    icon: Lock,
    title: "Conformité locale",
    description: "100% conforme aux réglementations bancaires marocaines."
  }
];

const Features = () => {
  return (
    <section id="fonctionnalites" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Une solution complète pour gérer tous vos paiements en ligne
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-lg border border-border hover:border-accent/50 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
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
