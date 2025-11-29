import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-background/80 backdrop-blur-md z-50 border-b border-border">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-md flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">P</span>
            </div>
            <span className="text-xl font-semibold">PayMaroc</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#fonctionnalites" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Fonctionnalités
            </a>
            <a href="#processus" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Comment ça marche
            </a>
            <a href="#securite" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sécurité
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-sm">
              Connexion
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Commencer
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
