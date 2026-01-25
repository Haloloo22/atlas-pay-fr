import { Truck, CreditCard, LineChart, Settings } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Créez votre flotte / ajoutez vos véhicules",
    description: "Inscription en 5 minutes. Ajoutez chaque véhicule, définissez vos chauffeurs et configurez les limites de dépenses.",
    icon: Truck
  },
  {
    number: "02",
    title: "Distribuez les cartes physiques ou virtuelles",
    description: "Recevez vos cartes FleetPay sous 48h. Cartes virtuelles disponibles instantanément dans l'app. Activez-les depuis votre dashboard.",
    icon: CreditCard
  },
  {
    number: "03",
    title: "Suivez les dépenses et transactions en temps réel",
    description: "Chaque paiement apparaît instantanément dans votre tableau de bord. Notifications push pour toutes les transactions.",
    icon: LineChart
  },
  {
    number: "04",
    title: "Analysez et optimisez vos coûts",
    description: "Rapports détaillés par véhicule, chauffeur, station. Identifiez les économies potentielles. Exportez pour votre comptabilité.",
    icon: Settings
  }
];

const StepCard = ({ step, index, isLast }: { step: typeof steps[0]; index: number; isLast: boolean }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });
  
  return (
    <div ref={ref} className="relative group">
      <div 
        className={cn(
          "bg-card border border-border rounded-xl p-5 space-y-4 transition-all duration-500",
          "hover:border-primary/50 hover:shadow-lg hover:-translate-y-2",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}
        style={{ transitionDelay: `${index * 150}ms` }}
      >
        <div className="flex items-center justify-between">
          <div className="text-3xl font-extrabold text-primary/20 group-hover:text-primary/40 transition-colors">
            {step.number}
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
            <step.icon className="w-5 h-5 text-primary" />
          </div>
        </div>
        
        <h3 className="text-base font-bold leading-tight group-hover:text-primary transition-colors">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {step.description}
        </p>

        {/* Mini Screenshot Illustration */}
        <div className="bg-secondary/50 rounded-lg p-3 border border-border overflow-hidden">
          <div className="bg-background rounded-md p-3 space-y-2">
            <div className="flex items-center gap-1 mb-2">
              <div className="w-1.5 h-1.5 rounded-full bg-destructive/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-warning/60"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-success/60"></div>
            </div>
            <div className="h-2 bg-primary/20 rounded w-3/4"></div>
            <div className="h-2 bg-accent/20 rounded w-1/2"></div>
            <div className="h-1.5 bg-muted/50 rounded w-full"></div>
            <div className="h-1.5 bg-muted/50 rounded w-5/6"></div>
          </div>
        </div>
      </div>
      
      {/* Vertical Timeline Line (visible on larger screens) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-full left-1/2 w-0.5 h-8 bg-gradient-to-b from-primary/30 to-transparent -translate-x-1/2 z-10"></div>
      )}
      
      {/* Connection Arrow (horizontal on large screens) */}
      {!isLast && (
        <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-border to-transparent z-10"></div>
      )}
    </div>
  );
};

const Process = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="processus" className="py-14 px-6">
      <div className="container mx-auto max-w-6xl">
        <div 
          ref={titleRef}
          className={cn(
            "text-center space-y-3 mb-12 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Comment ça marche
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Démarrez en quatre étapes simples
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 relative">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} isLast={index === steps.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
