    import express from "express";
    import db from "../db.js";
    import fs from "fs";
    import path from "path";

    const router = express.Router();

    // Load country → continent mapping
    const filePath = path.resolve("data/con-country.json");
    const continentMap = JSON.parse(fs.readFileSync(filePath, "utf-8"));

    // ✅ GET events by continent with pagination
    router.get("/:continent", async (req, res) => {
    const { continent } = req.params;
    const page = parseInt(req.query.page) || 1;   // default page = 1
    const limit = parseInt(req.query.limit) || 10; // default 10 per page
    const offset = (page - 1) * limit;

    try {
        // 1️⃣ Find continent mapping
        const continentKey = continent.toLowerCase();
        const continentObj = continentMap[continentKey];

        if (!continentObj) {
        return res
            .status(404)
            .json({ error: `No mapping found for continent ${continent}` });
        }

        // 2️⃣ Extract array of country names
        const countries = Object.values(continentObj);

        if (!countries.length) {
        return res
            .status(404)
            .json({ error: `No countries found for continent ${continent}` });
        }

        // 3️⃣ Build SQL query with placeholders
        const placeholders = countries.map(() => "?").join(",");

        // Paginated query
      const query = `
  SELECT SQL_CALC_FOUND_ROWS event_id, event_name, sdate, country, venue_address
  FROM event_table
  WHERE country IN (${placeholders})
  ORDER BY sdate ASC
  LIMIT ? OFFSET ?
`;


        // Pass countries + limit + offset
        const [rows] = await db.query(query, [...countries, limit, offset]);

        // Get total rows count
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
        console.error("❌ DB Error (eventsByContinent):", err);
        res.status(500).json({ error: "Database error" });
    }
    });

    export default router;
