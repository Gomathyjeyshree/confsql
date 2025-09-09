import express from "express";
import db from "../db.js"; // promise pool

const router = express.Router();

// GET events by topic
router.get("/:topic", async (req, res) => {
  const { topic } = req.params;

  try {
    const query = `
      SELECT event_name, sdate, country, venue_address
      FROM event_table
      WHERE LOWER(topic) = LOWER(?)
      ORDER BY sdate ASC
    `;
    const [results] = await db.query(query, [topic]);

    res.json(results);
  } catch (err) {
    console.error("❌ DB Error (eventsByTopic):", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
