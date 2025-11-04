import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import About from "./routes/about";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";


export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Footer />
    </div>
  );
}
