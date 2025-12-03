import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Mail, ArrowRight } from "lucide-react";

const Login = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24 px-6">
        <div className="container mx-auto max-w-md">
          <div className="bg-card rounded-3xl p-10 border-2 border-border shadow-xl">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Lock className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl font-bold mb-3">Connexion Client</h1>
              <p className="text-muted-foreground">
                Accédez à votre espace FleetPay
              </p>
            </div>

            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="email" 
                    placeholder="votre@email.ma" 
                    className="h-12 text-base pl-12"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-foreground">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    className="h-12 text-base pl-12"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded border-border" />
                  <span className="text-muted-foreground">Se souvenir de moi</span>
                </label>
                <a href="#" className="text-primary hover:underline font-medium">
                  Mot de passe oublié ?
                </a>
              </div>

              <Button 
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-bold"
              >
                Se connecter
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </form>

            <div className="mt-8 pt-8 border-t border-border">
              <div className="bg-accent/10 rounded-2xl p-6 text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Vous n'êtes pas encore client FleetPay ?
                </p>
                <Link to="/contact?type=demo">
                  <Button variant="outline" className="font-bold">
                    Demander une démo
                  </Button>
                </Link>
              </div>
            </div>

            <p className="text-center text-sm text-muted-foreground mt-8">
              L'accès à la plateforme est réservé aux clients FleetPay.
              <br />
              <Link to="/contact" className="text-primary hover:underline">
                Contactez-nous
              </Link>{" "}
              pour plus d'informations.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;