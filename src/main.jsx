import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import QuranSection from "./page/QuranSection.jsx";
import Surah from "./page/Surah.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<QuranSection />} />
          <Route path="/surah/:id" element={<Surah />} />
        </Routes>
      </BrowserRouter>
  </StrictMode>
);
