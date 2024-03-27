import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export const fetchOrders = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        return response.data; // This will be the array of orders
    } catch (error) {
        console.error("Error fetching orders:", error);
        return []; // Return an empty array in case of error
    }
};
