import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Target, Users, Shield, Zap, Award, Heart } from "lucide-react";

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

  const milestones = [
    { year: "2022", event: "Création de FleetPay à Casablanca" },
    { year: "2023", event: "Lancement de la première version de la plateforme" },
    { year: "2024", event: "100 entreprises clientes" },
    { year: "2025", event: "Expansion nationale et nouvelles fonctionnalités" },
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

        {/* Story */}
        <section className="px-6 mb-24">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                  <Target className="w-4 h-4" />
                  Notre histoire
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Une solution pensée par des experts de la mobilité
                </h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    FleetPay a été fondé par une équipe passionnée par la technologie et la mobilité, avec une mission claire : offrir aux entreprises marocaines un outil moderne pour gérer leurs flottes de véhicules.
                  </p>
                  <p>
                    Face à des processus de remboursement manuels, des risques de fraude et un manque de visibilité sur les dépenses, nous avons développé une plateforme complète qui centralise tout.
                  </p>
                  <p>
                    Aujourd'hui, FleetPay accompagne des centaines d'entreprises à travers le Maroc, de la PME à l'ETI.
                  </p>
                </div>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-10 border-2 border-primary/10">
                <h3 className="text-2xl font-bold mb-8">Notre parcours</h3>
                <div className="space-y-6">
                  {milestones.map((milestone, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-16 h-10 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <span className="font-bold text-primary">{milestone.year}</span>
                      </div>
                      <p className="text-muted-foreground pt-2">{milestone.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
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

        {/* Team placeholder */}
        <section className="px-6 mb-24">
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                <Users className="w-4 h-4" />
                L'équipe
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Des experts à votre service
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Notre équipe combine expertise technologique et connaissance approfondie du marché marocain.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card rounded-2xl p-8 border-2 border-border text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Users className="w-12 h-12 text-primary/50" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Membre de l'équipe</h3>
                  <p className="text-primary font-medium mb-3">Fonction</p>
                  <p className="text-muted-foreground text-sm">
                    Expert passionné par l'innovation dans le secteur de la mobilité.
                  </p>
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
                Rejoignez les centaines d'entreprises qui font confiance à FleetPay.
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