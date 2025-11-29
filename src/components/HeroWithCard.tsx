import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Lock, Zap, Shield } from "lucide-react";
import fleetDriverImage from "@/assets/fleet-driver.jpg";

const HeroWithCard = () => {
  return (
    <section className="relative pt-24 pb-16 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background -z-10"></div>
      
      <div className="container mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual showcase - Card + Photo side by side */}
          <div className="order-2 lg:order-1">
            <div className="grid grid-cols-1 gap-8 max-w-xl mx-auto lg:mx-0">
              {/* Real Fleet Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={fleetDriverImage} 
                  alt="Chauffeur professionnel avec véhicule de flotte FleetPay" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent"></div>
              </div>

              {/* Realistic Bank Card */}
              <div className="relative">
                <div className="relative z-10 transform hover:scale-105 transition-transform duration-700" style={{ aspectRatio: '1.586/1' }}>
                  <div className="w-full h-full bg-gradient-to-br from-primary via-[#1e5a8e] to-accent rounded-2xl p-8 shadow-[0_20px_80px_-20px_rgba(21,94,160,0.6)]">
                    <div className="h-full flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-10 bg-primary-foreground/20 rounded-lg backdrop-blur-sm"></div>
                        <div className="flex items-center gap-2 bg-primary-foreground/10 px-3 py-1.5 rounded-full backdrop-blur-sm">
                          <Lock className="w-3.5 h-3.5 text-primary-foreground/90" />
                          <span className="text-xs font-semibold text-primary-foreground/90">Sécurisée</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="w-10 h-8 bg-primary-foreground/30 rounded"></div>
                        <p className="text-2xl font-bold text-primary-foreground tracking-[0.2em] font-mono">
                          •••• •••• •••• 4582
                        </p>
                      </div>

                      <div className="flex items-end justify-between">
                        <div>
                          <p className="text-[10px] text-primary-foreground/70 mb-1 uppercase tracking-wider">Titulaire</p>
                          <p className="font-bold text-primary-foreground text-sm">AHMED BENJELLOUN</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-primary-foreground/70 mb-1 uppercase tracking-wider">Expire</p>
                          <p className="font-bold text-primary-foreground text-sm">12/27</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-primary-foreground/15">
                        <div className="font-bold text-primary-foreground text-xl tracking-tight">FleetPay</div>
                        <div className="flex gap-1.5">
                          <div className="w-8 h-8 rounded-full bg-primary-foreground/25 backdrop-blur-sm"></div>
                          <div className="w-8 h-8 rounded-full bg-primary-foreground/25 backdrop-blur-sm"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stack effect cards with proper aspect ratio */}
                <div className="absolute top-4 left-4 right-4 bottom-4 bg-gradient-to-br from-accent to-primary/90 rounded-2xl shadow-2xl opacity-40 -z-10" style={{ aspectRatio: '1.586/1' }}></div>
                <div className="absolute top-8 left-8 right-8 bottom-8 bg-gradient-to-br from-primary/60 to-accent/60 rounded-2xl shadow-xl opacity-25 -z-20" style={{ aspectRatio: '1.586/1' }}></div>
              </div>
            </div>
          </div>

          {/* Right: Hero text */}
          <div className="order-1 lg:order-2 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-accent/10 border border-accent/20">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-bold text-accent uppercase tracking-wide">Solution N°1 au Maroc</span>
              </div>
              
              <h1 className="text-[3.5rem] md:text-[4.5rem] lg:text-[5.5rem] leading-[0.95] font-extrabold tracking-tighter">
                <span className="text-foreground">Contrôlez</span>{" "}
                <span className="text-foreground">vos dépenses</span>{" "}
                <span className="block mt-3 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  en temps réel
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                Cartes carburant intelligentes pour flottes d'entreprise. 
                Zéro papier, contrôle total, économies garanties.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start gap-5">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-10 py-7 font-bold rounded-xl shadow-[0_8px_30px_rgba(21,94,160,0.3)] hover:shadow-[0_12px_40px_rgba(21,94,160,0.4)] transition-all"
              >
                Demander une démo
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 py-7 font-semibold rounded-xl border-2 hover:bg-secondary/80"
              >
                <Play className="mr-3 h-6 w-6" />
                Voir la vidéo
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-success" />
                  <span className="text-sm font-bold text-foreground">100% Sécurisé</span>
                </div>
                <p className="text-xs text-muted-foreground">Conforme Bank Al-Maghrib</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-warning" />
                  <span className="text-sm font-bold text-foreground">Déploiement 48h</span>
                </div>
                <p className="text-xs text-muted-foreground">Mise en place express</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                    <span className="text-accent text-xs font-bold">✓</span>
                  </div>
                  <span className="text-sm font-bold text-foreground">Sans engagement</span>
                </div>
                <p className="text-xs text-muted-foreground">Résiliable à tout moment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroWithCard;
