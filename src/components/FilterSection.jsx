import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FilterSection({ onFilterChange }) {
  const [filters, setFilters] = useState({
    continent: "",
    country: "",
    city: "",
    topic: "",
    subtopic: "",
    month: "",
  });

  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);

  // Load topics from API
  useEffect(() => {
    axios
      .get("/api/topics")
      .then((res) => {
        let data = res.data;

        // If API returns object instead of array, convert to array
        if (!Array.isArray(data)) {
          data = Object.keys(data).map((key, idx) => ({
            id: idx + 1,
            name: key.replace(/-/g, " "), // optional: prettify topic name
            subtopics: Object.values(data[key]),
          }));
        }

        setTopics(data);
      })
      .catch((err) => console.error("Failed to load topics:", err));
  }, []);

  // Update subtopics when topic changes
  useEffect(() => {
    const selectedTopic = topics.find((t) => t.name === filters.topic);
    setSubtopics(selectedTopic ? selectedTopic.subtopics : []);
    setFilters((prev) => ({ ...prev, subtopic: "" }));
  }, [filters.topic, topics]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg shadow">
      {/* Continent */}
      <select
        name="continent"
        value={filters.continent}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Continent</option>
        <option value="asia">Asia</option>
        <option value="europe">Europe</option>
        <option value="africa">Africa</option>
        <option value="north-america">North America</option>
        <option value="south-america">South America</option>
        <option value="australia">Australia</option>
      </select>

      {/* Country */}
      <select
        name="country"
        value={filters.country}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Country</option>
        <option value="india">India</option>
        <option value="germany">Germany</option>
        <option value="usa">USA</option>
        <option value="france">France</option>
      </select>

      {/* City */}
      <select
        name="city"
        value={filters.city}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select City</option>
        <option value="chennai">Chennai</option>
        <option value="berlin">Berlin</option>
        <option value="new-york">New York</option>
        <option value="paris">Paris</option>
      </select>

      {/* Topic */}
      <select
        name="topic"
        value={filters.topic}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Topic</option>
        {Array.isArray(topics) &&
          topics.map((t) => (
            <option key={t.id} value={t.name}>
              {t.name}
            </option>
          ))}
      </select>

      {/* Subtopic */}
      <select
        name="subtopic"
        value={filters.subtopic}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Subtopic</option>
        {Array.isArray(subtopics) &&
          subtopics.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
      </select>

      {/* Month */}
      <select
        name="month"
        value={filters.month}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Month</option>
        <option value="january-2025">January 2025</option>
        <option value="february-2025">February 2025</option>
        <option value="march-2025">March 2025</option>
        <option value="april-2025">April 2025</option>
      </select>
    </div>
  );
}
