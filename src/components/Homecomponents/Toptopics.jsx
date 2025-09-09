import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { 
  FaHeartbeat, FaUserNurse, FaRobot, FaLaptopCode, FaFlask, FaAtom, FaLeaf,
  FaBuilding, FaBalanceScale, FaBook, FaGlobe, FaUserGraduate
} from "react-icons/fa";

// Map topic keywords to icons
const topicIcons = {
  engineering: <FaBuilding />,
  "physical-and-life-sciences": <FaLeaf />,
  "mathematics-and-statistics": <FaAtom />,
  "engineering-and-technology": <FaLaptopCode />,
  business: <FaBalanceScale />,
  "social-science-and-humanities": <FaBook />,
  "regional-studies": <FaGlobe />,
  law: <FaBalanceScale />,
  interdisciplinary: <FaUserGraduate />,
  "health-and-medicine": <FaHeartbeat />,
  education: <FaUserGraduate />,
  default: <FaRobot />, // fallback icon
};

// Capitalize first letter of each word safely
const capitalizeWords = (str) => {
  if (!str) return "";
  return str.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

// Convert topic name to URL-friendly slug
const toSlug = (str) => str.toLowerCase().replace(/\s+/g, "-");

export default function Toptopics() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/topics")
      .then((res) => res.json())
      .then((data) => setTopics(data))
      .catch((err) => console.error(err));
  }, []);

  // Slider arrows
  const NextArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 right-0 -translate-y-1/2 bg-white p-2 rounded-full shadow cursor-pointer z-10"
      onClick={onClick}
    >
      ➡️
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div
      className="absolute top-1/2 left-0 -translate-y-1/2 bg-white p-2 rounded-full shadow cursor-pointer z-10"
      onClick={onClick}
    >
      ⬅️
    </div>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-8 px-4 relative">
      <Slider {...settings}>
        {topics.map((topic, index) => {
          // Use topic.slug if exists, otherwise convert topic.name to slug
          const slug = topic.slug ? topic.slug : toSlug(topic.name || topic);
          const icon = topicIcons[slug] || topicIcons.default;
          const title = capitalizeWords(topic.name || topic);

          return (
            <div key={index} className="px-2">
              <Link to={`/ListingByTopics/${slug}`}>
                <div className="flex flex-col items-center justify-center h-40 rounded-lg 
                  bg-gradient-to-r from-purple-500 to-purple-800 text-white shadow-lg relative
                  hover:scale-105 transition-transform cursor-pointer">
                  <div className="text-3xl mb-2">{icon}</div>
                  <h3 className="font-bold text-center">{title}</h3>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
