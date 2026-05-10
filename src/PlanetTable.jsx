import "./PlanetTable.css";

const tableData = [
  {
    name: "Mercury",
    mass: 0.33,
    diameter: 4878,
    density: 5427,
    gravity: 3.7,
    type: "Terrestrial",
  },
  {
    name: "Venus",
    mass: 4.87,
    diameter: 12104,
    density: 5243,
    gravity: 8.9,
    type: "Terrestrial",
  },
  {
    name: "Earth",
    mass: 5.97,
    diameter: 12756,
    density: 5514,
    gravity: 9.8,
    type: "Terrestrial",
  },
  {
    name: "Mars",
    mass: 0.642,
    diameter: 6792,
    density: 3933,
    gravity: 3.7,
    type: "Terrestrial",
  },
  {
    name: "Jupiter",
    mass: 1898,
    diameter: 142984,
    density: 1326,
    gravity: 23.1,
    type: "Gas Giant",
  },
  {
    name: "Saturn",
    mass: 568,
    diameter: 120536,
    density: 687,
    gravity: 9.0,
    type: "Gas Giant",
  },
  {
    name: "Uranus",
    mass: 86.8,
    diameter: 51118,
    density: 1271,
    gravity: 8.7,
    type: "Ice Giant",
  },
  {
    name: "Neptune",
    mass: 102,
    diameter: 49528,
    density: 1638,
    gravity: 11.0,
    type: "Ice Giant",
  },
  {
    name: "Pluto",
    mass: 0.013,
    diameter: 2370,
    density: 2095,
    gravity: 0.7,
    type: "Dwarf",
  },
];

const groupLabel = (type) => {
  switch (type) {
    case "Terrestrial":
      return "Terrestrial Planets";
    case "Gas Giant":
      return "Gas Giants";
    case "Ice Giant":
      return "Ice Giants";
    case "Dwarf":
      return "Dwarf Planets";
    default:
      return type;
  }
};

const subgroupLabel = (type) => {
  if (type === "Gas Giant" || type === "Ice Giant") return "Jovian Planets";
  return null;
};

export default function PlanetTable() {
  let lastType = null;

  return (
    <section className="table-section">
      <div className="container">
        <h2 className="section-title">Planetary Facts at a Glance</h2>
        <p className="section-subtitle">
          Below is a comparative table of major planets in our solar system. The
          data highlights key physical properties used by astronomers and
          researchers worldwide.
        </p>
        <p className="table-caption">
          Data about the planets of our solar system (Planetary facts taken from
          NASA)
        </p>
        <div className="table-wrapper">
          <table className="planet-table">
            <thead>
              <tr>
                <th colSpan={2}>Classification</th>
                <th>Name</th>
                <th>Mass (10²⁴kg)</th>
                <th>Diameter (km)</th>
                <th>Density (kg/m³)</th>
                <th>Gravity (m/s²)</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((planet) => {
                const showGroup = planet.type !== lastType;
                lastType = planet.type;
                const typeCount = tableData.filter(
                  (p) => p.type === planet.type,
                ).length;
                const subgroup = subgroupLabel(planet.type);

                return (
                  <tr
                    key={planet.name}
                    className={`row-${planet.type.replace(" ", "-").toLowerCase()}`}
                  >
                    {showGroup && (
                      <td className="group-cell" rowSpan={typeCount}>
                        {groupLabel(planet.type)}
                      </td>
                    )}
                    {showGroup && (
                      <td className="subgroup-cell" rowSpan={typeCount}>
                        {subgroup ?? ""}
                      </td>
                    )}
                    <td className="planet-name-cell">{planet.name}</td>
                    <td>{planet.mass}</td>
                    <td>{planet.diameter.toLocaleString()}</td>
                    <td>{planet.density.toLocaleString()}</td>
                    <td>{planet.gravity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
