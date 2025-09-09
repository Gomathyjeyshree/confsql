// countryService.js
import mysql from "mysql2/promise";

// MySQL connection pool (recommended)
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "arda_dashboard",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Static continent mapping (you can later move this to DB)
const continentMapping = {
  Asia: [
    "Azerbaijan","Bahrain","Bangladesh","Bhutan","Brunei","China","Hong Kong","India",
    "Mongolia","Nepal","Oman","Pakistan","Philippines","Qatar","Russia","Saudi Arabia"
  ],
  Africa: [
    "Algeria","Cameroon","Egypt","Ethiopia","Gambia","Ghana","Kenya","Lesotho",
    "Liberia","Mozambique","Namibia","Nigeria","Rwanda","Seychelles","Sierra Leone",
    "Somalia","South Africa","Sudan"
  ],
  Europe: [
    "Albania","Andorra","Armenia","Austria","Belarus","Belgium","Bulgaria",
    "Croatia","Cyprus","Italy","Latvia","Lithuania","Luxembourg",
    "Macedonia","Netherlands","Norway","Poland"
  ]
};

// Function to get countries grouped by continent
export async function getCountriesByContinent() {
  const [rows] = await pool.query(
    "SELECT id, name, phonecode FROM countries ORDER BY name ASC"
  );

  const grouped = {};
  for (const [continent, countries] of Object.entries(continentMapping)) {
    grouped[continent] = rows.filter(c => countries.includes(c.name));
  }

  return grouped;
}
