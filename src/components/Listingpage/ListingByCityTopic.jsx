import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";

export default function ListingByCityTopic() {
  const { city, topic } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!city || !topic) return;
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/eventsByCityTopic/${city}/${topic}?page=${page}&limit=10`)
      .then((res) => {
        setEvents(res.data?.events || []);
        setPagination(res.data?.pagination || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ API error:", err);
        setEvents([]);
        setPagination(null);
        setLoading(false);
      });
  }, [city, topic, page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2,"0")}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) return <p>Loading...</p>;
  if (!events.length) return <p>No events found in {city} for {topic}.</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-center py-4">
          Events in {city} – {topic}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Event Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">City</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Venue</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold">{event.event_name}</td>
                  <td className="px-6 py-4">{formatDate(event.sdate)}</td>
                  <td className="px-6 py-4">{event.city}</td>
                  <td className="px-6 py-4">{stripHtml(event.venue_address)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
    </div>
  );
}
