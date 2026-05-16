const FALLBACK_IMAGE = "/images/fallback_img.jpg";

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
      return FALLBACK_IMAGE;
    }

    try {
      const res = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`,
      );

      if (!res.ok) {
        throw new Error(`Wikipedia image request failed: ${res.status}`);
      }

      const data = await res.json();
      return (
        data.thumbnail?.source || data.originalimage?.source || FALLBACK_IMAGE
      );
    } catch (err) {
      console.error(err);
      return FALLBACK_IMAGE;
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
          fallbackImage: FALLBACK_IMAGE,
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
    console.error("Primary fetch failed:", err);
    try {
      const fallbackRes = await fetch("/planets.json");
      if (!fallbackRes.ok) {
        throw new Error(
          `Local fallback also failed (${fallbackRes.status}). Make sure planets.json is in /public.`,
        );
      }
      const planets = await fallbackRes.json();
      return normalizePlanets(planets);
    } catch (fallbackErr) {
      throw new Error(fallbackErr.message);
    }
  }
};
