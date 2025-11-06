import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./app.jsx";
import ShowSurah from "./page/Surah.jsx";
import "./index.css";



createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/surah/:id" element={<ShowSurah />} />
      </Routes>
    </BrowserRouter>
);