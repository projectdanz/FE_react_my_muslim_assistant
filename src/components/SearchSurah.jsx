import { useState } from "react";
import { IoSearch, IoFilter } from "react-icons/io5";

const SearchSurah = ({ searchQuery, selectedJuz, setSearchQuery, setSelectedJuz }) => {
  const [showFilter, setShowFilter] = useState(false);
  
  const juzNumbers = Array.from({ length: 30 }, (_, i) => i + 1);

  return(
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
          <label className="text-gray-700 font-medium text-sm">
            Filter Juz:
          </label>
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
  );
};

export default SearchSurah;
