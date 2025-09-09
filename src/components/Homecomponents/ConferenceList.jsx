import React from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaEye } from "react-icons/fa";

const conferences = [
  {
    title: "1st International Specialty Pharmacy Conference",
    date: "02nd Oct 2025",
    location: "United Arab Emirates, Abu Dhabi",
    views: 177,
  },
  {
    title: "The 22nd International Conference on the Physics of Highly Charged Ions",
    date: "07th Sep 2026",
    location: "China, Hangzhou",
    views: 196,
  },
  {
    title: "International Conference on Primary Progressive Aphasia",
    date: "25th Jun 2026",
    location: "UK, London",
    views: 174,
  },
  {
    title: "Asia Pacific Green Hydrogen Conference & Exhibition 2026",
    date: "09th Jun 2026",
    location: "Malaysia, Kuala Lumpur",
    views: 227,
  },
  {
    title: "2nd International Conference on Electrical and Electronics for Sustainable Innovations",
    date: "27th Mar 2026",
    location: "India, Raigarh",
    views: 172,
  },
  {
    title: "7th International Conference on Innovative Trends in Information Technology",
    date: "27th Mar 2026",
    location: "India, Kottayam",
    views: 182,
  },
];

export default function ConferenceList() {
  return (
    <div className="bg-gray-50 py-12 px-6 min-h-screen">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-purple-700 mb-10">
        Top List of International Academic Conferences 2025
        <div className="mt-2 h-1 w-24 bg-purple-400 mx-auto rounded"></div>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {conferences.map((conf, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md border p-5 hover:shadow-xl transition"
          >
            <h3 className="font-semibold text-gray-800 mb-3 line-clamp-2">
              {conf.title}
            </h3>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <FaCalendarAlt className="mr-2 text-purple-500" />
              {conf.date}
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-2">
              <FaMapMarkerAlt className="mr-2 text-purple-500" />
              {conf.location}
            </div>

            <div className="flex items-center text-sm text-gray-600 mb-4">
              <FaEye className="mr-2 text-purple-500" />
              {conf.views} views
            </div>

            <button className="bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
