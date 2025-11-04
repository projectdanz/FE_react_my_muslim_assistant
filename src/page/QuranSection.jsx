import { useState } from "react";
import SearchSurah from "../components/SearchSurah";
import ListSurah from "../components/ListSurah";
import Footer from "../page/Footer";

const QuranSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJuz, setSelectedJuz] = useState("");

  return (
    <>
      <div className="p-4 sm:p-12">
        <div className="text-center mb-8">
          <div className="sm:shadow-xl sm:bg-gray-50 sm:p-6 rounded-2xl">
            <SearchSurah
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedJuz={selectedJuz}
            setSelectedJuz={setSelectedJuz}
          />
          <ListSurah searchQuery={searchQuery} selectedJuz={selectedJuz} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default QuranSection;
