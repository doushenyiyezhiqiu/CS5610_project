import React, { useState, useEffect } from 'react';
import { fetchOrderHistory } from '../../services/OrderService';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            const fetchedOrders = await fetchOrderHistory();
            setOrders(fetchedOrders);
        };

        getOrders();
    }, []);

    return (
        <div>
            <h2>Order History</h2>
            {orders.map(order => (
                <div key={order.id}>
                    <h3>Order ID: {order.id}</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Item Image</th>
                                <th>Item Name</th>
                                <th>Item Unit Price</th>
                                <th>Item Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <td><img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
                                    <td>{item.name}</td>
                                    <td>{item.unitPrice}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Amount: {order.totalAmount}</p>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;