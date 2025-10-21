import getPrayerTimes, { getLocations } from "../script/PrayerTimeScript";
import { useEffect, useState, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import "../styles/PrayerTimeStyle.css";

const PrayerTime = () => {
  const [locations, setLocations] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentPrayer, setCurrentPrayer] = useState(null);
  const [countdown, setCountdown] = useState("");
  const searchRef = useRef(null);

  const jadwal = ["imsak", "subuh", "dzuhur", "ashar", "maghrib", "isya"];

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    fetchLocations();

    const savedCity = localStorage.getItem("selectedCity");
    const savedCityName = localStorage.getItem("selectedCityName");
    if (savedCity) {
      setSelectedCity(savedCityName);
      getPrayerTimes(savedCity).then((times) => {
        setPrayerTimes(times);
        setCurrentPrayer(checkCurrentPrayer(times));
      });
    }
  }, []);

  const handleCitySelect = async (cityId, cityName) => {
    setSelectedCity(cityName);
    setSearchQuery(cityName);
    setShowSuggestions(false);

    if (cityId) {
      const times = await getPrayerTimes(cityId);
      setPrayerTimes(times);
      setCurrentPrayer(checkCurrentPrayer(times));
      localStorage.setItem("selectedCity", cityId);
      localStorage.setItem("selectedCityName", cityName);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredLocations = locations.filter((location) => {
    const cityName = location.lokasi
      .replace(/^Kab(\.|upaten)?\s*/i, "")
      .replace(/^Kota\s*/i, "")
      .trim()
      .toLowerCase();
    return cityName.includes(searchQuery.toLowerCase());
  });

  const formatCityName = (name) => {
    return name
      .replace(/^Kab(\.|upaten)?\s*/i, "")
      .replace(/^Kota\s*/i, "")
      .trim()
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const checkCurrentPrayer = (times) => {
    if (!times) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const convertToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const prayerTimes = jadwal.map((prayer) => ({
      name: prayer,
      time: convertToMinutes(times[prayer]),
    }));

    prayerTimes.sort((a, b) => a.time - b.time);

    for (let i = prayerTimes.length - 1; i >= 0; i--) {
      if (currentTime >= prayerTimes[i].time) {
        return prayerTimes[i].name;
      }
    }

    return prayerTimes[prayerTimes.length - 1].name;
  };

  const getNextPrayer = (times) => {
    if (!times) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    const convertToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(":").map(Number);
      return hours * 60 + minutes;
    };

    const prayerTimes = jadwal.map((prayer) => ({
      name: prayer,
      time: convertToMinutes(times[prayer]),
    }));

    prayerTimes.sort((a, b) => a.time - b.time);

    for (let i = 0; i < prayerTimes.length; i++) {
      if (currentTime < prayerTimes[i].time) {
        return prayerTimes[i];
      }
    }

    return prayerTimes[0];
  };

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

  useEffect(() => {
    if (prayerTimes) {
      const timer = setInterval(() => {
        setCurrentPrayer(checkCurrentPrayer(prayerTimes));
        setCountdown(calculateCountdown(prayerTimes));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [prayerTimes]);

  return (
    <div className="flex flex-col items-center gap-8 mt-10 mb-10 px-4">
      {/* Search Input */}
      <div
        className="relative w-full sm:w-[70%] md:w-[50%] lg:w-[40%]"
        ref={searchRef}
      >
        <div className="relative w-full">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="text"
            placeholder={"Lokasi pilihan anda " + selectedCity}
            value={searchQuery}
            onChange={(e) => {
              const formatted = formatCityName(e.target.value);
              setSearchQuery(formatted);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full px-5 py-3 text-gray-800 bg-white/80 border border-gray-300 rounded-2xl 
              shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 
              focus:border-transparent placeholder-gray-400 transition-all duration-200 pl-10 pr-3"
          />
        </div>

        {showSuggestions && searchQuery && (
          <div
            className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 
              overflow-hidden z-50 transition-all duration-200 animate-fadeIn max-h-60 overflow-y-auto"
          >
            {filteredLocations.slice(0, 5).map((location) => {
              const cityName = formatCityName(location.lokasi);
              return (
                <div
                  key={location.id}
                  className="px-4 py-3 text-gray-700 hover:bg-blue-100 cursor-pointer transition-colors"
                  onClick={() => handleCitySelect(location.id, cityName)}
                >
                  {cityName}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Prayer Time Cards */}
      {prayerTimes && (
        <div className="flex flex-col justify-center items-center w-11/12 max-w-5xl bg-gray-50 p-6 rounded-3xl border border-gray-200 shadow-xl">
  {/* Countdown */}
  <p className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-700 text-center">
    <span className="font-bold">{countdown}</span> until{" "}
    <span className="text-[#2F8DB5]">
      {jadwal
        .map(
          (prayer) => prayer.charAt(0).toUpperCase() + prayer.slice(1)
        )
        .find(
          (p) => p.toLowerCase() === getNextPrayer(prayerTimes)?.name
        )}
    </span>
  </p>

  {/* Grid kotak shalat */}
  <div className="flex flex-wrap justify-center gap-8 w-full">
    {jadwal.map((item) => (
      <div
        key={item}
        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all
        ${
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
