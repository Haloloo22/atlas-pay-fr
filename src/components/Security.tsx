import { Shield, Lock, FileCheck, UserCheck } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Sécurité bancaire",
    description: "Chiffrement de bout en bout et protection des données conformes aux standards bancaires internationaux."
  },
  {
    icon: Lock,
    title: "Conformité Bank Al-Maghrib",
    description: "100% conforme aux réglementations de Bank Al-Maghrib et aux normes de sécurité marocaines."
  },
  {
    icon: FileCheck,
    title: "Audits et certifications",
    description: "Audits de sécurité réguliers par des experts indépendants. Conformité PCI DSS niveau 1."
  },
  {
    icon: UserCheck,
    title: "Gestion des droits utilisateurs",
    description: "Contrôle granulaire des accès. Rôles personnalisables pour chaque membre de votre équipe."
  }
];

const Security = () => {
  return (
    <section id="securite" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold px-4 py-2 rounded-full bg-primary/10 text-primary">
              Sécurité & Conformité
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Vos données sont protégées
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Infrastructure sécurisée de niveau bancaire. Conformité totale aux réglementations marocaines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-xl border-2 border-border flex gap-6 hover:border-primary/30 hover:shadow-lg transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 text-center border-2 border-primary/10">
            <div className="text-5xl font-bold text-primary mb-2">99.9%</div>
            <div className="text-sm font-semibold text-muted-foreground">Disponibilité garantie</div>
            <p className="text-xs text-muted-foreground mt-2">Infrastructure redondante</p>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-8 text-center border-2 border-accent/10">
            <div className="text-5xl font-bold text-accent mb-2">24/7</div>
            <div className="text-sm font-semibold text-muted-foreground">Support technique</div>
            <p className="text-xs text-muted-foreground mt-2">Équipe dédiée disponible</p>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 text-center border-2 border-primary/10">
            <div className="text-5xl font-bold text-primary mb-2">100%</div>
            <div className="text-sm font-semibold text-muted-foreground">Conforme</div>
            <p className="text-xs text-muted-foreground mt-2">Réglementations marocaines</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
