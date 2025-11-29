import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-6 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="inline-block">
              <span className="text-sm font-semibold px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
                Solution SaaS pour flottes d'entreprise
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight text-foreground">
              Contrôlez vos dépenses de flotte.{" "}
              <span className="text-primary">En temps réel.</span>{" "}
              <span className="text-muted-foreground">Sans papier.</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              La solution marocaine de cartes carburant et de gestion intelligente des dépenses 
              pour les équipes terrain, les livreurs, les techniciens et les flottes d'entreprise.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 font-semibold">
                Demander une démo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-base px-8 font-medium border-2">
                <Play className="mr-2 h-5 w-5" />
                Essayer gratuitement
              </Button>
            </div>

            <div className="pt-8 flex flex-wrap items-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xs font-bold">✓</span>
                </div>
                <span className="text-muted-foreground font-medium">Sans engagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xs font-bold">✓</span>
                </div>
                <span className="text-muted-foreground font-medium">Déploiement en 48h</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xs font-bold">✓</span>
                </div>
                <span className="text-muted-foreground font-medium">Support dédié</span>
              </div>
            </div>
          </div>

          <div className="relative animate-in fade-in slide-in-from-right-8 duration-1000 delay-300">
            <div className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl p-8 border border-border shadow-2xl">
              <div className="bg-background rounded-xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <h3 className="font-bold text-lg">Tableau de bord FleetPay</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                    <div className="w-3 h-3 rounded-full bg-muted"></div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-sm font-medium">Dépenses du mois</span>
                    <span className="text-lg font-bold text-primary">45,280 MAD</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <span className="text-sm font-medium">Économies réalisées</span>
                    <span className="text-lg font-bold text-accent">12,450 MAD</span>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg flex items-end justify-around p-3">
                    <div className="w-12 bg-primary/40 rounded-t" style={{height: '60%'}}></div>
                    <div className="w-12 bg-primary/60 rounded-t" style={{height: '80%'}}></div>
                    <div className="w-12 bg-primary rounded-t" style={{height: '100%'}}></div>
                    <div className="w-12 bg-accent/60 rounded-t" style={{height: '70%'}}></div>
                    <div className="w-12 bg-accent/40 rounded-t" style={{height: '50%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
