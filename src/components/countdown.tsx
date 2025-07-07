"use client";

import { useEffect, useState } from "react";
import type { FC } from "react";

const targetDate = new Date("2025-12-31T23:59:59");
const formatTime = (n: number) => String(n).padStart(2, "0");

export const Countdown: FC = () => {
  const [time, setTime] = useState(() => getTimeLeft());

  function getTimeLeft() {
    const diff = targetDate.getTime() - Date.now();
    const total = Math.max(diff, 0);

    return {
      days: Math.floor(total / (1000 * 60 * 60 * 24)),
      hours: Math.floor((total / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((total / 1000 / 60) % 60),
      seconds: Math.floor((total / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-14 rounded text-center text-white">
      <p className="font-darknet text-4xl">
        {time.days} : {formatTime(time.hours)} : {formatTime(time.minutes)} :{" "}
        {formatTime(time.seconds)}
      </p>
      <p className="font-darknet">AVANT L'OUVERTURE DE LA PORTE...</p>
    </div>
  );
};

export default Countdown;
