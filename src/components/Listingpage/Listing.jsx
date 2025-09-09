import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCalendar, FaVenus, FaLandmark } from "react-icons/fa";

export default function Listing() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events/all")
      .then((res) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const filteredEvents = res.data
          .map(({ edate, ...rest }) => rest) // remove expiry date
          // .filter((event) => new Date(event.sdate) >= today); // only future events

        setEvents(filteredEvents);
      })
      .catch((err) => {
        console.error("❌ Error fetching events:", err);
      });
  }, []);

  // Function to format date as dd-mm-yyyy
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to strip HTML tags
  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  if (!events.length)
    return (
      <div className="text-center py-12">
        No upcoming events found.
      </div>
    );

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
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
                  Venue
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {events.map((event, idx) => (
                <tr key={idx} className="hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold">{event.event_name}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 d-flex">
                    <FaCalendar /> {formatDate(event.sdate)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 d-flex">
                    <FaLandmark /> {event.country}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 d-flex">
                    <FaVenus /> {stripHtml(event.venue_address)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
