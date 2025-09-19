import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";

export default function ListingByContinentBase() {
  const { continent, topic, subtopic } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!continent) return;

    setLoading(true);

    let apiUrl = "";
    if (topic) {
      apiUrl = `http://localhost:5000/api/eventsByContinentTopic/${continent}/${topic}?page=${page}&limit=10`;
    } else if (subtopic) {
      apiUrl = `http://localhost:5000/api/eventsByContinentSubtopic/${continent}/${subtopic}?page=${page}&limit=10`;
    } else {
      apiUrl = `http://localhost:5000/api/eventsByContinent/${continent}?page=${page}&limit=10`;
    }

    axios
      .get(apiUrl)
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
  }, [continent, topic, subtopic, page]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading) return <div className="text-center py-12">Loading events...</div>;

  if (!events.length) {
    return (
      <div className="text-center py-12">
        No events found in {continent}{" "}
        {topic ? `for topic "${topic}"` : subtopic ? `for subtopic "${subtopic}"` : ""}.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <h2 className="text-2xl font-bold text-center py-4">
          Events in {continent.charAt(0).toUpperCase() + continent.slice(1)}{" "}
          {topic ? `– Topic: ${topic}` : subtopic ? `– Subtopic: ${subtopic}` : ""}
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
                  Country
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
                  <td className="px-6 py-4">{event.country}</td>
                  <td className="px-6 py-4">{event.city || "-"}</td>
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
