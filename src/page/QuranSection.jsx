import { useState } from "react";
import SearchSurah from "../components/SearchSurah";
import ListSurah from "../components/ListSurah";
import Footer from "../page/Footer"

const QuranSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("");

  return (
    <div className="p-9">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Daftar Surah
        </h2>
        <SearchSurah searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedJuz={selectedJuz} setSelectedJuz={setSelectedJuz} />
        <ListSurah searchQuery={searchQuery} selectedJuz={selectedJuz} />
      </div>
      <Footer />
    </div>
  );
};

export default QuranSection;
