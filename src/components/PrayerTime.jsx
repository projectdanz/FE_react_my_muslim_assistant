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
  const jadwal = [
    "imsak",
    "subuh",
    "terbit",
    "dzuhur",
    "ashar",
    "maghrib",
    "isya",
  ];

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    fetchLocations();

    const savedCity = localStorage.getItem("selectedCity");
    const savedCityName = localStorage.getItem("selectedCityName");
    if (savedCity) {
      setSelectedCity(savedCityName); // Use savedCityName instead of savedCity
      getPrayerTimes(savedCity).then((times) => {
        setPrayerTimes(times);
        setCurrentPrayer(checkCurrentPrayer(times));
      });
    }
  }, []);

  const handleCitySelect = async (cityId, cityName) => {
    setSelectedCity(cityName); // Changed from cityId to cityName
    setSearchQuery(cityName);
    setShowSuggestions(false);

    if (cityId) {
      const times = await getPrayerTimes(cityId);
      setPrayerTimes(times);
      setCurrentPrayer(checkCurrentPrayer(times));
      localStorage.setItem("selectedCity", cityId);
      localStorage.setItem("selectedCityName", cityName); // Add this line
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

    // Sort prayer times
    prayerTimes.sort((a, b) => a.time - b.time);

    // Find current prayer
    for (let i = prayerTimes.length - 1; i >= 0; i--) {
      if (currentTime >= prayerTimes[i].time) {
        return prayerTimes[i].name;
      }
    }

    // If current time is before first prayer, return last prayer of previous day
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

    // Sort prayer times
    prayerTimes.sort((a, b) => a.time - b.time);

    // Find next prayer
    for (let i = 0; i < prayerTimes.length; i++) {
      if (currentTime < prayerTimes[i].time) {
        return prayerTimes[i];
      }
    }

    // If all prayers passed, return first prayer of next day
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

    if (prayerTime < now) {
      prayerTime.setDate(prayerTime.getDate() + 1);
    }

    const diff = prayerTime - now;
    const hrs = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hrs}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Add timer to update current prayer
  useEffect(() => {
    if (prayerTimes) {
      const timer = setInterval(() => {
        setCurrentPrayer(checkCurrentPrayer(prayerTimes));
        setCountdown(calculateCountdown(prayerTimes));
      }, 1000); // Check every second

      return () => clearInterval(timer);
    }
  }, [prayerTimes]);

  return (
    <div className="flex flex-col items-center gap-8 mt-10 mb-10">
      {/* search nama2 kota di indonesia */}
      <div className="relative w-[40%]" ref={searchRef}>
        <div className="relative w-full max-w-sm">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />

          <input
            type="text"
            placeholder={ "Lokasi pilihan anda " + selectedCity } // Modified placeholder
            value={searchQuery}
            onChange={(e) => {
              const formatted = formatCityName(e.target.value);
              setSearchQuery(formatted);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="w-full px-5 py-3 text-gray-800 bg-white/80 border border-gray-300 rounded-2xl 
                 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 
                 focus:border-transparent placeholder-gray-400 transition-all duration-200 pl-10 pr-3 "
          />
        </div>

        {showSuggestions && searchQuery && (
          <div
            className="absolute left-0 right-0 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 
                   overflow-hidden z-50 transition-all duration-200 animate-fadeIn"
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

      {/* rendeer prayer times */}

      <div className="flex">
        {prayerTimes && (
          <div className="bg-gray-100 w-full p-6 rounded-3xl flex flex-col justify-end border-4 border-white  shadow-blue-300 shadow-2xl">
            <div className="flex flex-wrap justify-center gap-4">
              {jadwal.map((item) => (
                <div
                  key={item}
                  className={`w-32 rounded-2xl p-4 text-center relative bg-white
                  ${
                    currentPrayer === item
                      ? "border-4 border-[#2F8DB5] bg-white shadow-lg"
                      : ""
                  }`}
                >
                  {currentPrayer === item && (
                    <>
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#2F8DB5] text-white px-3 py-1 rounded-t-full text-sm w-[8rem]">
                        {countdown}
                      </div>
                      <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-[#2F8DB5] text-white px-3 py-1 rounded-full text-sm">
                        NOW
                      </span>
                    </>
                  )}
                  <p className="prayer-name text-[#2F8DB5] font-semibold text-lg">
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </p>
                  <p className="prayer-time text-gray-800 text-4xl font-bold mt-1">
                    {prayerTimes[item]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrayerTime;
