// routes/eventsByCountryTopic.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// GET events by country + topic
router.get("/:country/:topic", async (req, res) => {
  const { country, topic } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // 1️⃣ Count total events
    const [countResult] = await db.query(
      `SELECT COUNT(*) AS total
       FROM event_table
       WHERE LOWER(country) = LOWER(?)
         AND LOWER(topic) = LOWER(?)`,
      [country, topic]
    );

    const total = countResult[0].total;
    const totalPages = Math.ceil(total / limit);

    // 2️⃣ Fetch events
    const [rows] = await db.query(
      `SELECT event_id, event_name, sdate, country, city, venue_address
       FROM event_table
       WHERE LOWER(country) = LOWER(?)
         AND LOWER(topic) = LOWER(?)
       ORDER BY sdate ASC
       LIMIT ? OFFSET ?`,
      [country, topic, limit, offset]
    );

    res.json({
      events: rows,
      pagination: { total, page, totalPages, limit },
    });
  } catch (err) {
    console.error("❌ Error fetching events by country+topic:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
