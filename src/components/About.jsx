import "../styles/About.css";

export default function About() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-section-container">
          <div className="video-wrapper">
            <video className="about-video" autoPlay muted loop playsInline>
              <source src="./videos/satalite.mp4" type="video/mp4" />
              Your browser does not support video.
            </video>
          </div>
          <div className="planetary">
            <h2 className="section-title">
              How Planetary Data Helps Us Understand Space
            </h2>
            <p className="section-subtitle">
              {" "}
              Planetary science goes beyond images. Comparing{" "}
              <strong>mass, diameter, gravity,</strong> and{" "}
              <strong>density</strong>, we gain insight into how planets form,
              behave, and interact within the solar system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
