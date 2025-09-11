import db from "../db.js";
import fs from "fs";
import path from "path";

// Resolve JSON file path
const filePath = path.resolve("data/con-country.json");

// Load and parse JSON file
const continentMapping = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// Fetch countries grouped by continent
export const getCountriesByContinent = async () => {
  const [rows] = await db.query("SELECT id, name, phonecode FROM countries");

  const grouped = {};

  for (const [continent, countryMap] of Object.entries(continentMapping)) {
    grouped[continent] = rows.filter((row) =>
      Object.values(countryMap).includes(row.name)
    );
  }

  return grouped;
};
