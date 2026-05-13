import { useRef } from "react";
import Navbar from "./components/Navbar";
import PlanetGallery from "./components/PlanetGallery";
import "./App.css";

function App() {
  const planetSectionRef = useRef(null);
  const formSectionRef = useRef(null);

  // const scrollToPlanet = () => {
  //   planetSectionRef.current?.scrollIntoView({ behaviour: "smoth" });
  // };

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Navbar scrollToForm={scrollToForm} />
      {/* <Hero scrollToPlanet={scrollToPlanet} scrollToForm={scrollToForm} /> */}
      <div ref={planetSectionRef}>
        <PlanetGallery />
      </div>
    </>
  );
}

export default App;
