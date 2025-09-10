// routes/eventsBySubtopics.js
import express from "express";
import db from "../db.js"; // promise pool

const router = express.Router();

// GET events by subtopic
router.get("/:subtopic", async (req, res) => {
  let { subtopic } = req.params;

  try {
    subtopic = subtopic.replace(/-/g, " ");

    const query = `
      SELECT event_name, sdate, country, venue_address
      FROM event_table
      WHERE LOWER(sub_topic) = LOWER(?)
      ORDER BY sdate ASC
    `;
    const [results] = await db.query(query, [subtopic]);

    res.json(results);
  } catch (err) {
    console.error("❌ DB Error (eventsBySubtopics):", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
