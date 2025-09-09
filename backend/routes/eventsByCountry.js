// routes/eventsByCountry.js
import express from "express";
import db from "../db.js"; // promise pool

const router = express.Router();

// Dynamic country route
router.get("/:country", async (req, res) => {
  try {
    const { country } = req.params;

    const query = `
      SELECT event_name, sdate, country, venue_address
      FROM event_table
      WHERE LOWER(country) = LOWER(?)
      ORDER BY sdate ASC
    `;

    // ✅ Using await with parameter
    const [results] = await db.query(query, [country]);

    console.log(`✅ Query Results for "${country}":`, results.length, "rows");
    res.json(results);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
