import Navbar from "@/components/Navbar";
import StatsMarquee from "@/components/StatsMarquee";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Tokenomics from "@/components/Tokenomics";
import Roadmap from "@/components/Roadmap";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <StatsMarquee />
      <Hero />
      <div className="glow-divider" />
      <HowItWorks />
      <Features />
      <div className="glow-divider" />
      <Tokenomics />
      <div className="glow-divider" />
      <Roadmap />
      <CTA />
      <Footer />
    </main>
  );
}
