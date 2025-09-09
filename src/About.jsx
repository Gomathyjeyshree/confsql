import React from "react";
import Header from "./Header"; // adjust path based on your folder structure

export default function About() {
  return (
    <div>
      {/* Header */}
    

      {/* Hero Section */}
   <section className="relative bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20 px-6 text-center  flex flex-col justify-center items-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Us
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-3xl mx-auto">
          We are dedicated to building innovative solutions that bring people,
          knowledge, and opportunities together.
        </p>
        <div className="mt-8 flex space-x-4">
         
          <button className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-pink-500 to-pink-700 text-white hover:opacity-90 transition">
            Our Services
          </button>
        </div>
      </section>

      {/* Company Story */}
      <section className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-6">About Conference Next</h2>
        <p className="text-gray-600 leading-relaxed text-lg">
          Conferencenext is one such platform which uniquely positions all the conferences of all the streams, domains and nature into one modest dynamic runway. We help you get information about all the conferences happening across the globe at your fingertips in fraction of seconds. Alerts are one such essential web portal for thought leaders and delegates which makes search extremely simple, convenient and ceases to be user friendly. We expertise in bringing you with all the conferences of different spheres happening across the globe related to Science and Technology and all other concrete and non-concrete topics. Since we bring in all the rational events we also help delegates from all the walks of life such as students, researchers, scientists and other thought leaders to get their output accordingly. Conferencenext also provides information about upcoming conference in forth coming malls at different parts of country.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Mission</h3>
            <p className="text-gray-600">
              To create opportunities for learning, collaboration, and
              innovation by connecting researchers and experts from across the
              world.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Our Vision</h3>
            <p className="text-gray-600">
              To be the most trusted platform for global conferences and events,
              inspiring new ideas and shaping the future of knowledge-sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              name: "John Doe",
              role: "Founder & CEO",
              img: "https://randomuser.me/api/portraits/men/45.jpg",
            },
            {
              name: "Sarah Lee",
              role: "Head of Operations",
              img: "https://randomuser.me/api/portraits/women/47.jpg",
            },
            {
              name: "Michael Smith",
              role: "Technical Lead",
              img: "https://randomuser.me/api/portraits/men/52.jpg",
            },
          ].map((member, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h4 className="text-xl font-bold">{member.name}</h4>
              <p className="text-gray-600">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
