import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Homepage from "./Homepage";
import About from "./About";
import Subscribe from "./Subscribe";
import Journal from "./journal";
import Faq from "./faq";
import Listing from "./components/Listingpage/Listing";
import ListingByCountry from "./components/Listingpage/ListingByCountry";
import ListingByTopics from "./components/Listingpage/ListingByTopics"; 
import ListingBySubtopics from "./components/Listingpage/ListingBySubtopics"; 
import ListingByMonth from "./components/Listingpage/ListingByMonth"; 
import ListingByContinent from "./components/Listingpage/ListingByContinent"; 
import ListingByCity from "./components/Listingpage/ListingByCity";
import EventDetail from "./EventDetail";
import ListingByContinentTopic from "./components/Listingpage/ListingByContinentTopic";
import ListingByCountryTopic from "./components/Listingpage/ListingByCountryTopic";
import ListingByCityTopic from "./components/Listingpage/ListingByCityTopic";
import ListingByCitySubtopic from "./components/Listingpage/ListingByCitySubtopic";
import ListingByCountrySubtopic from "./components/Listingpage/ListingByCountrySubtopic";
import ListingByContinentSubtopic from "./components/Listingpage/ListingByContinentSubtopic";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/listing" element={<Listing />} />

        {/* Event Detail */}
        <Route path="/eventdetail/:id" element={<EventDetail />} />

        {/* Dynamic Routes */}
        <Route path="/listingbycountry/:country" element={<ListingByCountry />} />
        <Route path="/listingbytopics/:topic" element={<ListingByTopics />} />
        <Route path="/listingbysubtopics/:subtopic" element={<ListingBySubtopics />} />
        <Route path="/listingbymonth/:month" element={<ListingByMonth />} />
        <Route path="/listingbycontinent/:continent" element={<ListingByContinent />} />
        <Route path="/listingbycity/:city" element={<ListingByCity />} />
       <Route path="/ListingByContinentTopic/:continent/:topic" element={<ListingByContinentTopic />} />
    <Route path="/ListingByCountryTopic/:country/:topic" element={<ListingByCountryTopic />} />
<Route path="/ListingByCityTopic/:city/:topic" element={<ListingByCityTopic />} />
<Route path="/ListingByContinentSubtopic/:continent/:subtopic" element={<ListingByContinentSubtopic />} />
<Route path="/ListingByCountrySubtopic/:country/:subtopic" element={<ListingByCountrySubtopic />} />
<Route path="/ListingByCitySubtopic/:city/:subtopic" element={<ListingByCitySubtopic />} />


      </Routes>

      <Footer />
    </>
  );
}

export default App;
