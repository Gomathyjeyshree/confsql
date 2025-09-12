import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";

export default function ListingByCountryTopic() {
  const { country, topic } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!country || !topic) return;
    setLoading(true);

    axios
      .get(`http://localhost:5000/api/eventsByCountryTopic/${country}/${topic}?page=${page}&limit=10`)
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
  }, [country, topic, page]);

  if (loading) return <p>Loading events...</p>;
  if (!events || events.length === 0)
    return <p>No events found in {country} for {topic}.</p>;

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}-${String(d.getMonth()+1).padStart(2,"0")}-${d.getFullYear()}`;
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-center py-4">
          Events in {country} – {topic}
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
