import React, { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight } from "react-icons/fa";
import { FaSeedling } from "react-icons/fa6"; // subtopic icon
import axios from "axios";

export default function FilterAccordion({ onSelectSubtopic }) {
  const [topics, setTopics] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);

  // Fetch topics + subtopics from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/topics") // ✅ adjust if your backend port differs
      .then((res) => {
        setTopics(res.data);
      })
      .catch((err) => {
        console.error("Error fetching topics:", err);
      });
  }, []);

  const toggleCategory = (category) => {
    setOpenCategory(openCategory === category ? null : category);
  };

  return (
    <div className="w-80 border rounded-md shadow bg-white">
      {topics.map((topic, idx) => (
        <div key={idx} className="border-b">
          {/* Category Header */}
          <button
            onClick={() => toggleCategory(topic.category)}
            className="flex justify-between items-center w-full p-3 font-medium text-gray-700 hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <i className="fa fa-desktop" /> {topic.category}
            </span>
            {openCategory === topic.category ? (
              <FaChevronDown size={14} />
            ) : (
              <FaChevronRight size={14} />
            )}
          </button>

          {/* Subtopics */}
          {openCategory === topic.category && (
            <ul className="p-2 pl-6 space-y-2 bg-gray-50">
              {topic.subtopics?.map((sub, i) => (
                <li
                  key={i}
                  onClick={() => onSelectSubtopic && onSelectSubtopic(sub)}
                  className="flex items-center gap-2 p-1 cursor-pointer hover:text-blue-600"
                >
                  <FaSeedling className="text-yellow-500" /> {sub}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
