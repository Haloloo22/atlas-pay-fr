import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <div className="inline-block">
            <span className="text-sm font-medium px-4 py-2 rounded-full bg-secondary text-foreground">
              Solution de paiement pour le Maroc
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight max-w-4xl mx-auto leading-tight">
            Acceptez les paiements
            <span className="block mt-2">en toute simplicité</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Une plateforme de paiement moderne conçue pour les entreprises marocaines. 
            Sécurisée, rapide et conforme aux normes locales.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-base px-8">
              Démarrer gratuitement
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-base px-8">
              Planifier une démo
            </Button>
          </div>

          <div className="pt-12 flex items-center justify-center gap-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xs">✓</span>
              </div>
              <span>Sans engagement</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xs">✓</span>
              </div>
              <span>Configuration en 5 minutes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-accent text-xs">✓</span>
              </div>
              <span>Support 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
