import express from "express";
import db from "../db.js";

const router = express.Router();

// GET events by month with pagination
router.get("/", async (req, res) => {
  try {
    const monthStr = req.query.month; // e.g., "january-2024"
    if (!monthStr) return res.status(400).json({ error: "Month is required" });

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Query
    const query = `
      SELECT SQL_CALC_FOUND_ROWS 
        event_id,
        event_name,
        sdate,
        edate,
        country,
        venue_address
      FROM event_table
      WHERE LOWER(month) = LOWER(?)
      ORDER BY sdate ASC
      LIMIT ? OFFSET ?
    `;

    const [rows] = await db.query(query, [monthStr, limit, offset]);

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
    console.error("❌ DB Error (eventsByMonth):", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
