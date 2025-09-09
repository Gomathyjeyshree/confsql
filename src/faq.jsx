import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const faqs = [
  {
    question: "How I can add an event to conferencenext.com?",
    answer:
      "To add an event to the conferencenext.com listing, please visit the home page and press on Add Event. Ordinary listing of any event is completely free. You need to provide your Event details like, Date, Place, Deadline for paper submission, Type of event, event online URL, Contact person etc.",
  },
  {
    question:
      "Is there any charge for listing the conference in conferencenext.com website?",
    answer: "No!!! There is absolutely no charge for listing the events.",
  },
  {
    question:
      "How much time will it take to list the event after successfully event addition process?",
    answer:
      "Maximum it will take 12hrs for listing the events in conferencenext.com website.",
  },
  {
    question: "Can I modify the information related event at any time of listing?",
    answer: "Yes you can modify the Information by logging into the event panel.",
  },
  {
    question: "Can I promote my Events in conferencenext.com?",
    answer:
      "Yes you can promote your event. Please mail to info@conferencenext.com to know about the different advertisement plans.",
  },
  {
    question: "How I can subscribe conferencenext.com?",
    answer:
      "Click Subscribe on conferencenext.com home page and follow the simple process to subscribe.",
  },
  {
    question: "How conferencenext.com will help me to find a conference?",
    answer:
      "It will help you to find the most appropriate International/National conference and workshops by knowing your requirements like place, date, topic, last date of registration etc.",
  },
  {
    question: "Is there any price for Subscription?",
    answer: "Subscription for conferencenext.com is completely free for life time.",
  },
  {
    question: "Can I have an organizer and a subscriber account at the same time?",
    answer:
      "Ohh! Yes, you can have an organizer and a subscriber account at the same time.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="faq-section max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl shadow-sm overflow-hidden"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-gray-800 hover:bg-gray-100 transition"
            >
              <span>{faq.question}</span>
              <span className="ml-2">
                {activeIndex === index ? (
                  <FaMinus className="text-red-500" />
                ) : (
                  <FaPlus className="text-green-600" />
                )}
              </span>
            </button>
            {activeIndex === index && (
              <div className="px-4 py-3 bg-gray-50 text-gray-600">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
