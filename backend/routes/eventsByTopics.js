import express from "express";
import db from "../db.js"; // promise pool

const router = express.Router();

// GET events by topic with pagination
router.get("/:topic", async (req, res) => {
  try {
    let { topic } = req.params;
    topic = topic.replace(/-/g, " ");

    // Pagination parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Paginated query with SQL_CALC_FOUND_ROWS
    const query = `
      SELECT SQL_CALC_FOUND_ROWS event_id, event_name, sdate, country, venue_address
      FROM event_table
      WHERE LOWER(topic) = LOWER(?)
      ORDER BY sdate ASC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [topic, limit, offset]);

    // Get total rows
    const [[{ "FOUND_ROWS()": total }]] = await db.query(`SELECT FOUND_ROWS()`);

    res.json({
      events: rows,
      pagination: {
        total,
        page,
        totalPages: Math.ceil(total / limit),
        limit,
      },
    });
  } catch (err) {
    console.error("❌ DB Error (eventsByTopic):", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
