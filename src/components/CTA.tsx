import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-accent rounded-2xl p-12 md:p-16 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-bold text-accent-foreground">
            Prêt à commencer ?
          </h2>
          <p className="text-xl text-accent-foreground/90 max-w-2xl mx-auto">
            Rejoignez des centaines d'entreprises marocaines qui font confiance à PayMaroc 
            pour gérer leurs paiements en ligne.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button 
              size="lg" 
              className="bg-background text-foreground hover:bg-background/90 text-base px-8"
            >
              Créer un compte gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-accent-foreground border-accent-foreground/20 hover:bg-accent-foreground/10 text-base px-8"
            >
              Contactez-nous
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
