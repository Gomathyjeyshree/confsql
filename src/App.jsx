import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "./Homepage";
import About from "./About";
import Subscribe from "./Subscribe";
import Journal from "./journal";
import Faq from "./faq";
import Listing from "./components/Listingpage/Listing";

import ListingByTopics from "./components/Listingpage/ListingByTopics";
import ListingBySubtopics from "./components/Listingpage/ListingBySubtopics";
import ListingByMonth from "./components/Listingpage/ListingByMonth";
import EventDetail from "./EventDetail";
import FilterSection from "./components/FilterSection";
import Filter from "./components/filter/topic-filter"

// ✅ Unified base components
import ListingByCityBase from "./components/Listingpage/ListingByCityBase";
import ListingByContinentBase from "./components/Listingpage/ListingByContinentBase";
import ListingByCountryBase from "./components/Listingpage/ListingByCountryBase";


function App() {
  return (
    <>
      <Header />

      <Routes>
        {/* Static Pages */}
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/filtersection" element={<FilterSection />} />
        <Route path="/Filter" element={<topic-filter />}/>

        {/* Event Detail */}
        <Route path="/eventdetail/:id" element={<EventDetail />} />

        {/* Topic / Subtopic / Month */}
        <Route path="/listingbytopics/:topic" element={<ListingByTopics />} />
        <Route path="/listingbysubtopics/:subtopic" element={<ListingBySubtopics />} />
        <Route path="/listingbymonth/:month" element={<ListingByMonth />} />

        {/* ✅ Unified City Routes */}
        <Route path="/listingbycity/:city" element={<ListingByCityBase />} />
        <Route path="/listingbycity/:city/:topic" element={<ListingByCityBase />} />
        <Route path="/listingbycity/:city/:subtopic" element={<ListingByCityBase />} />

        {/* ✅ Unified Country Routes */}
        <Route path="/listingbycountry/:country" element={<ListingByCountryBase />} />
        <Route path="/listingbycountry/:country/:topic" element={<ListingByCountryBase />} />
        <Route path="/listingbycountry/:country/:subtopic" element={<ListingByCountryBase />} />

        {/* ✅ Unified Continent Routes */}
        <Route path="/listingbycontinent/:continent" element={<ListingByContinentBase />} />
        <Route path="/listingbycontinent/:continent/:topic" element={<ListingByContinentBase />} />
        <Route path="/listingbycontinent/:continent/:subtopic" element={<ListingByContinentBase />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
