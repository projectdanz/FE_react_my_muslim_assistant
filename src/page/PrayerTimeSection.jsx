import Time from "../components/Time";
import PrayerTime from "../components/PrayerTime";

const PrayerTimeSection = () => {
    return (
        <div className="flex flex-col items-center mt-10">  
            <Time />
            <PrayerTime />
        </div>
    )
}

export default PrayerTimeSection