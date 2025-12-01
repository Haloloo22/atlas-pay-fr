import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Lock, Zap, Shield } from "lucide-react";
import fleetDriverImage from "@/assets/fleet-driver.jpg";

const HeroWithCard = () => {
  return (
    <section className="relative pt-20 pb-24 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10"></div>
      
      <div className="container mx-auto max-w-7xl">
        {/* Hero text */}
        <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 mb-16">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20">
              <Zap className="w-3.5 h-3.5 text-accent" />
              <span className="text-xs font-bold text-accent uppercase tracking-wide">Solution N°1 au Maroc</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                Chaque dirham compte.
              </span>{" "}
              <span className="block mt-2 text-foreground">Chaque dépense sous contrôle.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
              Nos clients <span className="font-semibold text-foreground">économisent du temps et réduisent leurs coûts de flotte</span>. 
              Cartes Visa Fleet prépayées, contrôle en temps réel, alertes automatiques.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 font-semibold rounded-lg shadow-[0_4px_20px_rgba(21,94,160,0.25)] hover:shadow-[0_6px_30px_rgba(21,94,160,0.35)] transition-all"
            >
              Demander une démo
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-8 py-6 font-medium rounded-lg border-2 hover:bg-secondary/80"
            >
              <Play className="mr-2 h-5 w-5" />
              Voir la vidéo
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold text-foreground">100% Sécurisé</span>
              </div>
              <p className="text-xs text-muted-foreground">Conforme Bank Al-Maghrib</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-warning" />
                <span className="text-sm font-semibold text-foreground">Déploiement 48h</span>
              </div>
              <p className="text-xs text-muted-foreground">Mise en place express</p>
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-accent text-xs font-bold">✓</span>
                </div>
                <span className="text-sm font-semibold text-foreground">Sans engagement</span>
              </div>
              <p className="text-xs text-muted-foreground">Résiliable à tout moment</p>
            </div>
          </div>
        </div>

        {/* Visual showcase - Photo with overlapping card */}
        <div className="relative max-w-5xl mx-auto">
          {/* Main Fleet Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src={fleetDriverImage} 
              alt="Chauffeur professionnel avec véhicule de flotte FleetPay" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent"></div>
          </div>

          {/* Overlapping FleetPay Card - Bottom right */}
          <div className="absolute -bottom-8 -right-8 lg:-bottom-12 lg:-right-12 w-[280px] sm:w-[340px] z-20">
            <div className="relative transform hover:scale-105 transition-transform duration-500 hover:rotate-1" style={{ aspectRatio: '1.586/1' }}>
              <div className="w-full h-full bg-gradient-to-br from-[#155ea0] via-[#1a6bb8] to-[#0d4a7a] rounded-xl p-6 shadow-[0_20px_60px_rgba(21,94,160,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden">
                {/* Metallic shine effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                
                <div className="relative h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="w-10 h-8 bg-gradient-to-br from-amber-200 to-amber-400 rounded opacity-80"></div>
                    <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      <Lock className="w-3 h-3 text-white/90" />
                      <span className="text-[10px] font-semibold text-white/90">Sécurisée</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <div className="w-8 h-6 bg-gradient-to-br from-amber-200/50 to-amber-400/50 rounded"></div>
                    <p className="text-lg font-semibold text-white tracking-[0.15em] font-mono">
                      •••• •••• •••• 4582
                    </p>
                  </div>

                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[8px] text-white/60 mb-0.5 uppercase tracking-wider">Titulaire</p>
                      <p className="font-semibold text-white text-xs">AHMED BENJELLOUN</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] text-white/60 mb-0.5 uppercase tracking-wider">Expire</p>
                      <p className="font-semibold text-white text-xs">12/27</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="font-bold text-white text-base tracking-tight">FleetPay</div>
                    <div className="flex gap-1">
                      <div className="w-6 h-6 rounded-full bg-red-500/80"></div>
                      <div className="w-6 h-6 rounded-full bg-orange-400/80 -ml-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtle stack effect */}
            <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-[#0d4a7a] to-[#155ea0] rounded-xl shadow-lg opacity-30 -z-10"></div>
          </div>

          {/* Statistics overlay - Top left of image */}
          <div className="absolute top-6 left-6 bg-background/95 backdrop-blur-sm rounded-2xl shadow-xl p-6 max-w-xs border border-border/50">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-3xl font-bold text-primary">500+</p>
                <p className="text-sm text-muted-foreground">Flottes actives</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-accent">2M+</p>
                <p className="text-sm text-muted-foreground">MAD économisés</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-success">98%</p>
                <p className="text-sm text-muted-foreground">Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-warning">48h</p>
                <p className="text-sm text-muted-foreground">Déploiement</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trusted by section */}
        <div className="mt-20 text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {/* Placeholder for client logos - Replace with real logos */}
            <div className="h-12 px-8 flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
              <span className="text-lg font-bold text-muted-foreground">Jumia</span>
            </div>
            <div className="h-12 px-8 flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
              <span className="text-lg font-bold text-muted-foreground">Glovo</span>
            </div>
            <div className="h-12 px-8 flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
              <span className="text-lg font-bold text-muted-foreground">Carrefour</span>
            </div>
            <div className="h-12 px-8 flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
              <span className="text-lg font-bold text-muted-foreground">Marjane</span>
            </div>
            <div className="h-12 px-8 flex items-center justify-center bg-muted/30 rounded-lg border border-border/50">
              <span className="text-lg font-bold text-muted-foreground">ONCF</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithCard;
