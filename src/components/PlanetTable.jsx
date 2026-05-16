import "../styles/PlanetTable.css";

function DataTable() {
  const terrestrialPlanets = [
    {
      name: "Mercury",
      mass: "0.330",
      diameter: "4,878",
      density: "5427",
      gravity: "3.7",
    },
    {
      name: "Venus",
      mass: "4.87",
      diameter: "12,104",
      density: "5243",
      gravity: "8.9",
    },
    {
      name: "Earth",
      mass: "5.97",
      diameter: "12,756",
      density: "5514",
      gravity: "9.8",
    },
    {
      name: "Mars",
      mass: "0.642",
      diameter: "6,792",
      density: "3933",
      gravity: "3.7",
    },
  ];

  const gasGiants = [
    {
      name: "Jupiter",
      mass: "1898",
      diameter: "142,984",
      density: "1326",
      gravity: "23.1",
    },
    {
      name: "Saturn",
      mass: "568",
      diameter: "120,536",
      density: "687",
      gravity: "9.0",
    },
  ];

  const iceGiants = [
    {
      name: "Uranus",
      mass: "86.8",
      diameter: "51,118",
      density: "1270",
      gravity: "8.7",
    },
    {
      name: "Neptune",
      mass: "102",
      diameter: "49,528",
      density: "1638",
      gravity: "11.0",
    },
  ];

  const dwarfPlanets = [
    {
      name: "Pluto",
      mass: "0.0146",
      diameter: "2,377",
      density: "2095",
      gravity: "0.7",
    },
  ];

  const renderPlanetCells = (planet) => (
    <>
      <td>{planet.name}</td>
      <td>{planet.mass}</td>
      <td>{planet.diameter}</td>
      <td>{planet.density}</td>
      <td>{planet.gravity}</td>
    </>
  );

  return (
    <section className="table-section">
      <div className="container">
        <div className="table-header">
          <h2>Planetary Facts at a Glance</h2>

          <p>
            Below is a comparative table of major planets in our solar system.
            The data highlights key physical properties used by astronomers and
            researchers worldwide.
          </p>
        </div>
        <p className="table-subtitle">
          Data about the planets of our solar system (Planetary facts taken from
          NASA)
        </p>

        <div className="table-wrapper">
          <table className="planet-table">
            <thead>
              <tr>
                <th colSpan="2"></th>
                <th>Name</th>
                <th>Mass (10 24kg)</th>
                <th>Diameter (km)</th>
                <th>Density (kg/m3)</th>
                <th>Gravity (m/s2)</th>
              </tr>
            </thead>

            <tbody>
              {terrestrialPlanets.map((planet, index) => (
                <tr key={planet.name}>
                  {index === 0 && (
                    <td
                      className="group-cell"
                      colSpan="2"
                      rowSpan={terrestrialPlanets.length}
                    >
                      Terrestrial Planets
                    </td>
                  )}
                  {renderPlanetCells(planet)}
                </tr>
              ))}

              {[...gasGiants, ...iceGiants].map((planet, index) => (
                <tr key={planet.name}>
                  {index === 0 && (
                    <td
                      className="group-cell"
                      rowSpan={gasGiants.length + iceGiants.length}
                    >
                      Jovian Planets
                    </td>
                  )}
                  {index === 0 && (
                    <td className="group-cell" rowSpan={gasGiants.length}>
                      Gas Giants
                    </td>
                  )}
                  {index === gasGiants.length && (
                    <td className="group-cell" rowSpan={iceGiants.length}>
                      Ice Giants
                    </td>
                  )}
                  {renderPlanetCells(planet)}
                </tr>
              ))}

              {dwarfPlanets.map((planet) => (
                <tr key={planet.name}>
                  <td className="group-cell" colSpan="2">
                    Dwarf Planets
                  </td>
                  {renderPlanetCells(planet)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default DataTable;
