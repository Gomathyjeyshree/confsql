import React from "react";
import { FaSearch, FaGlobe, FaBook, FaCalendarAlt, FaRegCalendar } from "react-icons/fa";

export default function ConferenceSearchBar() {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-purple-900 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-6 md:p-8">
        
        {/* Heading */}
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 text-center">
          Find Your <span className="text-purple-700">Conference</span>
        </h2>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Country */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3">
            <FaGlobe className="text-purple-600 mr-2" />
            <select className="w-full bg-transparent text-gray-700 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Select a Country</option>
              <option>USA</option>
              <option>Canada</option>
              <option>UK</option>
              <option>India</option>
            </select>
          </div>

          {/* Topic */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3">
            <FaBook className="text-purple-600 mr-2" />
            <select className="w-full bg-transparent text-gray-700 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Select a Topic</option>
              <option>Engineering</option>
              <option>Health</option>
              <option>Business</option>
            </select>
          </div>

          {/* Year */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3">
            <FaCalendarAlt className="text-purple-600 mr-2" />
            <select className="w-full bg-transparent text-gray-700 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Select a Year</option>
              <option>2025</option>
              <option>2026</option>
            </select>
          </div>

          {/* Month */}
          <div className="flex items-center border border-gray-300 rounded-lg bg-gray-50 px-3">
            <FaRegCalendar className="text-purple-600 mr-2" />
            <select className="w-full bg-transparent text-gray-700 py-3 focus:ring-2 focus:ring-purple-500 focus:outline-none">
              <option>Select a Month</option>
              <option>January</option>
              <option>February</option>
              <option>March</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-6">
          <button className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white px-8 py-3 rounded-full font-semibold shadow-md transition">
            <FaSearch /> Search
          </button>
        </div>
      </div>
    </div>
  );
}
