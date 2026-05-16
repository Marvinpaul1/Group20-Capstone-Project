import { useRef } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import "./styles/App.css";
import Hero from "./components/Hero";
import PlanetGallery from "./components/PlanetGallery";
import ContactForm from "./components/ContactForm";
import Footer from "./Components/Footer";

function App() {
  const planetSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  const scrollToPlanet = () => {
    planetSectionRef.current?.scrollIntoView({ behaviour: "smoth" });
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
import { useRef } from "react";
import PlanetTable from "./components/PlanetTable";
import "./styles/App.css";

export default function App() {
  return (
    <>
      <Navbar scrollToForm={scrollToForm} />
      <Hero scrollToPlanet={scrollToPlanet} scrollToForm={scrollToForm} />
      <About />
      <div ref={planetSectionRef}>
        <PlanetGallery />
      </div>
      <div ref={formSectionRef}>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
      <PlanetTable />
    </>
  );
}

export default App;
