import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:5000';

export const submitOrder = async (orderData) => {
    try {
        // The config object is correctly defined for specifying the request's Content-Type.
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };

        // The axios.post method is used correctly. It sends orderData as JSON to the server.
        console.log(orderData);
        const response = await axios.post(`${API_BASE_URL}/orders`, orderData, config);
        
        // Assuming the server responds with the created order's data, it is returned here.
        return response; // This line returns the response data to the caller.
    } catch (error) {
        console.error("Error submitting order:", error);
        return null; // In case of an error, null is returned. You might consider throwing the error or handling it differently depending on your application's needs.
    }
};
