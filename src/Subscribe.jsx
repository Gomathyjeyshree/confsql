import React, { useState } from "react";

export default function SubscribePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    countryCode: "+91",
    mobile: "",
    topic: "",
    university: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Connect API here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="w-full h-72 md:h-96 bg-gradient-to-r from-purple-600 to-purple-900 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4">
          Stay Updated With Upcoming Conferences
        </h1>
        <p className="text-white text-lg md:text-2xl mb-6">
          Subscribe to receive alerts for conferences around the world
        </p>
        <button
          onClick={() =>
            document
              .getElementById("subscribeForm")
              .scrollIntoView({ behavior: "smooth" })
          }
          className="bg-white text-purple-800 font-semibold px-6 py-3 rounded-full shadow-lg hover:opacity-90 transition"
        >
          Subscribe Now
        </button>
      </div>

      {/* Subscription Form */}
      <div
        id="subscribeForm"
        className="flex justify-center items-center py-12 px-6"
      >
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-5xl border border-teal-400">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Subscribe For Conference Alerts
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Please enter name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Enter Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Please enter email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Country Code */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Country Code
              </label>
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="+91">India (+91)</option>
                <option value="+1">USA (+1)</option>
                <option value="+44">UK (+44)</option>
              </select>
            </div>

            {/* Mobile Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Mobile Number
              </label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="Enter mobile number"
                maxLength={10}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Topic */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Select Topic
              </label>
              <select
                name="topic"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="">Select Topic</option>
                <option value="business">Business and Economics</option>
                <option value="health">Health and Medicine</option>
                <option value="engineering">
                  Engineering and Technology
                </option>
                <option value="law">Law</option>
                <option value="education">Education</option>
                <option value="others">Others</option>
              </select>
            </div>

            {/* University/Organization */}
            <div className="md:col-span-2">
              <label className="block text-gray-700 font-medium mb-1">
                University / Organization
              </label>
              <input
                type="text"
                name="university"
                value={formData.university}
                onChange={handleChange}
                placeholder="Enter University/Organisation"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:opacity-90 text-white font-semibold py-3 rounded-full transition"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
