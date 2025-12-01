import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "FleetPay nous a permis de réduire nos coûts carburant de 12% en 3 mois. Le ROI a été immédiat.",
    author: "Mohammed Alami",
    role: "Directeur Logistique",
    company: "RapidExpress Maroc",
    avatar: "MA"
  },
  {
    quote: "Plus de tickets papier, plus de fraude. Tout est tracé en temps réel. Un gain de temps énorme pour notre comptabilité.",
    author: "Fatima Benkirane",
    role: "DAF",
    company: "BTP Solutions",
    avatar: "FB"
  },
  {
    quote: "L'intégration avec nos boîtiers GPS a été seamless. On voit maintenant exactement où chaque dirham est dépensé.",
    author: "Youssef Tazi",
    role: "CEO",
    company: "TechServ Distribution",
    avatar: "YT"
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-block">
            <span className="text-sm font-semibold px-4 py-2 rounded-full bg-accent/10 text-accent">
              Témoignages
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Des entreprises marocaines qui optimisent leur flotte avec FleetPay
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background rounded-2xl p-8 border-2 border-border hover:border-primary/30 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
            >
              <Quote className="w-10 h-10 text-primary/20 mb-6 group-hover:text-primary/40 transition-colors" />
              <p className="text-foreground leading-relaxed mb-6 text-lg">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-bold text-lg shadow-lg group-hover:scale-110 transition-transform">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-bold text-foreground">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  <p className="text-sm font-semibold text-primary mt-1 px-2 py-0.5 bg-primary/5 rounded inline-block">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
