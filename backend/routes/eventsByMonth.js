import express from "express";
import db from "../db.js";

const router = express.Router();

// GET events by month
router.get("/", async (req, res) => {
  try {
    const monthStr = req.query.month; // e.g., "january-2024"
    if (!monthStr) return res.status(400).json({ error: "Month is required" });

    // Case-insensitive match
    const [rows] = await db.query(
      "SELECT * FROM event_table WHERE LOWER(month) = LOWER(?) ORDER BY sdate ASC",
      [monthStr]
    );

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
