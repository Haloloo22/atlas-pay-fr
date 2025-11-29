const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-secondary/60 to-secondary/80 py-20 px-6 border-t-2 border-border">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-11 h-11 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-primary-foreground font-black text-xl">F</span>
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">FleetPay</span>
            </div>
            <p className="text-base text-muted-foreground leading-relaxed font-medium">
              La solution SaaS n°1 pour gérer vos dépenses de flotte au Maroc.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all font-bold">
                Li
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all font-bold">
                Tw
              </a>
              <a href="#" className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all font-bold">
                Fb
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 text-foreground text-lg">Produit</h4>
            <ul className="space-y-4 text-base">
              <li><a href="/#fonctionnalites" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Fonctionnalités</a></li>
              <li><a href="/#pour-qui" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Pour qui</a></li>
              <li><a href="/pricing" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Tarifs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Intégrations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 text-foreground text-lg">Entreprise</h4>
            <ul className="space-y-4 text-base">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">À propos</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Blog</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Carrières</a></li>
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold mb-6 text-foreground text-lg">Légal</h4>
            <ul className="space-y-4 text-base">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Confidentialité</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">CGU/CGV</a></li>
              <li><a href="/#securite" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Sécurité</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors font-semibold">Conformité</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t-2 border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-base text-muted-foreground font-semibold">
              © 2025 FleetPay. Tous droits réservés.
            </p>
            <p className="text-sm text-muted-foreground">
              Fait avec ❤️ à Casablanca, Maroc
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
