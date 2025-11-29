import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import CardShowcase from "@/components/CardShowcase";
import ForWho from "@/components/ForWho";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import Security from "@/components/Security";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <Features />
        <Dashboard />
        <CardShowcase />
        <ForWho />
        <Benefits />
        <Process />
        <Security />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
