import React, { useState } from "react";

const tabs = [
  { id: "scopus", label: "SCOPUS INDEXED JOURNALS" },
  { id: "ugc", label: "UGC CARE LIST JOURNALS" },
  { id: "wos", label: "WEB OF SCIENCE JOURNALS" },
  { id: "google", label: "GOOGLE SCHOLAR JOURNALS" },
];

// Example data (replace with your API or static list)
const journals = {
  scopus: [
    {
      title: "Tribology in Industry",
      issn: "0354-8996 , eISSN: 2217-7965",
      indexedIn: "High Impact Indexing Database",
      link: "https://www.ardaconference.com/journals/scopus-indexed/paper-submission?jid=1314",
    },
    {
      title:
        "International Journal of Electrical and Electronic Engineering and Telecommunications",
      issn: "2319-2518 (Online)",
      indexedIn: "High Impact Indexing Database",
      link: "https://www.ardaconference.com/journals/scopus-indexed/paper-submission?jid=1313",
    },
  ],
  ugc: [
    {
      title: "International Journal of Food and Nutritional Sciences",
      issn: "2320-7876 / 2319-1775",
      indexedIn: "High Impact Indexing Database",
      link: "https://www.ardaconference.com/journals/ugc-care-list/paper-submission?jid=1511",
    },
    {
      title: "Biological Forum–An International Journal",
      issn: "0975-1130",
      indexedIn: "High Impact Indexing Database",
      link: "https://www.ardaconference.com/journals/ugc-care-list/paper-submission?jid=1514",
    },
  ],
  wos: [],
  google: [],
};

export default function Journal() {
  const [activeTab, setActiveTab] = useState("scopus");

  return (
    
    <div className="max-w-7xl mx-auto px-4 py-10">
        
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab.id
                ? "bg-teal-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Journal List */}
      <div className="grid md:grid-cols-2 gap-6">
        {journals[activeTab].length > 0 ? (
          journals[activeTab].map((journal, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200 hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {journal.title}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">ISSN:</span> {journal.issn}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <span className="font-medium">Indexed In:</span>{" "}
                {journal.indexedIn}
              </p>
              <a
                href={journal.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 text-sm"
              >
                Submit Paper
              </a>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center col-span-2">
            No journals available in this category.
          </p>
        )}
      </div>
    </div>
  );
}
