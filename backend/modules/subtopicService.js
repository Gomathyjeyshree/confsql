import db from "../db.js";

export const getSubtopics = async () => {
  return await db.query("SELECT id, sub_topic_name FROM sub_topic");
};

// Later if you add relation
export const getSubtopicsByTopic = async (topicId) => {
  return await db.query("SELECT id, sub_topic_name FROM subtopic WHERE topic_id = ?", [topicId]);
};
