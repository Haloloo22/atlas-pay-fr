import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, Sparkles, LayoutGrid, Tag, Building, Phone, Linkedin, Twitter, Facebook } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useHeaderScroll } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useHeaderScroll();

  const navLinks = [
    { href: "/#fonctionnalites", label: "Fonctionnalités", isAnchor: true, icon: LayoutGrid },
    { href: "/#pour-qui", label: "Pour qui", isAnchor: true, icon: Building },
    { href: "/pricing", label: "Tarifs", isAnchor: false, icon: Tag },
    { href: "/about", label: "À propos", isAnchor: false, icon: Sparkles },
    { href: "/contact", label: "Contact", isAnchor: false, icon: Phone },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 w-full bg-background/98 backdrop-blur-xl z-50 border-b transition-all duration-300",
        scrolled 
          ? "py-0 shadow-lg border-border/50" 
          : "py-0 border-border"
      )}
    >
      <nav className={cn(
        "container mx-auto px-6 transition-all duration-300",
        scrolled ? "py-3" : "py-5"
      )}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className={cn(
              "bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300",
              scrolled ? "w-9 h-9" : "w-11 h-11"
            )}>
              <span className={cn(
                "text-primary-foreground font-black transition-all duration-300",
                scrolled ? "text-lg" : "text-xl"
              )}>F</span>
            </div>
            <span className={cn(
              "font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-300",
              scrolled ? "text-xl" : "text-2xl"
            )}>FleetPay</span>
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
              <Button variant="ghost" className="text-sm font-medium text-muted-foreground hover:text-primary">
                Connexion
              </Button>
            </Link>
            <Link to="/contact?type=demo">
              <Button 
                className={cn(
                  "bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group",
                  scrolled ? "text-sm px-5 py-5" : "text-base px-6 py-6"
                )}
              >
                <span className="relative z-10">Demander une démo</span>
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-[shimmer_1.5s_infinite] transition-opacity" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-11 w-11">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Ouvrir le menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col h-full">
                  <div className="flex flex-col gap-2 mt-8 flex-1">
                    {/* Mobile Nav Links with Icons */}
                    {navLinks.map((link, index) => {
                      const Icon = link.icon;
                      const content = (
                        <div 
                          className="flex items-center gap-4 text-lg font-semibold text-foreground hover:text-primary hover:bg-primary/5 transition-all py-4 px-3 rounded-xl"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          {link.label}
                        </div>
                      );
                      
                      return link.isAnchor ? (
                        <a 
                          key={link.href}
                          href={link.href} 
                          onClick={() => setIsOpen(false)}
                        >
                          {content}
                        </a>
                      ) : (
                        <Link 
                          key={link.href}
                          to={link.href} 
                          onClick={() => setIsOpen(false)}
                        >
                          {content}
                        </Link>
                      );
                    })}

                    {/* Mobile CTA Buttons */}
                    <div className="flex flex-col gap-3 pt-6 mt-4 border-t border-border">
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

                  {/* Mobile Footer with Social Links */}
                  <div className="pt-6 pb-4 border-t border-border mt-auto">
                    <p className="text-sm text-muted-foreground mb-4">Suivez-nous</p>
                    <div className="flex gap-3">
                      <a href="#" className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                        <Linkedin className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                        <Twitter className="w-5 h-5" />
                      </a>
                      <a href="#" className="w-11 h-11 rounded-xl bg-primary/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all">
                        <Facebook className="w-5 h-5" />
                      </a>
                    </div>
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
