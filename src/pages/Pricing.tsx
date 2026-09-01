import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Mail } from "lucide-react";

const Pricing = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-8">
            <div className="inline-block">
              <span className="text-sm font-bold px-5 py-2.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                Tarification
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight font-display">
              À venir prochainement
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Nous préparons des offres transparentes et adaptées à chaque taille de flotte. Revenez prochainement pour découvrir nos formules.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                className="rounded-full text-base px-8 py-6 font-bold bg-primary hover:bg-primary/90 text-primary-foreground"
                asChild
              >
                <a href="mailto:contact@flect.ma">
                  <Mail className="mr-2 h-5 w-5" />
                  Être prévenu
                </a>
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-base px-8 py-6 font-bold border-2 border-ink/10 hover:border-primary/30 hover:bg-primary/5"
                asChild
              >
                <a href="/demo">Voir la démo</a>
              </Button>
            </div>

            <div className="pt-16 flex flex-col items-center gap-4 text-muted-foreground">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="w-10 h-10 text-primary" />
              </div>
              <p className="text-lg font-medium">
                Lancement des tarifs prévu très prochainement.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
