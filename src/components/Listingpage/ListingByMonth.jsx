import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../Pagination";

export default function ConferenceByMonth() {
  const { month } = useParams(); // e.g., "january-2024"
  const [conferences, setConferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1 });

  useEffect(() => {
    if (!month) return;

    setLoading(true);
    setError("");

    fetch(
      `http://localhost:5000/api/eventsByMonth?month=${encodeURIComponent(
        month
      )}&page=${page}&limit=10`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch conferences");
        return res.json();
      })
      .then((data) => {
        setConferences(data.events);
        setPagination(data.pagination);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to load conferences.");
        setLoading(false);
      });
  }, [month, page]);

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="bg-gray-50 py-12 px-6 min-h-screen">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-purple-700">
        Conferences for {month}
      </h2>

      {loading && <p className="text-center py-12">Loading conferences...</p>}
      {error && <p className="text-center py-12 text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
            {conferences.length > 0 ? (
              conferences.map((conf) => (
                <div
                  key={conf.event_id || conf.id}
                  className="p-4 bg-white border rounded-lg shadow hover:shadow-lg transition"
                >
                  <h3 className="font-bold text-purple-700">
                     <Link to={`/eventdetail/${event.event_id}`} className="text-purple-700 hover:underline">{conf.event_name}</Link></h3>
                  <p className="text-gray-600 text-sm">
                    {conf.sdate
                      ? new Date(conf.sdate).toLocaleDateString("en-GB")
                      : "-"}{" "}
                    - {conf.country || "-"}
                  </p>
                  <p className="text-gray-500 text-sm">{stripHtml(conf.venue_address)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic col-span-full text-center">
                No conferences found for this month.
              </p>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
