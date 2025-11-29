import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-md z-50 border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-xl">F</span>
            </div>
            <span className="text-xl font-bold text-primary">FleetPay</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#fonctionnalites" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Fonctionnalités
            </a>
            <a href="#pour-qui" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Pour qui
            </a>
            <a href="#securite" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Sécurité
            </a>
            <a href="#tarifs" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
              Tarifs
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm font-medium">
              Connexion
            </Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
              Demander une démo
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
