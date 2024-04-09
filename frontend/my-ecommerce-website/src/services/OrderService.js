// Update the import statement if you're switching from axios to fetch API
export const fetchOrderHistory = async (email) => {
    try {
        const response = await fetch(`http://127.0.0.1:5000/order-history?email=${encodeURIComponent(email)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return await response.json();
    } catch (error) {
        console.error("Error fetching order history:", error);
        return []; // It's a good practice to return an empty array as the default case
    }
};

