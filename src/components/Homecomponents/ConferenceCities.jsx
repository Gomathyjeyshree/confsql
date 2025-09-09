import React, { useState } from "react";

// Continents data with image URLs + optional description
const continents = [
  { name: "Africa", flag: "https://flagcdn.com/w80/af.png", desc: "Explore conferences across Africa" },
  { name: "Asia", flag: "https://flagcdn.com/w80/as.png", desc: "Discover Asia's top conference cities" },
  { name: "Europe", flag: "https://flagcdn.com/w80/eu.png", desc: "Europe: Science, Tech & Business events" },
  { name: "North America", flag: "https://flagcdn.com/w80/na.png", desc: "Conferences across USA, Canada, Mexico" },
  { name: "South America", flag: "https://flagcdn.com/w80/sa.png", desc: "Find top South American conferences" },
  { name: "Oceania", flag: "https://flagcdn.com/w80/oc.png", desc: "Events in Australia, New Zealand & islands" },
  { name: "Antarctica", flag: "https://flagcdn.com/w80/aq.png", desc: "Scientific and research conferences" },
];

export default function InnovativeContinents() {
  const [activeContinent, setActiveContinent] = useState(null);

  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-50 min-h-screen p-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-2">
          Explore Conferences by Continent
        </h2>
        <p className="text-gray-600 text-lg">
          Select a continent to explore upcoming conferences around the world.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {continents.map((continent, idx) => (
          <div
            key={idx}
            onClick={() => setActiveContinent(continent.name)}
            className={`relative group cursor-pointer rounded-2xl p-6 flex flex-col items-center transition-transform transform shadow-lg hover:scale-105
              ${
                activeContinent === continent.name
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl"
                  : "bg-white hover:bg-purple-50 text-purple-700"
              }`}
          >
            {/* Flag */}
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-purple-200 group-hover:border-pink-300 transition-all">
              <img
                src={continent.flag}
                alt={`${continent.name} flag`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Name */}
            <h3 className="mt-4 text-xl font-bold text-center">{continent.name}</h3>

            {/* Description tooltip */}
            <p className="mt-2 text-center text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
              {continent.desc}
            </p>

            {/* Glow effect */}
            {activeContinent === continent.name && (
              <span className="absolute inset-0 rounded-2xl shadow-xl bg-gradient-to-r from-purple-400 to-pink-400 opacity-30 animate-pulse"></span>
            )}
          </div>
        ))}
      </div>

      {/* Selected continent */}
      {activeContinent && (
        <div className="mt-12 text-center text-2xl font-bold text-purple-700">
          Selected Continent: {activeContinent}
        </div>
      )}
    </div>
  );
}
