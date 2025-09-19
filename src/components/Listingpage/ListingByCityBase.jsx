import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";
import FilterSection from "../FilterSection";

export default function ListingByCityBase() {
  const { city, topic, sub_topic } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  // ✅ Decide endpoint based on available params
  const getApiUrl = () => {
    if (city && sub_topic) {
      return `http://localhost:5000/api/eventsByCitysub_topic/${city}/${sub_topic}?page=${page}&limit=10`;
    } else if (city && topic) {
      return `http://localhost:5000/api/eventsByCityTopic/${city}/${topic}?page=${page}&limit=10`;
    } else if (city) {
      return `http://localhost:5000/api/eventsByCity/${city}?page=${page}&limit=10`;
    }
    return null;
  };

  useEffect(() => {
    const url = getApiUrl();
    if (!url) return;

    setLoading(true);

    axios
      .get(url)
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
  }, [city, topic, sub_topic, page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, "0")}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${date.getFullYear()}`;
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) return <div className="text-center py-12">Loading events...</div>;
  if (!events.length)
    return (
      <div className="text-center py-12">
        No events found in {city}{" "}
        {topic ? `for ${topic}` : sub_topic ? `for ${sub_topic}` : ""}.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-center py-4">
          Events in {city}
          {topic ? ` – ${topic}` : sub_topic ? ` – ${sub_topic}` : ""}
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
                  {sub_topic ? "Country" : "City"}
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
                  <td className="px-6 py-4">
                    {sub_topic ? event.country : event.city}
                  </td>
                  <td className="px-6 py-4">{stripHtml(event.venue_address)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        )}
      </div>
      
    </div>
  );
}
