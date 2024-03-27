import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../../services/OrderService';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const loadOrders = async () => {
            const fetchedOrders = await fetchOrders();
            setOrders(fetchedOrders);
        };

        loadOrders();
    }, []);

    return (
        <div>
            <h2>Order History</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        Order #{order.id}: {order.firstName} {order.lastName} - Total: ${order.totalAmount}
                        {/* Add more details as needed */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderHistory;
