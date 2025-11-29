import { Lock, CheckCircle } from "lucide-react";

const CardShowcase = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold px-4 py-2 rounded-full bg-primary/10 text-primary">
                Cartes FleetPay
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Une carte acceptée partout.{" "}
              <span className="text-primary">Des règles intelligentes intégrées.</span>
            </h2>
            
            <p className="text-lg text-muted-foreground leading-relaxed">
              Émettez des cartes physiques ou virtuelles pour chaque conducteur avec des limites personnalisées. 
              Acceptées dans toutes les stations-service au Maroc.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Limites par conducteur et par catégorie</h4>
                  <p className="text-sm text-muted-foreground">
                    Définissez des plafonds quotidiens, hebdomadaires ou mensuels. Carburant, lavage, maintenance, péages.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Activation / blocage instantané</h4>
                  <p className="text-sm text-muted-foreground">
                    Bloquez ou activez une carte en un clic depuis votre dashboard ou application mobile.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-6 h-6 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-1">Sécurisée et conforme</h4>
                  <p className="text-sm text-muted-foreground">
                    Puce EMV, code PIN, conformité Bank Al-Maghrib. Vos dépenses sont protégées.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="bg-gradient-to-br from-primary via-primary to-accent rounded-2xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-10 bg-primary-foreground/20 rounded"></div>
                    <Lock className="w-6 h-6 text-primary-foreground/80" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="w-3/4 h-3 bg-primary-foreground/30 rounded"></div>
                    <div className="w-1/2 h-3 bg-primary-foreground/20 rounded"></div>
                  </div>

                  <div className="pt-8">
                    <p className="text-2xl font-bold text-primary-foreground tracking-wider mb-4">
                      •••• •••• •••• 4582
                    </p>
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-primary-foreground/60 mb-1">Titulaire</p>
                        <p className="font-bold text-primary-foreground">AHMED BENJELLOUN</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-primary-foreground/60 mb-1">Expire</p>
                        <p className="font-bold text-primary-foreground">12/27</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/20">
                    <div className="font-bold text-primary-foreground text-lg">FleetPay</div>
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary-foreground/30"></div>
                      <div className="w-8 h-8 rounded-full bg-primary-foreground/30"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Second card in background */}
            <div className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-accent to-primary rounded-2xl shadow-xl opacity-50 -z-10"></div>
            <div className="absolute top-8 left-8 right-8 bottom-8 bg-gradient-to-br from-primary/40 to-accent/40 rounded-2xl shadow-lg opacity-30 -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardShowcase;
