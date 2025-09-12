import express from "express";
import db from "../db.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Load continent-country mapping
const filePath = path.resolve("data/con-country.json");
const continentMapping = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// GET events by continent + sub_topic
router.get("/:continent/:sub_topic", async (req, res) => {
  const { continent, sub_topic } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    if (!continentMapping[continent]) {
      return res.status(400).json({ error: "Invalid continent" });
    }

    const countries = Object.values(continentMapping[continent]);

    // Count total
    const [countResult] = await db.query(
      `SELECT COUNT(*) as count
       FROM event_table
       WHERE country IN (?) AND LOWER(sub_topic) = LOWER(?)`,
      [countries, sub_topic]
    );

    const total = countResult[0].count;
    const totalPages = Math.ceil(total / limit);

    // Fetch events
    const [rows] = await db.query(
      `SELECT event_id, event_name, sdate, country, city, venue_address
       FROM event_table
       WHERE country IN (?) AND LOWER(sub_topic) = LOWER(?)
       ORDER BY sdate ASC
       LIMIT ? OFFSET ?`,
      [countries, sub_topic, limit, offset]
    );

    res.json({ events: rows, pagination: { total, page, totalPages, limit } });
  } catch (err) {
    console.error("❌ Error fetching events by continent+sub_topic:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
