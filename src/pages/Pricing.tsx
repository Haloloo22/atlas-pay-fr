import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "2,990",
    description: "Parfait pour les petites flottes",
    features: [
      { text: "Jusqu'à 10 cartes", included: true },
      { text: "Dashboard en temps réel", included: true },
      { text: "Limites par conducteur", included: true },
      { text: "Support par email", included: true },
      { text: "Rapports mensuels", included: true },
      { text: "Intégration télématique", included: false },
      { text: "API personnalisée", included: false },
      { text: "Gestionnaire de compte dédié", included: false }
    ],
    cta: "Commencer",
    popular: false
  },
  {
    name: "Business",
    price: "7,990",
    description: "Pour les flottes en croissance",
    features: [
      { text: "Jusqu'à 50 cartes", included: true },
      { text: "Dashboard en temps réel", included: true },
      { text: "Limites par conducteur", included: true },
      { text: "Support prioritaire 24/7", included: true },
      { text: "Rapports personnalisables", included: true },
      { text: "Intégration télématique", included: true },
      { text: "API personnalisée", included: true },
      { text: "Gestionnaire de compte dédié", included: false }
    ],
    cta: "Choisir Business",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Sur mesure",
    description: "Solutions personnalisées",
    features: [
      { text: "Cartes illimitées", included: true },
      { text: "Dashboard en temps réel", included: true },
      { text: "Limites par conducteur", included: true },
      { text: "Support prioritaire 24/7", included: true },
      { text: "Rapports personnalisables", included: true },
      { text: "Intégration télématique", included: true },
      { text: "API personnalisée", included: true },
      { text: "Gestionnaire de compte dédié", included: true }
    ],
    cta: "Nous contacter",
    popular: false
  }
];

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <div className="inline-block">
              <span className="text-sm font-bold px-5 py-2.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                Tarification transparente
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Un tarif pour chaque flotte
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Pas de frais cachés. Pas de surprises. Juste une solution qui grandit avec vous.
            </p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-3xl p-10 transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary shadow-[0_20px_80px_-20px_rgba(21,94,160,0.3)] scale-105'
                    : 'bg-card border-2 border-border hover:border-primary/30 hover:shadow-xl'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg">
                      Le plus populaire
                    </span>
                  </div>
                )}

                <div className="space-y-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="flex items-baseline gap-2">
                    {plan.price === "Sur mesure" ? (
                      <span className="text-4xl font-extrabold">{plan.price}</span>
                    ) : (
                      <>
                        <span className="text-5xl font-extrabold">{plan.price}</span>
                        <span className="text-xl text-muted-foreground font-semibold">MAD/mois</span>
                      </>
                    )}
                  </div>

                  <Button
                    className={`w-full text-base py-6 rounded-xl font-bold ${
                      plan.popular
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg'
                        : 'bg-secondary hover:bg-secondary/80'
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="pt-8 space-y-4">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        {feature.included ? (
                          <div className="w-6 h-6 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-4 h-4 text-success" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-0.5">
                            <X className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                        <span className={feature.included ? 'text-foreground font-medium' : 'text-muted-foreground'}>
                          {feature.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ */}
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Questions fréquentes</h2>
              <p className="text-xl text-muted-foreground">Tout ce que vous devez savoir sur nos tarifs</p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: "Puis-je changer de plan à tout moment ?",
                  a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements sont appliqués immédiatement et la facturation est ajustée au prorata."
                },
                {
                  q: "Y a-t-il des frais cachés ?",
                  a: "Absolument aucun. Le prix que vous voyez est le prix que vous payez. Pas de frais de setup, pas de frais de résiliation."
                },
                {
                  q: "Que se passe-t-il si je dépasse ma limite de cartes ?",
                  a: "Nous vous contacterons pour upgrader votre plan. Vous ne serez jamais bloqué sans préavis."
                },
                {
                  q: "Offrez-vous une période d'essai ?",
                  a: "Oui, nous offrons 14 jours d'essai gratuit sans engagement et sans carte bancaire requise."
                }
              ].map((faq, i) => (
                <div key={i} className="bg-card rounded-2xl p-8 border-2 border-border hover:border-primary/30 transition-colors">
                  <h3 className="text-xl font-bold mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
