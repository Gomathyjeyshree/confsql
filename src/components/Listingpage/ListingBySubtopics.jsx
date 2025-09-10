import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ListingBySubtopics() {
  const { subtopic } = useParams(); // get subtopic from URL
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!subtopic) return;
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/eventsBySubtopics/${subtopic}`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [subtopic]);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) return <p className="text-center py-12">Loading events...</p>;
  if (!events.length)
    return <p className="text-center py-12">No events found for {subtopic}.</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Events for {subtopic}</h2>
      <table className="min-w-full divide-y divide-gray-200 bg-white shadow rounded-lg">
        <thead className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Event Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Country
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Venue
            </th>
          </tr>
        </thead>
        <tbody>
          {events.map((event, idx) => (
            <tr key={idx}>
              <td className="px-6 py-4 font-semibold">{event.event_name}</td>
              <td className="px-6 py-4">
                {new Date(event.sdate).toLocaleDateString("en-GB")}
              </td>
              <td className="px-6 py-4">{event.country}</td>
              <td className="px-6 py-4">{stripHtml(event.venue_address)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
