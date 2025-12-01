import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center space-y-6 mb-20">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight">
              Parlons de votre flotte
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Notre équipe est là pour répondre à toutes vos questions et vous accompagner dans votre projet.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-card rounded-3xl p-10 border-2 border-border shadow-xl">
              <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>
              <form className="space-y-6">
                <div className="space-y-3 mb-6">
                  <label className="text-sm font-bold text-foreground">Type de demande</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      type="button"
                      className="px-6 py-4 rounded-xl border-2 border-primary bg-primary/10 text-primary font-bold hover:bg-primary/20 transition-all"
                    >
                      💬 Message
                    </button>
                    <button 
                      type="button"
                      className="px-6 py-4 rounded-xl border-2 border-border hover:border-accent hover:bg-accent/10 font-bold transition-all"
                    >
                      📅 Réserver un appel
                    </button>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Prénom</label>
                    <Input placeholder="Ahmed" className="h-12 text-base" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Nom</label>
                    <Input placeholder="Benjelloun" className="h-12 text-base" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Email professionnel</label>
                  <Input type="email" placeholder="ahmed@entreprise.ma" className="h-12 text-base" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Téléphone</label>
                  <Input type="tel" placeholder="+212 6 12 34 56 78" className="h-12 text-base" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Entreprise</label>
                  <Input placeholder="Nom de votre entreprise" className="h-12 text-base" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Taille de la flotte</label>
                  <Input placeholder="Nombre de véhicules" className="h-12 text-base" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-foreground">Message</label>
                  <Textarea 
                    placeholder="Parlez-nous de votre projet..." 
                    className="min-h-[150px] text-base" 
                  />
                </div>

                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-bold">
                  Envoyer le message
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 border-2 border-primary/10">
                <h2 className="text-3xl font-bold mb-8">Nos coordonnées</h2>
                
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Adresse</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        123 Boulevard Hassan II<br />
                        Casablanca, Maroc<br />
                        20250
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Téléphone</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        +212 5 22 12 34 56<br />
                        +212 6 12 34 56 78 (Mobile)
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-success/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-success" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Email</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        contact@fleetpay.ma<br />
                        support@fleetpay.ma
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-warning/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-7 h-7 text-warning" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">Horaires</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Lundi - Vendredi: 9h - 18h<br />
                        Samedi: 9h - 13h<br />
                        Dimanche: Fermé
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-accent/5 rounded-3xl p-10 border-2 border-accent/10">
                <h3 className="text-2xl font-bold mb-4">Besoin d'une démo ?</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                  Planifiez un rendez-vous avec notre équipe pour une démonstration personnalisée de FleetPay.
                </p>
                <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-lg py-6 rounded-xl font-bold">
                  Réserver une démo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
