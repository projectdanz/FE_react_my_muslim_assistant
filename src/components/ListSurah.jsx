import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

const ListSurah = ({ searchQuery, selectedJuz }) => {
  const [surahs, setSurahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const toArabicNumbers = (num) => {
    const arabicNumbers = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
    return num
      .toString()
      .split("")
      .map((digit) => arabicNumbers[digit])
      .join("");
  };

  const normalize = (text) => {
  return text
    .toLowerCase()
    .replace(/['’\-]/g, "")
    .replace(/\s+/g, "");
};


  const handleSurahClick = (surahNumber) => {
    navigate(`/surah/${surahNumber}`);
  };

  const filteredSurahs = surahs.filter((surah) => {
    const search = normalize(searchQuery);
    const namaLatin = normalize(surah.namaLatin);
    const arti = normalize(surah.arti);
    const matchesJuz = selectedJuz
      ? SURAH_JUZ_MAP[surah.nomor].includes(parseInt(selectedJuz))
      : true;
    
    return (
    namaLatin.includes(search) ||
    arti.includes(search) ||
    surah.nomor.toString().includes(search)
  )&& matchesJuz;

  });

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-black">Loading...</div>
      </div>
    );
  }

  return (
    <>
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
      
    </>
  );
};

export default ListSurah;
