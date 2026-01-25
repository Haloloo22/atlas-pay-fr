import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const CTA = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-5xl">
        <div 
          ref={ref}
          className={cn(
            "relative bg-gradient-to-br from-primary via-primary to-accent rounded-3xl p-12 md:p-16 text-center overflow-hidden shadow-2xl transition-all duration-700",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
        >
          {/* Animated background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/2 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-primary-foreground/5 rounded-full animate-float"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
              Prêt à optimiser votre flotte ?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
              Rejoignez les entreprises marocaines qui réduisent leurs coûts et gagnent en visibilité avec FleetPay.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/contact?type=demo">
                <Button 
                  size="lg" 
                  className="bg-background text-primary hover:bg-background/90 text-base px-8 font-semibold shadow-xl hover:scale-105 transition-transform group"
                >
                  Réserver une démo
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="text-base px-8 font-medium border-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:scale-105 transition-all">
                  <Phone className="mr-2 h-5 w-5" />
                  Nous contacter
                </Button>
              </Link>
            </div>
            <p className="text-sm text-primary-foreground/70 mt-6">
              Déploiement en 48h • Sans engagement • Support inclus
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
