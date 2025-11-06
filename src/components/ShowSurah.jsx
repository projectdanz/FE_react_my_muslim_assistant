import { useState, useEffect } from "react";
import axios from "axios";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useParams, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoSettingsSharp } from "react-icons/io5";
import FooterSection from "../page/Footer";
import iconLight from "../assets/image/icon-satu-theme-dark.svg";
import "../styles/global.css";

const ShowSurah = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [currentSurahNumber, setCurrentSurahNumber] = useState(
    parseInt(id) || 1
  );
  const [loading, setLoading] = useState(true);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showLatin, setShowLatin] = useState(true);
  const [arabicFontSize, setArabicFontSize] = useState(40);
  const [showFilter, setShowFilter] = useState(false);

  // Convert to Arabic numbers
  const toArabicNumbers = (num) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((digit) => arabicNumbers[digit])
      .join("");
  };

  // Fetch all surahs for dropdown
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://equran.id/api/v2/surat");
        setSurahs(response.data.data);
        fetchSurah(currentSurahNumber);
      } catch (error) {
        console.error("Error fetching surahs:", error);
      }
    };
    fetchSurahs();
  }, [currentSurahNumber]);

  // Fetch specific surah
  const fetchSurah = async (number) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://equran.id/api/v2/surat/${number}`
      );
      setSelectedSurah(response.data.data);
      setCurrentSurahNumber(number);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching surah:", error);
      setLoading(false);
    }
  };

  // Handle navigation
  const handlePrevious = () => {
    if (currentSurahNumber > 1) {
      navigate(`/surah/${currentSurahNumber - 1}`);
      fetchSurah(currentSurahNumber - 1);
    }
  };

  const handleNext = () => {
    if (currentSurahNumber < 114) {
      navigate(`/surah/${currentSurahNumber + 1}`);
      fetchSurah(currentSurahNumber + 1);
    }
  };

  // Update select onChange handler
  const handleSurahChange = (number) => {
    navigate(`/surah/${number}`);
    fetchSurah(number);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <>
      {/* Navigation Controls */}
      <div className="bg-[#2F8DB5] w-full fixed z-[999] h-16 md:h-20 top-0 left-0 shadow-md flex flex-col justify-center px-3 md:px-6 py-2">
        <div className="flex md:grid md:grid-cols-3 items-center w-full">
          {/* Kiri */}
          <div className="flex items-center">
            <a href="/" className="flex items-center">
              {/* Icon (selalu tampil) */}
              <img
                src={iconLight}
                alt="Logo"
                className="w-10 h-10 md:w-16 md:h-16 mr-2"
              />

              {/* Text (hanya tampil di laptop/desktop) */}
              <span className="hidden md:block text-lg font-semibold text-gray-200">
                My Muslim Assistant
              </span>
            </a>
          </div>

          {/* Tengah */}
          <div className="flex justify-center">
            <div className="flex items-center gap-2">
              {/* Previous */}
              <button
                onClick={handlePrevious}
                disabled={currentSurahNumber === 1}
                className="p-1 md:px-4 md:py-2 bg-white rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Surah sebelumnya"
              >
                <IoChevronBack className="w-4 h-4 md:w-6 md:h-6" />
              </button>

              {/* Dropdown */}
              <select
                value={currentSurahNumber}
                onChange={(e) => handleSurahChange(Number(e.target.value))}
                className="
            px-1 py-1 md:px-4 md:py-2
            bg-white border border-gray-300 rounded-lg text-xs md:text-sm
            text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200
          "
              >
                {surahs.map((surah) => (
                  <option key={surah.nomor} value={surah.nomor}>
                    {surah.nomor}. {surah.namaLatin}
                  </option>
                ))}
              </select>

              {/* Next */}
              <button
                onClick={handleNext}
                disabled={currentSurahNumber === 114}
                className="p-1 md:px-4 md:py-2 bg-white rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Surah berikutnya"
              >
                <IoChevronForward className="w-4 h-4 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Kanan */}
          <div className="hidden md:flex justify-end items-center gap-2">
            <div
              className="flex items-center gap-2 group border border-transparent rounded-lg p-1 
        transition-all duration-200 hover:border-white hover:bg-blue-600"
              onClick={() => setShowFilter(!showFilter)}
            >
              <button
                id="pengaturan"
                className={`p-2 text-white`}
                aria-label="Pengaturan Tampilan"
                onClick={(e) => e.stopPropagation()}
              >
                <IoSettingsSharp size={24} />
              </button>

              <label
                htmlFor="pengaturan"
                className="hidden md:block text-md text-white cursor-pointer transition-colors duration-200 group-hover:text-gray-200"
              >
                Pengaturan
              </label>
            </div>
          </div>

          {/* Tombol pengaturan muncul di mobile */}
          <div className="md:hidden ml-auto">
            <button
              className="p-2 text-white"
              onClick={() => setShowFilter(!showFilter)}
            >
              <IoSettingsSharp className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Display Controls */}
      {showFilter && (
        <div className="bg-white rounded-xl p-4 md:p-6 mb-6 border border-gray-200 fixed w-2/3 z-50 top-24 left-1/2 transform -translate-x-1/2 shadow-lg">
          <div className="flex flex-wrap gap-6 justify-between items-center">
            {/* Display Controls */}
            <div className="flex gap-6">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTranslation}
                  onChange={(e) => setShowTranslation(e.target.checked)}
                  className="w-6 h-6 border-2 border-gray-300 rounded-md bg-white transition-all duration-300
                      checked:bg-blue-500 checked:border-blue-500
                      focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <span className="text-gray-700 font-medium select-none">
                  Terjemahan
                </span>
              </label>

              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLatin}
                  onChange={(e) => setShowLatin(e.target.checked)}
                  className="w-6 h-6 border-2 border-gray-300 rounded-md bg-white transition-all duration-300
                      checked:bg-blue-500 checked:border-blue-500
                      focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <span className="text-gray-700 font-medium select-none">
                  Latin
                </span>
              </label>
            </div>

            {/* Font Size Controls */}
            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm font-medium">
                Ukuran Arab:
              </span>
              <button
                onClick={() =>
                  setArabicFontSize((size) => Math.max(20, size - 2))
                }
                className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
              >
                <FaMinus size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() =>
                  setArabicFontSize((size) => Math.min(56, size + 2))
                }
                className="px-3 py-1 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors shadow-sm"
              >
                <FaPlus size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto pt-30 px-5 ">
        {/* Surah Content */}
        {selectedSurah && (
          <div>
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold">{selectedSurah.namaLatin}</h1>
              <h2 className="text-4xl font-arabic mb-2">
                {selectedSurah.nama}
              </h2>
              <p className="text-gray-600">
                {selectedSurah.tempatTurun} • {selectedSurah.arti} •{" "}
                {selectedSurah.jumlahAyat} Ayat
              </p>
            </div>

            <div className="space-y-6">
              {selectedSurah.ayat.map((ayat) => (
                <div
                  key={ayat.nomorAyat}
                  className="pb-8 mb-10 border-b-2 border-gray-500"
                >
                  <div className="flex items-start gap-4">
                    <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-full border-2 border-blue-500 before:absolute before:inset-0 before:rounded-full before:border before:border-blue-300 before:scale-90 before:content-['']">
                      <span className="text-blue-500 font-bold">
                        {toArabicNumbers(ayat.nomorAyat)}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p
                        className="font-arabic text-right mb-10 font-arabic text-gray-900"
                        style={{ fontSize: `${arabicFontSize || 30}px` }}
                      >
                        {ayat.teksArab}
                      </p>
                      {showLatin && (
                        <p className="text-gray-600 mb-4">{ayat.teksLatin}</p>
                      )}
                      {showTranslation && (
                        <p className="text-gray-800">{ayat.teksIndonesia}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <FooterSection />
    </>
  );
};

export default ShowSurah;
