import NavbarDemo from "@/components/NavbarDemo";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WebsiteBenefits from "@/components/WebsiteBenefits";
import Services from "@/components/Services";
import MacbookShowcase from "@/components/MacbookShowcase";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <NavbarDemo />
      <Hero />
      <About />
      <WebsiteBenefits />
      <Services />
      <MacbookShowcase />
      <Process />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
