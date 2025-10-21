import { useEffect, useState } from "react";
import "../styles/PrayerTimeStyle.css";

const Time = () => {
  const [hourMinute, setHourMinute] = useState("");
  const [seconds, setSeconds] = useState("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
      const timeString = now.toLocaleTimeString("id-ID", options);
      const [h, m, s] = timeString.split(".");
      setHourMinute(`${h}:${m}`);
      setSeconds(s);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Container utama */}
      <div className="hidden sm:block bg-gray-100 bg-opacity-15 backdrop-blur-lg rounded-3xl p-4 sm:p-6 md:p-8 shadow-blue-300 shadow-2xl border-4 border-white border-opacity-20 w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Jam dan Menit */}
          <div className="border-4 border-[#20aae6] rounded-3xl px-8 py-6 sm:px-10 sm:py-8 md:px-12 md:py-8 shadow-xl backdrop-blur-xl bg-white w-full sm:w-auto text-center">
            <h1 className="text-6xl sm:text-8xl md:text-9xl font-bold text-gray-700 tracking-wider">
              {hourMinute}
            </h1>
          </div>

          {/* Detik */}
          <div className="border-4 border-[#20aae6] rounded-2xl px-6 py-4 sm:px-8 sm:py-6 md:px-6 md:py-8 shadow-xl bg-white relative sm:bottom-3 md:bottom-7 w-full sm:w-auto text-center">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold text-gray-700">
              {seconds}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Time;
