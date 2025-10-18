import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route } from 'react-router-dom'
import { BrowserRouter, Routes } from 'react-router-dom'
import PrayerTimeSection from './page/PrayerTimeSection'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <Routes>
          <Route path="/prayer-time" element={<PrayerTimeSection />} />        
      </Routes>
    </BrowserRouter>
)
