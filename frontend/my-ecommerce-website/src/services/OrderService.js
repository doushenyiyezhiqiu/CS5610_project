import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000'; // Update this as per your configuration

export const fetchOrderHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/order-history`);
        return response.data; // This returns the fetched order history data
    } catch (error) {
        console.error("Error fetching order history:", error);
        return []; // Return an empty array or null as a fallback
    }
};
