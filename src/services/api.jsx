export const fetchPlanets = async () => {
  const fallbackImage =
    "https://commons.wikimedia.org/wiki/Special:FilePath/Solar%20System%20true%20color%20(planets%20only).jpg?width=900";

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
      return fallbackImage;
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
        data.thumbnail?.source || data.originalimage?.source || fallbackImage
      );
    } catch (err) {
      console.error(err);
      return fallbackImage;
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
          fallbackImage,
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

    const fallback = await fetch("/planets.json");
    const planets = await fallback.json();
    return normalizePlanets(planets);
  }
};
