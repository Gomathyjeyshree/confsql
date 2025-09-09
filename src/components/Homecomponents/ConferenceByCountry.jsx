import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Continent → Flag mapping
const flags = {
  asia: "https://flagcdn.com/w40/in.png",             // India
  africa: "https://flagcdn.com/w40/za.png",           // South Africa
  europe: "https://flagcdn.com/w40/eu.png",           // EU
  "north america": "https://flagcdn.com/w40/us.png",  // USA
  "south america": "https://flagcdn.com/w40/br.png",  // Brazil
  oceania: "https://flagcdn.com/w40/au.png",          // Australia
};

export default function ConferenceByCountry() {
  const [countriesByContinent, setCountriesByContinent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/countries-by-continent")
      .then((res) => res.json())
      .then((data) => setCountriesByContinent(data))
      .catch((err) => console.error("❌ Error fetching countries:", err));
  }, []);

  const handleCountryClick = (countryName) => {
    navigate(`/ListingByCountry/${encodeURIComponent(countryName)}`);
  };

  return (
    <div className="bg-gradient-to-r from-purple-400 to-pink-400 py-12 px-6 min-h-screen text-white">
      <h2 className="text-center text-3xl font-bold mb-12">
        Conferences by Country
      </h2>

      {/* Grid of continents */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {Object.entries(countriesByContinent).map(([continent, countries]) => (
          <div
            key={continent}
            className="bg-white text-black p-6 shadow-lg rounded-2xl border border-gray-200 hover:shadow-xl transition"
          >
            {/* Continent Header */}
            <div className="flex items-center gap-3 mb-4 border-b pb-2">
              {flags[continent.toLowerCase()] && (
                <img
                  src={flags[continent.toLowerCase()]}
                  alt={`${continent} flag`}
                  className="w-8 h-6 rounded-sm object-cover"
                />
              )}
              <span className="text-xl font-semibold capitalize">
                {continent}
              </span>
            </div>

            {/* Country List */}
            <div className="max-h-72 overflow-y-auto pr-2">
              <ul className="grid grid-cols-1 gap-2 text-sm">
                {countries && countries.length > 0 ? (
                  countries.map((country) => (
                    <li
                      key={country.id}
                      className="flex items-center gap-2 cursor-pointer hover:text-purple-600 transition"
                      onClick={() => handleCountryClick(country.name)}
                    >
                      <span className="text-purple-500">›</span>
                      <span>
                        {country.name}{" "}
                        {country.phonecode && (
                          <span className="text-gray-500 text-xs">
                            (+{country.phonecode})
                          </span>
                        )}
                      </span>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500 italic">
                    No countries available
                  </li>
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
