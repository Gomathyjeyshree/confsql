import { FaFacebookF, FaInstagram, FaBehance, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-6">
        {/* About Company */}
        <div>
          <h3 className="text-xl font-bold mb-4 relative">
            About Company
            <span className="block w-12 h-1 bg-purple-600 mt-2"></span>
          </h3>
          <div className="flex items-center mb-4">
            <span className="text-3xl font-bold text-purple-500">E</span>
            <span className="text-white text-2xl font-semibold">vent</span>
            <span className="text-purple-500 text-2xl font-semibold">ino</span>
          </div>
          <p className="text-gray-400 text-sm mb-6">
            Vestibulum ac diam sit amet quam vehicula on the elementum sed amet dui molestie. 
            Curabitur arcu erat, accumsan id imperdiet.
          </p>
          <div className="flex space-x-3">
            <a href="#" className="bg-purple-600 p-3 rounded-md"><FaFacebookF /></a>
            <a href="#" className="bg-purple-600 p-3 rounded-md"><FaInstagram /></a>
            <a href="#" className="bg-purple-600 p-3 rounded-md"><FaBehance /></a>
            <a href="#" className="bg-purple-600 p-3 rounded-md"><FaYoutube /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 relative">
            Quick Link
            <span className="block w-12 h-1 bg-purple-600 mt-2"></span>
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="#">› About Us</a></li>
            <li><a href="#">› Our Mission</a></li>
            <li><a href="#">› Our Services</a></li>
            <li><a href="#">› Our Project</a></li>
            <li><a href="#">› Our Team</a></li>
            <li><a href="#">› Blog Post</a></li>
            <li><a href="#">› Contact Us</a></li>
          </ul>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-xl font-bold mb-4 relative">
            Explore
            <span className="block w-12 h-1 bg-purple-600 mt-2"></span>
          </h3>
          <ul className="space-y-3 text-gray-300">
            <li><a href="#">› What We Offer</a></li>
            <li><a href="#">› Our Story</a></li>
            <li><a href="#">› Latest Post</a></li>
            <li><a href="#">› Help Center</a></li>
            <li><a href="#">› Terms & Condition</a></li>
          </ul>
        </div>

        {/* Instagram */}
        <div>
          <h3 className="text-xl font-bold mb-4 relative">
            Our Instagram
            <span className="block w-12 h-1 bg-purple-600 mt-2"></span>
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-20 h-20 bg-gray-700 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 bg-white text-black py-6 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="bg-black text-purple-500 p-3 rounded-md"><FaEnvelope /></div>
            <div>
              <p className="text-sm">Email Us</p>
              <p className="font-bold text-purple-700">Info@example.com</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="bg-black text-purple-500 p-3 rounded-md"><FaMapMarkerAlt /></div>
            <div>
              <p className="text-sm">Our Office Address</p>
              <p className="font-bold text-purple-700">12/7 new town, 245x Town 1214 Street, US</p>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-start space-x-3">
            <div className="bg-black text-purple-500 p-3 rounded-md"><FaPhone /></div>
            <div>
              <p className="text-sm">Call Us 27/7</p>
              <p className="font-bold text-purple-700">+988 564 (3210) 980</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
