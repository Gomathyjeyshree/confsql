import express from "express";
import { getSubtopics, getSubtopicsByTopic } from "../modules/subtopicService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const subtopics = await getSubtopics();
    res.json(subtopics);
  } catch (err) {
    console.error("Error fetching subtopics:", err);
    res.status(500).json({ error: "Server error fetching subtopics" });
  }
});

router.get("/topic/:id", async (req, res) => {
  try {
    const subtopics = await getSubtopicsByTopic(req.params.id);
    res.json(subtopics);
  } catch (err) {
    console.error("Error fetching subtopics by topic:", err);
    res.status(500).json({ error: "Server error fetching subtopics by topic" });
  }
});

export default router;
