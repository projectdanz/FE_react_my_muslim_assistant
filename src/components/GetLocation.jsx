import { useState, useEffect, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";
import  getLocations  from "../script/getLocations";
import PrayerCountdown from "./PrayerCountdown";


const GetLocation = ({ setSelectedCityId }) => {
  const [selectedCity, setSelectedCity] = useState("");
  const [locations, setLocations] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await getLocations();
      setLocations(data);
    };
    fetchLocations();
  }, [])

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


  const filteredLocations = locations.filter((location) => {
    const cityName = location.lokasi
      .replace(/^Kab(\.|upaten)?\s*/i, "")
      .replace(/^Kota\s*/i, "")
      .trim()
      .toLowerCase();
    return cityName.includes(searchQuery.toLowerCase());
  });

  const handleCitySelect = async (cityId, cityName) => {
  setSelectedCity(cityId);
  setSearchQuery(cityName);
  setShowSuggestions(false);

  if (cityId) {
    localStorage.setItem("selectedCity", cityId);
    localStorage.setItem("selectedCityName", cityName);

    // ✅ panggil fungsi dari parent biar PrayerTime tahu kota baru
    setSelectedCityId(cityId);
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

  return (
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
  );
}

export default GetLocation;