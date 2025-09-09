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

function App() {
  return (
    <>
      <Header />

      {/* Main content changes here */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="About" element={<About />} />
        <Route path="Subscribe" element={<Subscribe />} />
        <Route path="Journal" element={<Journal />} />
        <Route path="Faq" element={<Faq />} />
        <Route path="Listing" element={<Listing />} />

        {/* Dynamic routes */}
        <Route path="ListingByCountry/:country" element={<ListingByCountry />} />
       <Route path="ListingByTopics/:topic" element={<ListingByTopics />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;
