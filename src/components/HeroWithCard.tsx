import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Lock, Zap, Shield, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import fleetDriverImage from "@/assets/fleet-driver.jpg";
import StationLogos from "@/components/StationLogos";

const HeroWithCard = () => {
  return (
    <section className="relative pt-28 md:pt-36 pb-20 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10"></div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Hero text */}
          <div className="space-y-8">
            <div 
              className="space-y-5 opacity-0 animate-[fade-in_0.8s_ease-out_0.1s_forwards]"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold tracking-tight text-foreground">
                Chaque dépense sous contrôle.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                <span className="font-semibold text-foreground">Économisez du temps et réduisez vos coûts de flotte</span>. 
                Cartes Visa Fleet prépayées, contrôle en temps réel, alertes automatiques.
              </p>
            </div>

            <div 
              className="flex flex-col sm:flex-row items-start gap-4 opacity-0 animate-[fade-in_0.8s_ease-out_0.3s_forwards]"
            >
              <Link to="/contact?type=demo">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 font-semibold rounded-lg shadow-[0_4px_20px_rgba(21,94,160,0.25)] hover:shadow-[0_6px_30px_rgba(21,94,160,0.35)] transition-all hover:scale-105"
                >
                  Demander une démo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-base px-8 py-6 font-medium rounded-lg border-2 hover:bg-secondary/80 hover:scale-105 transition-all"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Voir la démo
                </Button>
              </Link>
            </div>

            {/* Trust Badges - Enhanced */}
            <div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 opacity-0 animate-[fade-in_0.8s_ease-out_0.5s_forwards]"
            >
              <div className="flex items-center gap-3 p-3 rounded-xl bg-success/5 border border-success/20 hover:border-success/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-success" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground block">100% Sécurisé</span>
                  <p className="text-xs text-muted-foreground">Conforme Bank Al-Maghrib</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-warning/5 border border-warning/20 hover:border-warning/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
                  <Zap className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground block">Déploiement 48h</span>
                  <p className="text-xs text-muted-foreground">Mise en place express</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/20 hover:border-accent/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-sm font-bold text-foreground block">Sans engagement</span>
                  <p className="text-xs text-muted-foreground">Résiliable à tout moment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual showcase - Photo + Card */}
          <div className="flex flex-col items-center gap-8">
            {/* Fleet Image - Smaller and realistic */}
            <div 
              className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm opacity-0 animate-[scale-fade-in_0.8s_ease-out_0.2s_forwards]"
            >
              <img 
                src={fleetDriverImage} 
                alt="Chauffeur professionnel avec véhicule de flotte FleetPay" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            </div>

            {/* FleetPay Card - Below photo */}
            <div 
              className="relative w-[320px] opacity-0 animate-[card-entrance_1s_cubic-bezier(0.34,1.56,0.64,1)_0.4s_forwards]"
            >
              <div 
                className="relative transform hover:scale-105 transition-all duration-500 hover:rotate-1 hover:shadow-[0_30px_80px_rgba(21,94,160,0.7)]" 
                style={{ aspectRatio: '1.586/1' }}
              >
                <div className="w-full h-full bg-gradient-to-br from-[#155ea0] via-[#1a6bb8] to-[#0d4a7a] rounded-xl p-6 shadow-[0_20px_60px_rgba(21,94,160,0.6),inset_0_1px_0_rgba(255,255,255,0.1)] relative overflow-hidden">
                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/10"></div>
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] hover:translate-x-[200%] transition-transform duration-1000"></div>
                  
                  <div className="relative h-full flex flex-col justify-between">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-8 bg-gradient-to-br from-amber-200 to-amber-400 rounded opacity-80 animate-pulse"></div>
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

              {/* Subtle stack effect with animation */}
              <div className="absolute top-2 left-2 right-2 bottom-2 bg-gradient-to-br from-[#0d4a7a] to-[#155ea0] rounded-xl shadow-lg opacity-0 -z-10 animate-[fade-in_0.5s_ease-out_0.6s_forwards] [animation-fill-mode:forwards]" style={{ opacity: 0.3 }}></div>
              <div className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-[#0a3d68] to-[#0d4a7a] rounded-xl shadow-md opacity-0 -z-20 animate-[fade-in_0.5s_ease-out_0.8s_forwards] [animation-fill-mode:forwards]" style={{ opacity: 0.15 }}></div>
            </div>
          </div>
        </div>

        {/* Value Propositions - Reduced spacing */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 opacity-0 animate-[float-up_0.8s_ease-out_0.6s_forwards]">
            <div className="text-5xl md:text-6xl font-extrabold text-primary">-15%</div>
            <p className="text-lg font-semibold text-foreground">Sur vos coûts carburant</p>
            <p className="text-sm text-muted-foreground">Économies potentielles</p>
          </div>
          <div className="text-center space-y-2 opacity-0 animate-[float-up_0.8s_ease-out_0.8s_forwards]">
            <div className="text-5xl md:text-6xl font-extrabold text-accent">48h</div>
            <p className="text-lg font-semibold text-foreground">Déploiement express</p>
            <p className="text-sm text-muted-foreground">Mise en service rapide</p>
          </div>
          <div className="text-center space-y-2 opacity-0 animate-[float-up_0.8s_ease-out_1s_forwards]">
            <div className="text-5xl md:text-6xl font-extrabold text-success">100%</div>
            <p className="text-lg font-semibold text-foreground">Traçabilité garantie</p>
            <p className="text-sm text-muted-foreground">Chaque transaction suivie</p>
          </div>
        </div>

        {/* Accepted stations with real logos */}
        <div className="mt-16 text-center space-y-6 opacity-0 animate-[fade-in_0.8s_ease-out_1.2s_forwards]">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Acceptée partout au Maroc
          </p>
          <StationLogos variant="marquee" className="max-w-2xl mx-auto" />
        </div>
      </div>
    </section>
  );
};

export default HeroWithCard;