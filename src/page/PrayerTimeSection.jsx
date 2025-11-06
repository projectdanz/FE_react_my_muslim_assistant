import GetLocation from "../components/GetLocation";
import PrayerTime from "../components/PrayerTime";
import { useState } from "react";
import iconDark from "../assets/image/icon-dua-dark.svg";

const Home = () => {
  const [selectedCity, setSelectedCityId] = useState(
    localStorage.getItem("selectedCity")
  );
  return (
    <>
      <div className="w-full h-74 sm:h-92 bg-[#2F8DB5] flex flex-col gap-10 justify-center items-center p-6 pt-10">
        <div className="absolute -top-20">
          <img src={iconDark} alt="" className="" />
        </div>
        <div className="w-full flex justify-center mt-8 sm:mt-32">
          <GetLocation setSelectedCityId={setSelectedCityId} />
        </div>
      </div>

      <div className="-mt-25">
        <PrayerTime selectedCity={selectedCity} />
      </div>
    </>
  );
};

export default Home;
