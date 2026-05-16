import { useState } from "react";
import fallback from "../assets/fallback_img.jpg";

// ✅ Proper React component, defined outside the async function
export const PlanetImage = ({ src }) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      onError={() => setImgSrc(fallback)} // ✅ Use the imported fallback jpg, not a component
      alt="Planet-Image"
    />
  );
};

export const fetchPlanets = async () => {
  const wikiPageByPlanet = {
    Earth: "Earth",
    Mars: "Mars",
    Jupiter: "Jupiter",
    Saturn: "Saturn",
    Uranus: "Uranus",
    Neptune: "Neptune",
    Pluto: "Pluto",
    Mercury: "Mercury_(planet)",
    Venus: "Venus",
  };

  const fetchWikipediaImage = async (planetName) => {
    const page = wikiPageByPlanet[planetName];

    if (!page) {
      return fallback; // ✅ Return the imported fallback jpg string
    }

    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`,
      );

      if (!res.ok) {
        throw new Error(`Wikipedia image request failed: ${res.status}`);
      }

      const data = await res.json();
      return data.thumbnail?.source || data.originalimage?.source || fallback; // ✅ fallback jpg
    } catch (err) {
      console.error(err);
      return fallback; // ✅ fallback jpg
    }
  };

  const normalizePlanets = async (planets) =>
    Promise.all(
      planets.map(async (planet) => {
        const planetName = planet.planet || planet.name;

        return {
          ...planet,
          planet: planetName,
          distanceFromSun: planet.distanceFromSun || planet.distance,
          image: await fetchWikipediaImage(planetName),
          fallbackImage: fallback, // ✅ Use imported fallback, not the shadowed const
        };
      }),
    );

  try {
    const res = await fetch("https://anurella.github.io/json/planets.json");

    if (!res.ok) {
      throw new Error(`Planet API request failed: ${res.status}`);
    }

    const planets = await res.json();
    return normalizePlanets(planets);
  } catch (err) {
    console.error(err);

    const fallbackRes = await fetch("/planets.json"); // ✅ Renamed to avoid shadowing the import
    const planets = await fallbackRes.json();
    return normalizePlanets(planets);
  }
};
