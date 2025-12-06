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
    <section id="securite" className="py-16 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-block">
            <span className="text-sm font-semibold px-4 py-2 rounded-full bg-primary/10 text-primary">
              Sécurité & Conformité
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Vos données sont protégées
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Infrastructure sécurisée de niveau bancaire
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="bg-background p-5 rounded-xl border border-border flex gap-4 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-primary" />
                </div>
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-foreground">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 text-center border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">99.9%</div>
            <div className="text-xs font-semibold text-muted-foreground">Disponibilité garantie</div>
          </div>
          <div className="bg-gradient-to-br from-accent/5 to-primary/5 rounded-xl p-5 text-center border border-accent/10">
            <div className="text-3xl font-bold text-accent mb-1">24/7</div>
            <div className="text-xs font-semibold text-muted-foreground">Support technique</div>
          </div>
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-5 text-center border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-xs font-semibold text-muted-foreground">Conforme Maroc</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
