import express from "express";
import db from "../db.js"; // promise pool

const router = express.Router();

router.get("/:city", async (req, res) => {
  try {
    const { city } = req.params;

    // 1️⃣ Pagination params
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // 2️⃣ Paginated query
 const query = `
  SELECT  
         event_id, event_name, sdate, country, city, venue_address
  FROM event_table
  WHERE LOWER(city) = LOWER(?)
  ORDER BY sdate ASC
  LIMIT ? OFFSET ?
`;


    const [rows] = await db.query(query, [city, limit, offset]);

    // 3️⃣ Get total count (faster than SQL_CALC_FOUND_ROWS)
    const [[{ total }]] = await db.query(
      `SELECT COUNT(*) AS total FROM event_table WHERE LOWER(city) = LOWER(?)`,
      [city]
    );

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
    console.error("❌ DB Error:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
