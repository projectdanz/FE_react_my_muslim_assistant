// src/components/PrayerCountdown.jsx
import { useEffect, useState } from "react";

const PrayerCountdown = ({ prayerTimes, jadwal, getNextPrayer }) => {
  const [countdown, setCountdown] = useState("");
  const nameCity = localStorage.getItem("selectedCityName");
  const date = new Date()

  const formatted = new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric"
  }).format(date)

  // Hitung waktu menuju salat berikutnya
  const calculateCountdown = (times) => {
    if (!times) return "";

    const now = new Date();
    const nextPrayer = getNextPrayer(times);
    if (!nextPrayer) return "";

    const [hours, minutes] = times[nextPrayer.name].split(":").map(Number);
    const prayerTime = new Date();
    prayerTime.setHours(hours, minutes, 0);
    if (prayerTime < now) prayerTime.setDate(prayerTime.getDate() + 1);

    const diff = prayerTime - now;
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Update setiap detik
  useEffect(() => {
    if (prayerTimes) {
      const timer = setInterval(() => {
        setCountdown(calculateCountdown(prayerTimes));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [prayerTimes]);

  const nextPrayerName = jadwal
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .find((p) => p.toLowerCase() === getNextPrayer(prayerTimes)?.name);

  return (
    <p className="flex flex-col text-center justify-center text-2xl sm:text-3xl font-semibold mb-6 text-gray-700">
      <div className="flex flex-col sm:flex-row justify-center">
        <p className="text-[19px] text-gray-500 sm:text-2xl sm:font-bold sm:text-gray-700">{ nameCity }</p>
        <p className="text-[19px] text-gray-500 hidden sm:inline sm:text-2xl sm:font-bold sm:text-gray-700">&nbsp; - &nbsp;</p>
        <p className="text-[19px] text-gray-500  mb-5 sm:text-2xl sm:font-bold sm:text-gray-700">{ formatted }</p>
      </div>
      <div className="w-full bg-[#2F8DB5] px-10 py-2 rounded-2xl sm:px-45 sm:py-5">
      <p className="text-[19px] font-normal text-white sm:text-2xl sm:font-bold">{ countdown } until { nextPrayerName }</p>
      </div>
    </p>
  );
};

export default PrayerCountdown;
