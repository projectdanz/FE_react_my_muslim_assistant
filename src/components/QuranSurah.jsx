import { useState, useEffect } from "react";
import axios from "axios";
import { IoSearch, IoFilter } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const SURAH_JUZ_MAP = {
  1: [1],
  2: [1, 2, 3],
  3: [3, 4],
  4: [4, 5, 6],
  5: [6, 7],
  6: [7, 8],
  7: [8, 9],
  8: [9, 10],
  9: [10, 11],
  10: [11],
  11: [11, 12],
  12: [12, 13],
  13: [13],
  14: [13],
  15: [14],
  16: [14],
  17: [15],
  18: [15, 16],
  19: [16],
  20: [16],
  21: [17],
  22: [17],
  23: [18],
  24: [18],
  25: [18, 19],
  26: [19],
  27: [19, 20],
  28: [20],
  29: [20, 21],
  30: [21],
  31: [21],
  32: [21],
  33: [21, 22],
  34: [22],
  35: [22],
  36: [22, 23],
  37: [23],
  38: [23],
  39: [23, 24],
  40: [24],
  41: [24, 25],
  42: [25],
  43: [25],
  44: [25],
  45: [25],
  46: [26],
  47: [26],
  48: [26],
  49: [26],
  50: [26],
  51: [26, 27],
  52: [27],
  53: [27],
  54: [27],
  55: [27],
  56: [27],
  57: [27],
  58: [28],
  59: [28],
  60: [28],
  61: [28],
  62: [28],
  63: [28],
  64: [28],
  65: [28],
  66: [28],
  67: [29],
  68: [29],
  69: [29],
  70: [29],
  71: [29],
  72: [29],
  73: [29],
  74: [29],
  75: [29],
  76: [29],
  77: [29],
  78: [30],
  79: [30],
  80: [30],
  81: [30],
  82: [30],
  83: [30],
  84: [30],
  85: [30],
  86: [30],
  87: [30],
  88: [30],
  89: [30],
  90: [30],
  91: [30],
  92: [30],
  93: [30],
  94: [30],
  95: [30],
  96: [30],
  97: [30],
  98: [30],
  99: [30],
  100: [30],
  101: [30],
  102: [30],
  103: [30],
  104: [30],
  105: [30],
  106: [30],
  107: [30],
  108: [30],
  109: [30],
  110: [30],
  111: [30],
  112: [30],
  113: [30],
  114: [30],
};

const QuranSurah = () => {
  const [surahs, setSurahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("");
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();

  // Convert to Arabic numbers
  const toArabicNumbers = (num) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((digit) => arabicNumbers[digit])
      .join("");
  };

  // Fetch all surahs
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await axios.get("https://equran.id/api/v2/surat");
        setSurahs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching surahs:", error);
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

  // Enhanced filter function
  const filteredSurahs = surahs.filter((surah) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      surah.namaLatin.toLowerCase().includes(searchLower) ||
      surah.arti.toLowerCase().includes(searchLower) ||
      surah.nomor.toString().includes(searchQuery);

    const matchesJuz = selectedJuz
      ? SURAH_JUZ_MAP[surah.nomor].includes(parseInt(selectedJuz))
      : true;

    return matchesSearch && matchesJuz;
  });

  // Generate array of unique juz numbers
  const juzNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  const handleSurahClick = (surahNumber) => {
    navigate(`/surah/${surahNumber}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
  <div className="max-w-7xl mx-auto p-4">
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 shadow-2xl border border-blue-100">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-blue-500 bg-clip-text text-transparent">
          Daftar Surah
        </h2>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari berdasarkan nama, arti, atau nomor surah..."
            className="w-full bg-white text-gray-900 rounded-2xl px-4 py-4 pl-12 pr-12 border border-blue-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 shadow-sm"
          />
          <IoSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-400"
            size={20}
          />
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 hover:bg-blue-50 p-1 rounded-lg transition-colors"
            onClick={() => setShowFilter(!showFilter)}
          >
            <IoFilter className="text-blue-500" size={22} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-lg animate-fade-in">
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium text-sm">Filter Juz:</label>
              <select
                value={selectedJuz}
                onChange={(e) => setSelectedJuz(e.target.value)}
                className="bg-white text-gray-900 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 border border-blue-200 transition-all"
              >
                <option value="">Semua Juz</option>
                {juzNumbers.map((juz) => (
                  <option key={juz} value={juz}>
                    Juz {juz}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Results Counter */}
      <div className="flex justify-between items-center mb-6">
        <div className="text-gray-600 text-sm font-medium bg-white px-4 py-2 rounded-full border border-blue-200">
          Ditemukan <span className="text-blue-600 font-bold">{filteredSurahs.length}</span> surah
        </div>
      </div>

      {/* Surah Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSurahs.map((surah) => (
          <div
            key={surah.nomor}
            onClick={() => handleSurahClick(surah.nomor)}
            className="group bg-white rounded-2xl p-6 transition-all duration-300 cursor-pointer border border-blue-100 relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-50 to-indigo-50 rounded-bl-3xl opacity-50"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="flex-1">
                <div className="inline-block bg-blue-500 text-white text-xs px-3 py-1 rounded-full mb-3 font-medium">
                  {surah.tempatTurun}
                </div>
                <div className="text-gray-800 text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">
                  {surah.namaLatin}
                </div>
                <div className="text-gray-500 text-sm italic">
                  {surah.arti}
                </div>
              </div>
              
              <div className="text-right ml-4">
                <div className="text-gray-400 text-xs mb-1 font-medium">
                  Surah Ke-{toArabicNumbers(surah.nomor)}
                </div>
                <div className="font-arabic text-gray-800 text-2xl font-bold leading-8">
                  {surah.nama}
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100 relative z-10">
              <div className="text-blue-500 text-sm font-semibold">
                {toArabicNumbers(surah.jumlahAyat)} ayat
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <svg className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSurahs.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📖</div>
          <div className="text-gray-500 text-lg font-medium">Tidak ada surah yang ditemukan</div>
          <div className="text-gray-400 text-sm mt-2">Coba ubah kata kunci pencarian atau filter</div>
        </div>
      )}
    </div>
  </div>
);
};

export default QuranSurah;
