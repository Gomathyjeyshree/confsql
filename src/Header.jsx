  import { Link } from "react-router-dom";
  import logo from './assets/images/site-logo.png'
  import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaBehance, FaYoutube, FaUser, FaLock } from "react-icons/fa";

  export default function Header() {
    return (
      <header>
        {/* Top bar */}
        <div className="bg-black text-white text-sm py-2 px-6 flex justify-between items-center">
          {/* Left side */}
          <div className="flex space-x-6">
            <div className="flex items-center space-x-2">
              <FaPhoneAlt />
              <span>245x Town 1214 Street, USA</span>
            </div>
            <div className="flex items-center space-x-2">
              <FaEnvelope />
              <span>Info@example.com</span>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-purple-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-purple-500"><FaTwitter /></a>
            <a href="#" className="hover:text-purple-500"><FaInstagram /></a>
            <a href="#" className="hover:text-purple-500"><FaBehance /></a>
            <a href="#" className="hover:text-purple-500"><FaYoutube /></a>

            <span className="mx-2">|</span>

            <a href="#" className="flex items-center space-x-1 hover:text-purple-500">
              <FaUser />
              <span>Register</span>
            </a>

            <a href="#" className="flex items-center space-x-1 hover:text-purple-500">
              <FaLock />
              <span>Login</span>
            </a>
          </div>
        </div>

        {/* Navbar */}
        <div className="bg-white px-6 py-3 flex items-center justify-between shadow rounded-b-lg">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
            <img
            src={logo}  // <-- replace with your actual logo path
              alt="Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          </div>

          {/* Menu */}
          <nav>
            <ul className="flex space-x-6 font-medium">
              <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
              <li><Link to="/about" className="hover:text-purple-600">About Us</Link></li>
              <li><Link to="/Journal" className="hover:text-purple-600">Journal</Link></li>
              <li><Link to="/blog" className="hover:text-purple-600">Blog</Link></li>
              <li><Link to="/subscribe" className="hover:text-purple-600">Subscribe</Link></li>
              <li><Link to="/Faq" className="hover:text-purple-600">FAQ</Link></li>
            </ul>
          </nav>

          {/* CTA Button */}
          <button className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white font-semibold px-5 py-2 rounded-full shadow hover:opacity-90">
            <span>Upcoming Conferences</span>
            <div className="bg-white text-purple-700 rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3h14a2 2 0 0 1 2 2v2H3V5a2 2 0 0 1 2-2zm16 6H3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9zm-5 4h2v2h-2v-2z" />
              </svg>
            </div>
          </button>
        </div>
      </header>
    );
  }
