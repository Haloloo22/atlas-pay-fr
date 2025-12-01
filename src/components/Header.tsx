import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/98 backdrop-blur-xl z-50 border-b-2 border-border">
      <nav className="container mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <span className="text-primary-foreground font-black text-xl">F</span>
            </div>
            <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FleetPay</span>
          </Link>
          
          <div className="hidden lg:flex items-center space-x-10">
            <a href="/#fonctionnalites" className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="/#pour-qui" className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors">
              Pour qui
            </a>
            <Link to="/pricing" className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors">
              Tarifs
            </Link>
            <Link to="/dashboard" className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/contact" className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-base font-bold hover:text-primary">
              Connexion
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
              Demander une démo
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
