const FALLBACK_IMAGE = "/images/fallback_img.jpg";

const PLANETS_FALLBACK = [
  {
    planet: "Mercury",
    distanceFromSun: 57.9,
    mass: 0.33,
    diameter: 4879,
    density: 5427,
    gravity: 3.7,
  },
  {
    planet: "Venus",
    distanceFromSun: 108.2,
    mass: 4.87,
    diameter: 12104,
    density: 5243,
    gravity: 8.9,
  },
  {
    planet: "Earth",
    distanceFromSun: 149.6,
    mass: 5.97,
    diameter: 12756,
    density: 5514,
    gravity: 9.8,
  },
  {
    planet: "Mars",
    distanceFromSun: 227.9,
    mass: 0.642,
    diameter: 6792,
    density: 3933,
    gravity: 3.7,
  },
  {
    planet: "Jupiter",
    distanceFromSun: 778.6,
    mass: 1898,
    diameter: 142984,
    density: 1326,
    gravity: 23.1,
  },
  {
    planet: "Saturn",
    distanceFromSun: 1433.5,
    mass: 568,
    diameter: 120536,
    density: 687,
    gravity: 9.0,
  },
  {
    planet: "Uranus",
    distanceFromSun: 2872.5,
    mass: 86.8,
    diameter: 51118,
    density: 1271,
    gravity: 8.7,
  },
  {
    planet: "Neptune",
    distanceFromSun: 4495.1,
    mass: 102,
    diameter: 49528,
    density: 1638,
    gravity: 11.0,
  },
  {
    planet: "Pluto",
    distanceFromSun: 5906.4,
    mass: 0.0146,
    diameter: 2377,
    density: 2095,
    gravity: 0.7,
  },
];

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
  if (!page) return FALLBACK_IMAGE;

  try {
    const res = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(page)}`,
    );
    if (!res.ok) throw new Error(`Wikipedia request failed: ${res.status}`);
    const data = await res.json();
    return (
      data.thumbnail?.source || data.originalimage?.source || FALLBACK_IMAGE
    );
  } catch (err) {
    console.error(`Image fetch failed for ${planetName}:`, err);
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

export const fetchPlanets = async () => {
  // 1. Try the remote API first
  try {
    const res = await fetch("https://anurella.github.io/json/planets.json");
    if (!res.ok) throw new Error(`Remote API failed: ${res.status}`);
    const planets = await res.json();
    return normalizePlanets(planets);
  } catch (remoteErr) {
    console.warn(
      "Remote planet API unavailable, using built-in data:",
      remoteErr.message,
    );
  }

  // 2. Try local /public/planets.json if it exists
  try {
    const res = await fetch("/planets.json");
    // Check Content-Type before parsing — catches HTML 404 pages
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok || !contentType.includes("application/json")) {
      throw new Error("Not a valid JSON response");
    }
    const planets = await res.json();
    return normalizePlanets(planets);
  } catch (localErr) {
    console.warn(
      "Local planets.json not found, using hardcoded fallback:",
      localErr.message,
    );
  }

  // 3. Always works — hardcoded data built into the app, no file needed
  return normalizePlanets(PLANETS_FALLBACK);
};
