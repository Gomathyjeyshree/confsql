import express from "express";
import db from "../db.js";

const router = express.Router();

// GET events by country + sub_topic
router.get("/:country/:sub_topic", async (req, res) => {
  const { country, sub_topic } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const [countResult] = await db.query(
      `SELECT COUNT(*) as count 
       FROM event_table 
       WHERE LOWER(country) = LOWER(?) AND LOWER(sub_topic) = LOWER(?)`,
      [country, sub_topic]
    );

    const total = countResult[0].count;
    const totalPages = Math.ceil(total / limit);

    const [rows] = await db.query(
      `SELECT event_id, event_name, sdate, country, city, venue_address
       FROM event_table
       WHERE LOWER(country) = LOWER(?) AND LOWER(sub_topic) = LOWER(?)
       ORDER BY sdate ASC
       LIMIT ? OFFSET ?`,
      [country, sub_topic, limit, offset]
    );

    res.json({ events: rows, pagination: { total, page, totalPages, limit } });
  } catch (err) {
    console.error("❌ Error fetching events by country+sub_topic:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
