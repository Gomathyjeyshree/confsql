import fs from "fs";
import path from "path";

// Read topics JSON
export const getTopicsWithSubtopics = () => {
  const filePath = path.resolve("data/topics.json");
  const rawData = fs.readFileSync(filePath);
  const topicsData = JSON.parse(rawData);

  // Convert to array of { id, name, subtopics[] }
  return Object.keys(topicsData).map((key, idx) => ({
    id: idx + 1,
    name: key.replace(/-/g, " "), // e.g. "engineering-and-technology"
    subtopics: Object.values(topicsData[key]) // all subtopic names
  }));
};
