// routes/events.js
import express from "express";
import db from "../db.js";

const router = express.Router();


// ✅ Get all event details (name, date, venue)
router.get("/all", async (req, res) => {
  try {
    const [results] = await db.query(
      "SELECT event_name, sdate, country, venue_address FROM event_table"
    );

    console.log("📩 Events fetched:", results);
    res.json(results);
  } catch (err) {
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});


// ✅ Get events by country
// ✅ Get all events by country
router.get("/:country", (req, res) => {
  const { country } = req.params;
  const query = "SELECT event_name, sdate, country, venue_address FROM event_table WHERE country = ?";
  db.query(query, [country], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});



export default router;
