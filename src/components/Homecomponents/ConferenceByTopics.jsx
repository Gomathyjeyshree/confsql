import React, { useEffect, useState } from "react";

export default function ConferenceByTopics() {
  const [topics, setTopics] = useState([]);
  const [activeTopic, setActiveTopic] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/topics")
      .then(res => res.json())
      .then(data => {
        setTopics(data);
        if (data.length > 0) setActiveTopic(data[0].id); // default first topic
      })
      .catch(err => console.error(err));
  }, []);

  const active = topics.find(t => t.id === activeTopic);

  return (
    <div className="bg-gray-50 py-12 px-6 min-h-screen">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-purple-700">
        Conference By Topics
      </h2>

      {/* Sidebar + Subtopics Container */}
      <div className="flex max-w-6xl mx-auto border rounded-xl shadow overflow-hidden">
        {/* Topics Sidebar */}
        <div className="w-1/3 bg-white border-r overflow-y-auto">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTopic(topic.id)}
              className={`w-full text-left px-4 py-3 border-b last:border-none transition flex justify-between items-center
                ${
                  activeTopic === topic.id
                    ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold"
                    : "hover:bg-pink-50 text-gray-800"
                }`}
            >
              {topic.name}
              {activeTopic === topic.id && <span className="ml-2">›</span>}
            </button>
          ))}
        </div>

        {/* Subtopics Panel */}
        <div className="w-2/3 p-4 bg-gray-50 max-h-[500px] overflow-y-auto">
          {active ? (
            active.subtopics.length > 0 ? (
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {active.subtopics.map((sub, idx) => (
                  <li key={idx} className="text-gray-800 text-sm flex items-start">
                    <span className="mr-2 text-purple-500">•</span>
                    {sub}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No subtopics available.</p>
            )
          ) : (
            <p className="text-gray-500 italic">Select a topic to see subtopics.</p>
          )}
        </div>
      </div>
    </div>
  );
}
