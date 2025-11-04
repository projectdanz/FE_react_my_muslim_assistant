import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuranSection from "./page/QuranSection.jsx";
import ShowSurah from "./page/ShowSurah.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuranSection />} />
          <Route path="/surah/:id" element={<ShowSurah />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
);
