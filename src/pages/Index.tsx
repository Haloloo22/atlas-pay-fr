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
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <ScrollProgress />
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
      <BackToTop />
    </div>
  );
};

export default Index;
