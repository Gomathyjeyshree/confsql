// routes/eventDetail.js
import express from "express";
import db from "../db.js";

const router = express.Router();

// GET /api/event/:id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const query = `SELECT * FROM event_table WHERE event_id = ?`;
    const [rows] = await db.query(query, [id]);

    if (!rows.length) return res.status(404).json({ error: "Event not found" });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
