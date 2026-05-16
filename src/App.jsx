import { useRef } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Hero from "./components/Hero";
import PlanetGallery from "./components/PlanetGallery";
import PlanetTable from "./components/PlanetTable";
import ContactForm from "./components/ContactForm";
import Footer from "./Components/Footer";
import "./styles/App.css";

function App() {
  const planetSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  const scrollToPlanet = () => {
    planetSectionRef.current?.scrollIntoView({ behaviour: "smoth" });
  };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Navbar scrollToForm={scrollToForm} />
      <Hero scrollToPlanet={scrollToPlanet} scrollToForm={scrollToForm} />
      <About />
      <div ref={planetSectionRef}>
        <PlanetGallery />
      </div>
      <PlanetTable />
      <div ref={formSectionRef}>
        <ContactForm />
      </div>
      <Footer />
    </>
  );
}

export default App;
