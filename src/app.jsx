import PrayerTimeSection from "./page/PrayerTimeSection.jsx";
import QuranSection from "./page/QuranSection.jsx";
import Footer from "./page/Footer.jsx";
// import ScrollNavbar from './components/ScrollNavbar';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <ScrollNavbar /> */}
      <PrayerTimeSection />
      <QuranSection />
      <Footer />
    </div>
  );
};

export default App;

