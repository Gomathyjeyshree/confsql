import express from "express";
import db from "../db.js";

const router = express.Router();

// GET events by city + topic
router.get("/:city/:topic", async (req, res) => {
  const { city, topic } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Count total events
    const [countResult] = await db.query(
      `SELECT COUNT(*) as count 
       FROM event_table
       WHERE LOWER(city) = LOWER(?) AND LOWER(topic) = LOWER(?)`,
      [city, topic]
    );

    const total = countResult[0].count;
    const totalPages = Math.ceil(total / limit);

    // Fetch events
    const [rows] = await db.query(
      `SELECT event_id, event_name, sdate, country, city, venue_address
       FROM event_table
       WHERE LOWER(city) = LOWER(?) AND LOWER(topic) = LOWER(?)
       ORDER BY sdate ASC
       LIMIT ? OFFSET ?`,
      [city, topic, limit, offset]
    );

    res.json({
      events: rows,
      pagination: { total, page, totalPages, limit },
    });
  } catch (err) {
    console.error("❌ Error fetching events by city+topic:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
