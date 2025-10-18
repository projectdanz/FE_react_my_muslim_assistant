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
    const interval = setInterval(updateClock, 1000); // update tiap 1 detik

    return () => clearInterval(interval); 
    }, []);

    return (
    <>
        {/* Container utama */}
        <div className="bg-gray-100 bg-opacity-15 backdrop-blur-lg rounded-3xl p-8 shadow-blue-300 shadow-2xl border-4 border-white border-opacity-20">
          <div className="flex items-center gap-4">
            {/* Jam dan Menit */}
              <div className="border-4 border-[#20aae6] rounded-3xl px-12 py-8 shadow-xl backdrop-blur-xl bg-white">
                <h1 className="text-9xl font-bold text-gray-700 tracking-wider">
                  {hourMinute}
                </h1>
              </div>

            {/* Detik */}
              <div className="border-4 border-[#20aae6] rounded-2xl px-6 py-8 shadow-xl bg-white relative bottom-7">
                <h1 className="text-7xl font-bold text-gray-700">
                  {seconds}
                </h1>
              </div>
          </div>
        </div>
    </>
    )
}

export default Time