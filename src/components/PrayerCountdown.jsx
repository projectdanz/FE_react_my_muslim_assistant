// src/components/PrayerCountdown.jsx
import { useEffect, useState } from "react";

const PrayerCountdown = ({ prayerTimes, jadwal, getNextPrayer }) => {
  const [countdown, setCountdown] = useState("");

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
    <p className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-700 text-center">
      <span className="font-bold">{countdown}</span> until {""}
      <span className="text-[#2F8DB5]">{nextPrayerName}</span>
    </p>
  );
};

export default PrayerCountdown;
