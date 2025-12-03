import Header from "@/components/Header";
import HeroWithCard from "@/components/HeroWithCard";
import Features from "@/components/Features";
import Dashboard from "@/components/Dashboard";
import ForWho from "@/components/ForWho";
import Benefits from "@/components/Benefits";
import Process from "@/components/Process";
import Security from "@/components/Security";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroWithCard />
        <Features />
        <Dashboard />
        <ForWho />
        <Benefits />
        <Process />
        <Security />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
