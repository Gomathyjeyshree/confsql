// src/pages/Homepage.jsx

import React from "react";
import Hero from "./components/Homecomponents/Hero";
import ConferenceSearchBar from "./components/Homecomponents/ConferenceSearchBar";
import Toptopics from "./components/Homecomponents/Toptopics";
import ConferenceCities from "./components/Homecomponents/ConferenceCities";
import ConferenceByCountry from "./components/Homecomponents/ConferenceByCountry";
import ConferenceList from "./components/Homecomponents/ConferenceList";
import ConferenceByTopics from "./components/Homecomponents/ConferenceByTopics";
import ConferenceByMonths from "./components/Homecomponents/ConferenceByMonths";

const Homepage = () => {
  return (
    <>
      <Hero />
      <Toptopics />
      <ConferenceCities />
      <ConferenceByCountry />
        <ConferenceByMonths />
    
      <ConferenceByTopics />
      <ConferenceList />
    </>
  );
};

export default Homepage;
