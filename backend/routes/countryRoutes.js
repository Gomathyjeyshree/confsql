import express from "express";
import { getCountriesByContinent } from "../modules/countryService.js";

const router = express.Router();

router.get("/countries-by-continent", async (req, res) => {
  try {
    const grouped = await getCountriesByContinent();
    res.json(grouped);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch countries" });
  }
});

export default router;
