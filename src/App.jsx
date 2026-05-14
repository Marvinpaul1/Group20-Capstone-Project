import { useRef } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import "./styles/App.css";
import Hero from "./components/Hero";
import PlanetGallery from "./components/PlanetGallery";
import "./App.css";

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
      <Hero scrollToPlanet={scrollToPlanet} scrollToForm={scrollToForm} />
       <Hero scrollToPlanet={scrollToPlanet} scrollToForm={scrollToForm} /> 
      <div ref={planetSectionRef}>
        <PlanetGallery />
      </div>
    </>
  );
}

export default App;
