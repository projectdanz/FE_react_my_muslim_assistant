import { useEffect, useState } from "react";
import getPrayerTimes from "../script/getPrayerTime";
import "../styles/PrayerTimeStyle.css";
import PrayerCountdown from "./PrayerCountdown";

const PrayerTime = ({ selectedCity }) => {
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const jadwal = ["imsak", "subuh", "dzuhur", "ashar", "maghrib", "isya"];

  // Ambil data jadwal shalat setiap kali selectedCity berubah
  useEffect(() => {
    if (selectedCity) {
      getPrayerTimes(selectedCity).then((times) => {
        setPrayerTimes(times);
        setCurrentPrayer(checkCurrentPrayer(times));
      });
    }
  }, [selectedCity]);

  // Fungsi untuk menentukan waktu shalat yang sedang berlangsung
  const checkCurrentPrayer = (times) => {
    if (!times) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const convertToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const prayerTimesArr = jadwal.map((prayer) => ({
      name: prayer,
      time: convertToMinutes(times[prayer]),
    }));

    prayerTimesArr.sort((a, b) => a.time - b.time);

    for (let i = prayerTimesArr.length - 1; i >= 0; i--) {
      if (currentTime >= prayerTimesArr[i].time) {
        return prayerTimesArr[i].name;
      }
    }

    return prayerTimesArr[prayerTimesArr.length - 1].name;
  };

  // Dapatkan waktu shalat berikutnya untuk countdown
  const getNextPrayer = (times) => {
    if (!times) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    const convertToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const prayerTimesArr = jadwal.map((prayer) => ({
      name: prayer,
      time: convertToMinutes(times[prayer]),
    }));

    prayerTimesArr.sort((a, b) => a.time - b.time);

    for (let i = 0; i < prayerTimesArr.length; i++) {
      if (currentTime < prayerTimesArr[i].time) {
        return prayerTimesArr[i];
      }
    }

    return prayerTimesArr[0];
  };

  return (
    <div className="flex flex-col items-center gap-8 mt-10 mb-10 px-4">
      {prayerTimes && (
        <div className="flex flex-col justify-center items-center w-11/12 max-w-5xl bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-xl">
          
          {/* Countdown */}
          <PrayerCountdown
            prayerTimes={prayerTimes}
            jadwal={jadwal}
            getNextPrayer={getNextPrayer}
          />

          {/* Grid jadwal shalat */}
          <div className="flex flex-wrap justify-center gap-8 w-full">
            {jadwal.map((item) => (
              <div
                key={item}
                className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all ${
                  currentPrayer === item
                    ? "bg-white border-4 border-[#2F8DB5] shadow-lg"
                    : "bg-gray-100 border border-gray-200"
                }`}
              >
                {currentPrayer === item && (
                  <span className="absolute -top-1 w-full flex justify-center bg-[#2F8DB5] text-white text-xs font-bold px-2 py-1 rounded-full">
                    NOW
                  </span>
                )}

                <p className="text-[#2F8DB5] font-semibold text-base sm:text-lg mt-2">
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </p>
                <p className="text-gray-800 text-2xl sm:text-3xl font-bold mt-1">
                  {prayerTimes[item]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PrayerTime;
