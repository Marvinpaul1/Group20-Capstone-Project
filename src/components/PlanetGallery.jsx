import { useState, useEffect } from "react";
import { fetchPlanets } from "../services/api";
import "../styles/PlanetGallery.css";

function PlanetCard({ planet, distanceFromSun, image, fallbackImage }) {
  return (
    <figure className="planet-card">
      <div className="planet-card-img-wrap">
        <img
          src={image}
          alt={planet}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
        />
        <div className="planet-card-overlay"></div>
      </div>
      <figcaption className="planet-card-info">
        <span className="planet-name">{planet}</span>
        <span className="planet-distance">
          <span className="distance-label">Distance from Sun</span>
          <span className="distance-value">
            {distanceFromSun.toLocaleString()} M km
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function PlanetGallery() {
  const [planets, setPlanets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // ✅ both state and setter

  useEffect(() => {
    fetchPlanets() // ✅ use the actual service
      .then((data) => {
        setPlanets(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false); // ✅ always stop loading
      });
  }, []);

  return (
    <section className="gallery-section">
      <div className="container">
        <h2 className="section-title">
          Visualizing the Differences Between Planets
        </h2>
        <p className="section-subtitle">
          Each planet in our solar system has unique physical characteristics.
          Visual comparisons help highlight how vastly different terrestrial
          planets are from gas giants and ice giants.
        </p>

        {loading ? (
          <div className="gallery-loading">
            <div className="loading-ring"></div>
            <p>Fetching planetary data...</p>
          </div>
        ) : error ? ( // ✅ handle error state in the UI
          <div className="gallery-error">
            <p>Failed to load planets: {error}</p>
          </div>
        ) : (
          <div className="planets-grid">
            {planets.map((p) => (
              <PlanetCard key={p.planet} {...p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
