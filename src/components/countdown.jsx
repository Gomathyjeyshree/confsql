import React, { useEffect, useState } from "react";

export default function Countdown({ startDate, endDate }) {
  const calculateTimeLeft = () => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now > end) {
      return { status: "ended" };
    } else if (now >= start && now <= end) {
      return { status: "ongoing" };
    }

    const difference = start - now;
    return {
      status: "upcoming",
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [startDate, endDate]);

  if (timeLeft.status === "ended") {
    return <p className="text-red-600 font-bold text-center">⏳ Event Ended</p>;
  }

  if (timeLeft.status === "ongoing") {
    return <p className="text-green-600 font-bold text-center">✅ Event is Live Now!</p>;
  }

  return (
    <div className="flex gap-4 justify-center text-center font-bold text-lg mt-3">
      <div><span className="text-purple-700">{timeLeft.days}</span><br />Days</div>
      <div><span className="text-purple-700">{timeLeft.hours}</span><br />Hrs</div>
      <div><span className="text-purple-700">{timeLeft.minutes}</span><br />Min</div>
      <div><span className="text-purple-700">{timeLeft.seconds}</span><br />Sec</div>
    </div>
  );
}
