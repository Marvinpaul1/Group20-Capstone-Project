import "./Hero.css";
import earthImg from "../assets/NASA_Earth.jpg";

export default function Hero({ scrollToPlanets, scrollToForm }) {
  return (
    <section className="hero">
      <div className="hero-stars"></div>
      <div className="hero-inner container">
        <div className="hero-content">
          <p className="hero-eyebrow">NASA Data . Solar System</p>
          <h1 className="hero-title">
            Explore Our Solar System
            <br />
            <span className="hero-title-accent">Through Data</span>
          </h1>
          <p className="hero-dec">
            Understand the planets not just by name, but by measurable facts.
            From size and mass to gravity and density, this page breaks down the
            solar system in a clear, data-driven way.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={scrollToPlanets}>
              Explore the Data
            </button>
            <button className="btn-outline" onClick={scrollToForm}>
              Contact Us
            </button>
          </div>
        </div>
        <div className="hero-visual">
          <div className="planet-glow"></div>
          <img
            src={earthImg}
            // src="https://www.usgs.gov/media/images/earth-image-space"
            alt="Earth from space"
            className="hero-planet-img"
          />
        </div>
      </div>
      <div className="hero-scroll-hint">
        <span></span>
      </div>
    </section>
  );
}
