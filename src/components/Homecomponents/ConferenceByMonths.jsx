import React from "react";

// Utility to get next 12 months
const getNext12Months = () => {
  const months = [];
  const now = new Date();
  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push({ month: d.getMonth(), year: d.getFullYear() });
  }
  return months;
};

// Month names
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function ConferenceByMonths() {
  const nextMonths = getNext12Months();

  return (
    <div className="bg-gray-50 py-12 px-6">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-10 text-purple-700">
        Upcoming <span className="text-pink-500">Conferences</span>
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 max-w-6xl mx-auto">
        {nextMonths.map((m, idx) => (
          <div key={idx} className="flex justify-center">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:scale-105 transform transition">
              <div className="text-sm">{monthNames[m.month]}</div>
              <div className="text-xs mt-1">{m.year}</div>
              <div className="mt-2 text-xs bg-white text-purple-700 rounded-full px-2 py-1 inline-block font-medium hover:bg-purple-100">
                View More
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
