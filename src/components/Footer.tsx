const Footer = () => {
  return (
    <footer className="bg-secondary/50 py-16 px-6 border-t border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-xl">F</span>
              </div>
              <span className="text-xl font-bold text-primary">FleetPay</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Solution SaaS de gestion intelligente des dépenses de flotte et cartes carburant pour les entreprises marocaines.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Produit</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#fonctionnalites" className="hover:text-primary transition-colors font-medium">Fonctionnalités</a></li>
              <li><a href="#pour-qui" className="hover:text-primary transition-colors font-medium">Pour qui</a></li>
              <li><a href="#tarifs" className="hover:text-primary transition-colors font-medium">Tarifs</a></li>
              <li><a href="#" className="hover:text-primary transition-colors font-medium">Intégrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Entreprise</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors font-medium">À propos</a></li>
              <li><a href="#" className="hover:text-primary transition-colors font-medium">Blog</a></li>
              <li><a href="#" className="hover:text-primary transition-colors font-medium">Carrières</a></li>
              <li><a href="#" className="hover:text-primary transition-colors font-medium">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-foreground">Légal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors font-medium">Confidentialité</a></li>
              <li><a href="#" className="hover:text-primary transition-colors font-medium">Conditions</a></li>
              <li><a href="#securite" className="hover:text-primary transition-colors font-medium">Sécurité</a></li>
              <li><a href="#" className="hover:text-primary transition-colors font-medium">Conformité</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 FleetPay. Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                LinkedIn
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                Twitter
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
