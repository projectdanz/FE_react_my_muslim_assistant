import axios from "axios";

const getPrayerTimes = async (city) => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // January is 0
    const year = today.getFullYear();
    const currentDate = `${year}-${month}-${day}`;

    if (!city) {
        console.error("City ID is required to fetch prayer times.");
        return null;
    } 

    try {
        const response = await axios.get(`https://api.myquran.com/v2/sholat/jadwal/${city}/${currentDate}`);
        return response.data.data.jadwal; // return prayer times object
    } catch (error) {
        console.error("Error fetching prayer times:", error);
        return null;
    }
}

export default getPrayerTimes