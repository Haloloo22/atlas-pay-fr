import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Shield, Zap, Users, Heart, Award } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Shield,
      title: "Sécurité",
      description: "La protection des données de nos clients est notre priorité absolue.",
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "Nous développons des solutions technologiques à la pointe.",
    },
    {
      icon: Users,
      title: "Proximité",
      description: "Un accompagnement personnalisé pour chaque client.",
    },
    {
      icon: Heart,
      title: "Engagement",
      description: "Nous nous engageons à la réussite de nos partenaires.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-28 pb-24">
        {/* Hero */}
        <section className="px-6 mb-24">
          <div className="container mx-auto max-w-5xl text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8">
              Notre mission : simplifier la gestion de flotte
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              FleetPay est né de la volonté de moderniser la gestion des dépenses de carburant au Maroc avec une solution SaaS intuitive et sécurisée.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="px-6 mb-24 bg-secondary/30 py-24">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent font-bold text-sm mb-6">
                <Award className="w-4 h-4" />
                Nos valeurs
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">
                Ce qui nous guide au quotidien
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div 
                  key={index}
                  className="bg-card rounded-2xl p-8 border-2 border-border hover:border-primary/30 transition-all hover:-translate-y-1"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                    <value.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-br from-primary to-accent rounded-3xl p-12 text-center text-primary-foreground">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Prêt à optimiser votre flotte ?
              </h2>
              <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
                Découvrez comment FleetPay peut transformer la gestion de vos dépenses carburant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact?type=demo">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-bold rounded-xl">
                    Demander une démo
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-bold rounded-xl bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
