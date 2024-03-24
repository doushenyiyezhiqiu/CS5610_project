import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export const getProducts = async () => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const response = await axios.get(`${API_BASE_URL}/products`, config);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/${productId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        return null;
    }
};

export const searchProducts = async (query) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/products/search`, { params: { query } });
        return response.data;
    } catch (error) {
        console.error("Error searching products:", error);
        return [];
    }
};