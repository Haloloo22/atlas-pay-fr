import { Truck, HardHat, Wrench, Package, Building2 } from "lucide-react";

const segments = [
  {
    icon: Truck,
    title: "Flottes de livraison",
    description: "Coursiers, e-commerce, livraison de repas et colis express"
  },
  {
    icon: HardHat,
    title: "Entreprises de BTP",
    description: "Chantiers, engins lourds, déplacements de techniciens"
  },
  {
    icon: Wrench,
    title: "Maintenance & techniciens",
    description: "Interventions terrain, dépannage, services à domicile"
  },
  {
    icon: Package,
    title: "Distribution FMCG",
    description: "Distributeurs, grossistes, force de vente itinérante"
  },
  {
    icon: Building2,
    title: "PME avec véhicules de service",
    description: "Équipes commerciales, logistique, services généraux"
  }
];

const ForWho = () => {
  return (
    <section id="pour-qui" className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold px-4 py-2 rounded-full bg-accent/10 text-accent">
              Pour qui ?
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Conçu pour les entreprises marocaines
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Quelle que soit la taille de votre flotte, FleetPay s'adapte à vos besoins
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-secondary/50 to-background p-8 rounded-xl border-2 border-border hover:border-primary/40 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg">
                <segment.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">{segment.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {segment.description}
              </p>
            </div>
          ))}
          
          <div className="group bg-gradient-to-br from-primary/10 to-accent/10 p-8 rounded-xl border-2 border-dashed border-primary/30 hover:border-primary/60 transition-all duration-300 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-primary">+</span>
            </div>
            <h3 className="text-xl font-bold mb-2 text-foreground">Votre secteur ?</h3>
            <p className="text-muted-foreground mb-4">
              Discutons de vos besoins spécifiques
            </p>
            <button className="text-sm font-semibold text-primary hover:underline">
              Contactez-nous →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForWho;
