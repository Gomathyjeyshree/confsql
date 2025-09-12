import Slider from "react-slick";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react"; // install lucide-react if not already

// Custom arrow components
function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700 transition"
    >
      <ChevronRight size={20} />
    </button>
  );
}

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-purple-600 text-white p-2 rounded-full shadow hover:bg-purple-700 transition"
    >
      <ChevronLeft size={20} />
    </button>
  );
}

export default function SimilarEvents({ similarEvents }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

return (
  Array.isArray(similarEvents) && similarEvents.length > 0 && (
    <div className="bg-gray-50 p-6 md:p-12 relative">
      <h2 className="text-2xl font-bold mb-6">Other Events You May Like</h2>
      <Slider {...settings}>
        {similarEvents.map((e) => (
          <div key={e.event_id} className="px-2">
            <Link
              to={`/eventdetail/${e.event_id}`}
              className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden flex flex-col h-full"
            >
              <img
                src={e.banner || "/event-thumb.jpg"}
                alt={e.event_name}
                className="h-40 w-full object-cover"
              />
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="font-semibold text-purple-700 line-clamp-2">
                  {e.event_name}
                </h3>
                <p className="text-gray-500 text-sm mt-1">
                  {e.city}, {e.country}
                </p>
                <p className="text-gray-400 text-xs mt-auto">
                  {new Date(e.sdate).toLocaleDateString()}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  )
);

}
