import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/#fonctionnalites", label: "Fonctionnalités", isAnchor: true },
    { href: "/#pour-qui", label: "Pour qui", isAnchor: true },
    { href: "/pricing", label: "Tarifs", isAnchor: false },
    { href: "/about", label: "À propos", isAnchor: false },
    { href: "/contact", label: "Contact", isAnchor: false },
  ];

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
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              link.isAnchor ? (
                <a 
                  key={link.href}
                  href={link.href} 
                  className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              ) : (
                <Link 
                  key={link.href}
                  to={link.href} 
                  className="text-base font-semibold text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-base font-bold hover:text-primary">
                Connexion
              </Button>
            </Link>
            <Link to="/contact?type=demo">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base px-6 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                Demander une démo
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col gap-6 mt-8">
                  {/* Mobile Nav Links */}
                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      link.isAnchor ? (
                        <a 
                          key={link.href}
                          href={link.href} 
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-semibold text-foreground hover:text-primary transition-colors py-2"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link 
                          key={link.href}
                          to={link.href} 
                          onClick={() => setIsOpen(false)}
                          className="text-lg font-semibold text-foreground hover:text-primary transition-colors py-2"
                        >
                          {link.label}
                        </Link>
                      )
                    ))}
                  </div>

                  {/* Mobile CTA Buttons */}
                  <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    <Link to="/auth" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full text-base font-bold py-6">
                        Connexion
                      </Button>
                    </Link>
                    <Link to="/contact?type=demo" onClick={() => setIsOpen(false)}>
                      <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base py-6 rounded-xl">
                        Demander une démo
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
