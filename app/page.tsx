import { getSiteData } from "@/lib/content";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const data = getSiteData();

  return (
    <main className="min-h-screen bg-obsidian-950">
      <Navbar contact={data.contact} />
      <HeroSection data={data.hero} />
      <AboutSection data={data.about} />
      <ServicesSection data={data.services} />
      <PortfolioSection data={data.portfolio} />
      <TestimonialsSection data={data.testimonials} />
      <ContactSection data={data.contact} />
      <Footer data={data} />
    </main>
  );
}
