import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";
import FilterSection from "../FilterSection";

export default function ListingByCountryBase() {
  const { country, topic, subtopic } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!country) return;

    setLoading(true);

    // Decide API endpoint dynamically
    let endpoint = "";
    if (topic) {
      endpoint = `http://localhost:5000/api/eventsByCountryTopic/${country}/${topic}?page=${page}&limit=10`;
    } else if (subtopic) {
      endpoint = `http://localhost:5000/api/eventsByCountrySubtopic/${country}/${subtopic}?page=${page}&limit=10`;
    } else {
      endpoint = `http://localhost:5000/api/eventsByCountry/${country}?page=${page}&limit=10`;
    }

    axios
      .get(endpoint)
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
  }, [country, topic, subtopic, page]);

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return `${String(d.getDate()).padStart(2, "0")}-${String(
      d.getMonth() + 1
    ).padStart(2, "0")}-${d.getFullYear()}`;
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) return <p className="text-center py-12">Loading events...</p>;
  if (!events.length) {
    return (
      <p className="text-center py-12">
        No events found in {country}
        {topic ? ` for topic "${topic}"` : ""}
        {subtopic ? ` for subtopic "${subtopic}"` : ""}.
      </p>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-center py-4">
          Events in {country}
          {topic ? ` – ${topic}` : ""}
          {subtopic ? ` – ${subtopic}` : ""}
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-purple-600 to-purple-800 text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Event Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  City
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                  Venue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold">
                    <Link
                      to={`/eventdetail/${event.event_id}`}
                      className="text-purple-700 hover:underline"
                    >
                      {event.event_name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">{formatDate(event.sdate)}</td>
                  <td className="px-6 py-4">{event.city || event.country}</td>
                  <td className="px-6 py-4">{stripHtml(event.venue_address)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={pagination.page || page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
      <FilterSection />
    </div>
  );
}
