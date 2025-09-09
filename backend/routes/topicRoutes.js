import express from "express";
import { getTopicsWithSubtopics } from "../modules/topicService.js";

const router = express.Router();

// GET /api/topics
router.get("/", (req, res) => {
  try {
    const topics = getTopicsWithSubtopics();
    res.json(topics);
  } catch (err) {
    console.error("Error loading topics:", err);
    res.status(500).json({ error: "Failed to load topics" });
  }
});

export default router;
