import { Truck, HardHat, Wrench, Package, Building2 } from "lucide-react";

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

const ForWho = () => {
  return (
    <section id="pour-qui" className="py-32 px-6 bg-gradient-to-b from-background to-secondary/40">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-6 mb-24">
          <div className="inline-block">
            <span className="text-sm font-bold px-5 py-2.5 rounded-full bg-accent/10 text-accent uppercase tracking-wide">
              Pour tous les secteurs
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground tracking-tight">
            Qui utilise FleetPay ?
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            De la PME à la grande entreprise, FleetPay s'adapte à votre secteur
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {segments.map((segment, index) => (
            <div
              key={index}
              className={`group relative bg-card rounded-3xl p-10 border-2 border-border hover:border-primary/40 transition-all duration-500 hover:shadow-[0_30px_70px_-20px_rgba(21,94,160,0.25)]`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${segment.color} rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl">
                  <segment.icon className="w-10 h-10 text-primary-foreground" />
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-extrabold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {segment.title}
                    </h3>
                    <p className="text-sm font-bold text-accent uppercase tracking-wider">
                      {segment.vehicles}
                    </p>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {segment.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
          
          <div className="group relative bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-3xl p-10 border-2 border-dashed border-primary/40 hover:border-primary transition-all duration-500 flex flex-col items-center justify-center text-center hover:shadow-[0_30px_70px_-20px_rgba(21,94,160,0.25)]">
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-5xl font-black text-primary">+</span>
            </div>
            <h3 className="text-2xl font-extrabold mb-3 text-foreground">Votre secteur ?</h3>
            <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
              Chaque flotte est unique. Parlons de vos besoins.
            </p>
            <button className="text-base font-bold text-primary hover:text-accent transition-colors">
              Contactez-nous →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
