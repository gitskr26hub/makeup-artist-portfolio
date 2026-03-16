import { getSiteData } from "@/lib/content";
import Navbar from "@/components/sections/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import PortfolioSection from "@/components/sections/PortfolioSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/sections/Footer";
import { getContentRepo, updateContentRepo } from "@/repositories/admin.repository";


export default async function Home() {

  // const data =  getSiteData()

  // console.log("content==>", { DATA__ })

const data = await getContentRepo();

// console.log({data})
  // await updateContentRepo(data);

  return (
    <main className="min-h-screen bg-obsidian-950">
      { data && <>
        <Navbar contact={data?.contact} firstName={data.firstName} lastName={data.lastName} />
        <HeroSection data={data.hero} />
        <AboutSection data={data.about} />
        <ServicesSection data={data.services} />
        <PortfolioSection data={data.portfolio} />
        <TestimonialsSection data={data.testimonials} />
        <ContactSection data={data.contact} />
        <Footer contact={data?.contact} firstName={data.firstName} lastName={data.lastName} /></>}
    </main>
  );
}
