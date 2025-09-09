  import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
  import ConferenceSearchBar from "./ConferenceSearchBar";

  const Hero = () => {
    return (
      <section
        className="relative h-[90vh] flex items-center"
        style={{
          backgroundImage: "url('https://picsum.photos/id/1015/1600/800')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay (black shade only) */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 text-white grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left Side (Conference Info) */}
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-snug mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-purple-800">
              Conference Alerts 2025
              </span>{" "}
              <span className="text-gray-200">International Conferences</span>
            </h1>

            {/* <div className="flex items-center gap-6 mb-4 text-gray-100">
              <div className="flex items-center gap-2">
                <FaCalendarAlt className="text-purple-400" />
                <span className="font-medium">4th October 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-purple-400" />
                <span className="font-medium">Coimbatore, India</span>
              </div>
            </div> */}

            <p className="text-gray-200 font-medium mb-6 max-w-2xl">
              A premier academic platform for{" "}
              <span className="text-purple-400">research</span>,{" "}
              <span className="text-purple-300">innovation</span>, and{" "}
              <span className="text-purple-400">collaboration</span> in India.
            </p>

            <div className="flex gap-4">
              <button className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-purple-600 to-purple-800 text-white hover:opacity-90 transition">
                <span>Upcoming Conference</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 rounded-full font-semibold shadow-lg bg-gradient-to-r from-pink-500 to-pink-700 text-white hover:opacity-90 transition">
                <span>Promote Your Event</span>
              </button>
            </div>
          </div>

          {/* Right Side (Conference Search Bar) */}
          <div className="bg-white/95 rounded-2xl shadow-xl p-6 border border-gray-200">
            <ConferenceSearchBar />
          </div>
        </div>
      </section>
    );
  };

  export default Hero;
