import axios from "axios";

// get location all in indonesia
const getLocations = async () => {
    try {
        const response = await axios.get('https://api.myquran.com/v2/sholat/kota/semua');
        return response.data.data; // return array of locations
    } catch (error) {
        console.error("Error fetching locations:", error);
        return [];
    }
};

export default getLocations;