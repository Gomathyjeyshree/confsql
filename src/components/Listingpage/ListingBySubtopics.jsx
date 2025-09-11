import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Pagination from "../Pagination";

export default function ListingBySubtopics() {
  const { subtopic } = useParams();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    if (!subtopic) return;
    setLoading(true);

    axios
      .get(
        `http://localhost:5000/api/eventsBySubtopics/${subtopic}?page=${page}&limit=10`
      )
      .then((res) => {
        setEvents(res.data.events);
        setPagination(res.data.pagination);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching events:", err);
        setLoading(false);
      });
  }, [subtopic, page]);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (loading)
    return <p className="text-center py-12">Loading events...</p>;
  if (!events.length)
    return <p className="text-center py-12">No events found for {subtopic}.</p>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Events for {subtopic}</h2>

      <div className="overflow-x-auto">
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
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-semibold"><Link to={`/eventdetail/${event.event_id}`} className="text-purple-700 hover:underline">{event.event_name}</Link></td>
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

      {/* Pagination */}
      <Pagination
        page={page}
        totalPages={pagination.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
