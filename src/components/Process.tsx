import { Truck, CreditCard, LineChart, Settings } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Créez votre flotte / ajoutez vos véhicules",
    description: "Inscription en 5 minutes. Ajoutez chaque véhicule, définissez vos chauffeurs et configurez les limites de dépenses.",
    icon: Truck,
    screenshot: true
  },
  {
    number: "02",
    title: "Distribuez les cartes physiques ou virtuelles",
    description: "Recevez vos cartes FleetPay sous 48h. Cartes virtuelles disponibles instantanément dans l'app. Activez-les depuis votre dashboard.",
    icon: CreditCard,
    screenshot: true
  },
  {
    number: "03",
    title: "Suivez les dépenses et transactions en temps réel",
    description: "Chaque paiement apparaît instantanément dans votre tableau de bord. Notifications push pour toutes les transactions.",
    icon: LineChart,
    screenshot: true
  },
  {
    number: "04",
    title: "Analysez et optimisez vos coûts",
    description: "Rapports détaillés par véhicule, chauffeur, station. Identifiez les économies potentielles. Exportez pour votre comptabilité.",
    icon: Settings,
    screenshot: true
  }
];

const Process = () => {
  return (
    <section id="processus" className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold">
            Comment ça marche
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Démarrez en trois étapes simples
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-card border-2 border-border rounded-2xl p-8 space-y-6 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="flex items-center justify-between">
                  <div className="text-5xl font-extrabold text-primary/20">
                    {step.number}
                  </div>
                  <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold leading-tight">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>

                {/* Mini Screenshot Illustration */}
                {step.screenshot && (
                  <div className="bg-secondary/50 rounded-lg p-3 border border-border">
                    <div className="bg-background rounded-md p-2 space-y-1.5">
                      <div className="h-1.5 bg-primary/30 rounded w-3/4"></div>
                      <div className="h-1.5 bg-accent/30 rounded w-1/2"></div>
                      <div className="h-1.5 bg-muted rounded w-2/3"></div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Connection Arrow */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent z-10"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
