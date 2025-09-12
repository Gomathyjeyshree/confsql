import express from "express";
import db from "../db.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Load continent-country mapping
const filePath = path.resolve("data/con-country.json");
const continentMapping = JSON.parse(fs.readFileSync(filePath, "utf-8"));

// GET events by continent + topic
router.get("/:continent/:topic", async (req, res) => {
  const { continent, topic } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // 1️⃣ Check continent exists in mapping
    if (!continentMapping[continent]) {
      return res.status(400).json({ error: "Invalid continent" });
    }

    // 2️⃣ Get countries of this continent
    const countries = Object.values(continentMapping[continent]); // ["India","China","Japan",...]

    if (countries.length === 0) {
      return res.json({
        events: [],
        pagination: { total: 0, page, totalPages: 0, limit },
      });
    }

   const placeholders = countries.map(() => "?").join(","); // "?,?,?,?"
const countQuery = `
  SELECT COUNT(*) as count
  FROM event_table
  WHERE country IN (${placeholders})
    AND LOWER(topic) = LOWER(?)
`;

const [countResult] = await db.query(countQuery, [...countries, topic]);
const total = countResult[0].count;
const totalPages = Math.ceil(total / limit);

// 4️⃣ Fetch events
const eventsQuery = `
  SELECT event_id, event_name, sdate, country, city, venue_address
  FROM event_table
  WHERE country IN (${placeholders})
    AND LOWER(topic) = LOWER(?)
  ORDER BY sdate ASC
  LIMIT ? OFFSET ?
`;

const [rows] = await db.query(eventsQuery, [...countries, topic, limit, offset]);

res.json({
  events: rows,
  pagination: { total, page, totalPages, limit },
});
  } catch (err) {
    console.error("❌ Error fetching events by continent+topic:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
