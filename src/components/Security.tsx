import { Shield, Lock, FileCheck, Headphones } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Cryptage bancaire",
    description: "Toutes les données sont cryptées avec les standards bancaires internationaux."
  },
  {
    icon: Lock,
    title: "Conformité PCI DSS",
    description: "Certifié conforme aux normes de sécurité des données de l'industrie des cartes de paiement."
  },
  {
    icon: FileCheck,
    title: "Audits réguliers",
    description: "Audits de sécurité mensuels par des experts indépendants."
  },
  {
    icon: Headphones,
    title: "Support dédié",
    description: "Équipe disponible 24/7 pour répondre à toutes vos questions."
  }
];

const Security = () => {
  return (
    <section id="securite" className="py-20 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Sécurité et confiance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Vos données et celles de vos clients sont notre priorité
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-lg border border-border flex gap-6 hover:border-accent/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-accent/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-accent" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 px-8 py-4 bg-background rounded-lg border border-border">
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">99.9%</div>
              <div className="text-sm text-muted-foreground mt-1">Disponibilité</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">24/7</div>
              <div className="text-sm text-muted-foreground mt-1">Support</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center">
              <div className="text-3xl font-bold text-accent">100%</div>
              <div className="text-sm text-muted-foreground mt-1">Conforme</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
