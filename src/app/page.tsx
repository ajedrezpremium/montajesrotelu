import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import Capabilities from "@/components/Capabilities";
import Process from "@/components/Process";
import Certifications from "@/components/Certifications";
import Facilities from "@/components/Facilities";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Projects />
        <Clients />
        <Capabilities />
        <Process />
        <Certifications />
        <Facilities />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
