import express from "express";
import db from "../db.js";

const router = express.Router();

// Handles /:city, /:city/:topic, /:city/:subtopic
router.get("/:city/:filter?", async (req, res) => {
  const { city, filter } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    let query = `
      SELECT event_id, event_name, sdate, country, city, venue_address
      FROM event_table
      WHERE LOWER(city) = LOWER(?)`;
    let params = [city];

    if (filter) {
      // Decide if it's a topic or subtopic
      query += ` AND (LOWER(topic) = LOWER(?) OR LOWER(sub_topic) = LOWER(?))`;
      params.push(filter, filter);
    }

    // Count total
    const [countRows] = await db.query(
      `SELECT COUNT(*) AS total FROM event_table WHERE LOWER(city) = LOWER(?)` +
        (filter
          ? ` AND (LOWER(topic) = LOWER(?) OR LOWER(sub_topic) = LOWER(?))`
          : ""),
      filter ? [city, filter, filter] : [city]
    );
    const total = countRows[0].total;
    const totalPages = Math.ceil(total / limit);

    // Add pagination
    query += ` ORDER BY sdate ASC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await db.query(query, params);

    res.json({ events: rows, pagination: { total, page, totalPages, limit } });
  } catch (err) {
    console.error("❌ Error fetching city events:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
