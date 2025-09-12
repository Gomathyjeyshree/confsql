import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import eventbanner from './assets/images/event-background.jpg'
import Countdown from "./components/countdown";
import SimilarEvents from "./components/SimilarEvents"
import { Mail, Phone, Calendar, User, Building2 } from "lucide-react";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [similarEvents, setSimilarEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/event/${id}`);
        setEvent(res.data);

        const simRes = await axios.get(
          `http://localhost:5000/api/eventsBySubtopics/${res.data.sub_topic}?limit=6`
        );
        setSimilarEvents(simRes.data.events.filter(e => e.event_id !== res.data.event_id));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <p className="text-center py-12">Loading event...</p>;
  if (!event) return <p className="text-center py-12">Event not found.</p>;

  const stripHtml = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="relative">
        <img
          src={eventbanner}
          alt={event.event_name}
          className="w-full h-96 object-cover  rounded-b-xl"
        />
        <div class="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-black/50 rounded-b-2xl flex items-center">
          <div className="p-8 text-white w-full grid grid-cols-12 justify-between">
            <div className="col-span-8">
              <h1 className="text-xl md:text-5xl font-bold">{event.event_name}</h1>
              {/* <p className="mt-2">{stripHtml(event.venue_address)}</p> */}
              <p className="text-md opacity-80 pt-3">
                {event.city}, {event.state}, {event.country}
              </p>
            </div>
            <div className="col-span-4 bg-white text-black rounded-xl shadow-lg p-6 mt-6 md:mt-0 w-full md:w-100">
              <h3 className="font-bold mb-2">Date & Time</h3>             
               <Countdown startDate={event.sdate} endDate={event.edate} />
              <button className="w-full bg-purple-600 text-white rounded-lg py-2 mt-4 hover:bg-purple-700 transition">
                Register Now
              </button>
              
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="grid md:grid-cols-3 gap-8 p-6 md:p-12">
        {/* Left: Description */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-2xl font-bold mb-3">Description</h2>
            <p className="text-gray-700">{stripHtml(event.des)}</p>
          </div>

         

          <div>
            <h2 className="text-2xl font-bold mb-3">How can I contact the organizer?</h2>
            <p>
              Please reach out to <a href={`mailto:${event.contact_email}`} className="text-purple-700 hover:underline">
                {event.contact_email}
              </a>{" "}
              or call {event.contact_no}.
            </p>
          </div>
        </div>

        {/* Right: Location, Organizer, Tags, Share */}
        <div className="space-y-6">
             {/* Organizer */}
          <div className="bg-white rounded-xl shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        Conference Details
      </h2>

      <div className="grid gap-6">
        {/* Organized By */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
            <Building2 size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Conference Organized By:</p>
            <p className="text-lg font-semibold text-gray-800">{event.org}</p>
          </div>
        </div>

        {/* Contact Person */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
            <User size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Conference Contact Person:</p>
            <p className="text-lg font-semibold text-gray-800">{event.contact_person}</p>
            {event.contact_no && (
              <p className="text-gray-600 flex items-center gap-1">
                <Phone size={14} /> {event.contact_no}
              </p>
            )}
          </div>
        </div>

        {/* Inquiry Email */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-green-100 text-green-600 rounded-full">
            <Mail size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Conference Inquiry Email ID:</p>
            <a
              href={`mailto:${event.contact_email}`}
              className="text-lg font-semibold text-purple-700 hover:underline"
            >
              {event.contact_email}
            </a>
          </div>
        </div>

        {/* Important Dates */}
        <div className="flex items-start gap-4">
          <div className="p-3 bg-red-100 text-red-600 rounded-full">
            <Calendar size={20} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Important Dates:</p>
            <ul className="list-disc list-inside text-gray-700 mt-1">
              <li><span className="font-semibold">Start Date:</span> {new Date(event.sdate).toLocaleDateString()}</li>
              <li><span className="font-semibold">End Date:</span> {new Date(event.edate).toLocaleDateString()}</li>
              {event.submission_deadline && (
                <li><span className="font-semibold">Submission Deadline:</span> {new Date(event.submission_deadline).toLocaleDateString()}</li>
              )}
              {event.registration_deadline && (
                <li><span className="font-semibold">Registration Deadline:</span> {new Date(event.registration_deadline).toLocaleDateString()}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>

       

          {/* Share */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-2">Share With Friends</h3>
            <div className="flex gap-3">
              <a href="#" className="text-blue-600">Fb</a>
              <a href="#" className="text-sky-500">Tw</a>
              <a href="#" className="text-blue-700">Ln</a>
            </div>
          </div>
          {/* Map */}
          <div className="bg-white rounded-lg shadow p-4">
            <h3 className="font-bold mb-2">Event Location</h3>
            <iframe
              title="map"
              width="100%"
              height="200"
              className="rounded-lg"
              frameBorder="0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                event.venue_address
              )}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
            />
            <p className="mt-2 text-sm">{stripHtml(event.venue_address)}</p>
          </div>

       
        </div>
      </div>

      {/* Other Events */}
   {/* Other Events */}
<SimilarEvents similarEvents={similarEvents} />

    </div>
  );
}
