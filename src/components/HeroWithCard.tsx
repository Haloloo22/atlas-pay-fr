import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Lock, Zap, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import fleetDriverImage from "@/assets/fleet-driver.jpg";

const HeroWithCard = () => {
  return (
    <section className="relative pt-32 md:pt-40 pb-24 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10"></div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Hero text */}
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="space-y-5">
              <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight font-extrabold tracking-tight text-foreground">
                Chaque dépense sous contrôle.
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-xl">
                Nos clients <span className="font-semibold text-foreground">économisent du temps et réduisent leurs coûts de flotte</span>. 
                Cartes Visa Fleet prépayées, contrôle en temps réel, alertes automatiques.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link to="/contact?type=demo">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground text-base px-8 py-6 font-semibold rounded-lg shadow-[0_4px_20px_rgba(21,94,160,0.25)] hover:shadow-[0_6px_30px_rgba(21,94,160,0.35)] transition-all"
                >
                  Demander une démo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-base px-8 py-6 font-medium rounded-lg border-2 hover:bg-secondary/80"
                onClick={() => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank')}
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

          {/* Right: Visual showcase - Photo + Card */}
          <div className="flex flex-col items-center gap-8">
            {/* Fleet Image - Smaller and realistic */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl w-full max-w-sm">
              <img 
                src={fleetDriverImage} 
                alt="Chauffeur professionnel avec véhicule de flotte FleetPay" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent"></div>
            </div>

            {/* FleetPay Card - Below photo */}
            <div className="relative w-[320px]">
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
          </div>
        </div>

        {/* Key Metrics Section */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center space-y-2 animate-fade-in">
            <div className="text-5xl md:text-6xl font-extrabold text-primary">500+</div>
            <p className="text-lg font-semibold text-foreground">Flottes actives</p>
            <p className="text-sm text-muted-foreground">PME et ETI au Maroc</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in delay-100">
            <div className="text-5xl md:text-6xl font-extrabold text-accent">2M+</div>
            <p className="text-lg font-semibold text-foreground">MAD économisés</p>
            <p className="text-sm text-muted-foreground">Par nos clients en 2024</p>
          </div>
          <div className="text-center space-y-2 animate-fade-in delay-200">
            <div className="text-5xl md:text-6xl font-extrabold text-success">98%</div>
            <p className="text-lg font-semibold text-foreground">Satisfaction</p>
            <p className="text-sm text-muted-foreground">Taux de satisfaction client</p>
          </div>
        </div>

        {/* Trusted by section - Simplified */}
        <div className="mt-20 text-center space-y-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Ils nous font confiance
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12 opacity-60">
            <span className="text-xl font-bold text-muted-foreground">Jumia</span>
            <span className="text-xl font-bold text-muted-foreground">Glovo</span>
            <span className="text-xl font-bold text-muted-foreground">Carrefour</span>
            <span className="text-xl font-bold text-muted-foreground">Marjane</span>
            <span className="text-xl font-bold text-muted-foreground">ONCF</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithCard;
