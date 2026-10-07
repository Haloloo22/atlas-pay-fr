import { Shield, Lock, FileCheck, UserCheck } from "lucide-react";

const trustItems = [
  {
    icon: Shield,
    title: "Accès sécurisé",
    description: "Connexion à votre compte pour accéder aux données de votre entreprise."
  },
  {
    icon: Lock,
    title: "Données de votre entreprise",
    description: "L'accès aux données est limité aux membres de votre entreprise selon leurs droits."
  },
  {
    icon: FileCheck,
    title: "Suivi des opérations",
    description: "Retrouvez les transactions et les alertes dans votre tableau de bord."
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
              Sécurité & Accès
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Vos données sont protégées
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Des accès adaptés aux responsabilités de votre équipe
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="bg-background p-5 rounded-xl border border-border flex gap-4 hover:border-primary/30 hover:shadow-md transition-all"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
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
          <div className="bg-accent rounded-xl p-5 text-center border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">Suivi</div>
            <div className="text-xs font-semibold text-muted-foreground">Transactions et alertes</div>
          </div>
          <div className="bg-accent rounded-xl p-5 text-center border border-accent/10">
            <div className="text-3xl font-bold text-ink mb-1">24/7</div>
            <div className="text-xs font-semibold text-muted-foreground">Accès au tableau de bord</div>
          </div>
          <div className="bg-accent rounded-xl p-5 text-center border border-primary/10">
            <div className="text-3xl font-bold text-primary mb-1">Rôles</div>
            <div className="text-xs font-semibold text-muted-foreground">Accès selon les responsabilités</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Security;
