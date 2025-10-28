import GetLocation from "../components/GetLocation";
import PrayerTime from "../components/PrayerTime";
import { useState } from "react";

const Home = () => {
  const [selectedCity, setSelectedCityId] = useState(localStorage.getItem("selectedCity"));

  return (
    <>
      <GetLocation setSelectedCityId={setSelectedCityId} />
      <PrayerTime selectedCity={selectedCity} />
    </>
  );
};

export default Home;
