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

    // Check if orders array is empty and display a message accordingly
    if (orders.length === 0) {
        return (
            <div>
                <h2>Order History</h2>
                <p>You never placed an order.</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Order History</h2>
            {orders.map(order => (
                <div key={order.id}>
                    <h3>Order ID: {order.id}</h3>
                    <table>
                        <thead>
                            <tr>
                                {/* Apply inline styles for column widths and text alignment */}
                                <th style={{ width: '20%', textAlign: 'center' }}>Item Image</th>
                                <th style={{ width: '40%', textAlign: 'center' }}>Item Name</th>
                                <th style={{ width: '20%', textAlign: 'center' }}>Item Unit Price</th>
                                <th style={{ width: '20%', textAlign: 'center' }}>Item Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.items.map((item, index) => (
                                <tr key={index}>
                                    <td style={{ textAlign: 'center' }}><img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} /></td>
                                    <td style={{ textAlign: 'center' }}>{item.name}</td>
                                    <td style={{ textAlign: 'center' }}>${item.unitPrice}</td> {/* Ensure price formatting */}
                                    <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{ textAlign: 'right', marginTop: '10px' }}>
                        <p>Order Time: {new Date(order.orderDate).toLocaleString()}</p>
                        <p>Total Amount: ${order.totalAmount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
