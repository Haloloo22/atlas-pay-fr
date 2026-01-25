import { Truck, HardHat, Wrench, Package, Building2 } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const segments = [
  {
    icon: Truck,
    title: "Flottes de livraison",
    description: "E-commerce, coursiers, livraison repas. Optimisez vos tournées.",
    vehicles: "10-500+ véhicules",
    color: "from-primary/5 to-accent/5"
  },
  {
    icon: HardHat,
    title: "BTP & Construction",
    description: "Chantiers, engins lourds. Contrôlez chaque litre de gasoil.",
    vehicles: "20-200 véhicules",
    color: "from-accent/5 to-success/5"
  },
  {
    icon: Wrench,
    title: "Maintenance terrain",
    description: "Techniciens, dépanneurs. Suivez chaque intervention.",
    vehicles: "5-100 véhicules",
    color: "from-success/5 to-primary/5"
  },
  {
    icon: Package,
    title: "Distribution FMCG",
    description: "Grossistes, force de vente. Tracez chaque kilomètre.",
    vehicles: "50-1000+ véhicules",
    color: "from-warning/5 to-accent/5"
  },
  {
    icon: Building2,
    title: "PME multi-secteurs",
    description: "Services, commerciaux, logistique. Une solution pour tous.",
    vehicles: "3-50 véhicules",
    color: "from-primary/5 to-warning/5"
  }
];

const SegmentCard = ({ segment, index }: { segment: typeof segments[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  
  return (
    <div
      ref={ref}
      className={cn(
        "group relative bg-card rounded-2xl p-6 border border-border transition-all duration-500",
        "hover:border-primary/40 hover:shadow-xl hover:-translate-y-2",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${segment.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
      
      <div className="relative">
        <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg">
          <segment.icon className="w-7 h-7 text-primary-foreground" />
        </div>
        
        <div className="space-y-2">
          <div>
            <h3 className="text-lg font-bold mb-1 text-foreground group-hover:text-primary transition-colors">
              {segment.title}
            </h3>
            <p className="text-xs font-bold text-accent uppercase tracking-wider">
              {segment.vehicles}
            </p>
          </div>
          <p className="text-muted-foreground leading-relaxed text-sm">
            {segment.description}
          </p>
        </div>
      </div>
    </div>
  );
};

const ForWho = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section id="pour-qui" className="py-20 px-6 bg-gradient-to-b from-background to-secondary/40">
      <div className="container mx-auto max-w-7xl">
        <div 
          ref={titleRef}
          className={cn(
            "text-center space-y-4 mb-14 transition-all duration-700",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}
        >
          <div className="inline-block">
            <span className="text-sm font-bold px-4 py-2 rounded-full bg-accent/10 text-accent uppercase tracking-wide">
              Pour tous les secteurs
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Qui utilise FleetPay ?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            De la PME à la grande entreprise, FleetPay s'adapte à votre secteur
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {segments.map((segment, index) => (
            <SegmentCard key={index} segment={segment} index={index} />
          ))}
          
          <div className="group relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-2xl p-6 border border-dashed border-primary/40 hover:border-primary transition-all duration-300 flex flex-col items-center justify-center text-center hover:shadow-xl">
            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl font-black text-primary">+</span>
            </div>
            <h3 className="text-lg font-bold mb-2 text-foreground">Votre secteur ?</h3>
            <p className="text-muted-foreground mb-4 text-sm">
              Chaque flotte est unique. Parlons de vos besoins.
            </p>
            <button className="text-sm font-bold text-primary hover:text-accent transition-colors">
              Contactez-nous →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
