import React, { useState, useEffect } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { fetchOrderHistory } from '../../services/OrderService';
import './OrderHistory.css';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth0();

    useEffect(() => {
        const getOrders = async () => {
            if (user?.email) {
                const fetchedOrders = await fetchOrderHistory(user.email);
                setOrders(fetchedOrders);
            }
        };

        getOrders();
    }, [user?.email]);

    if (orders.length === 0) {
        return (
            <div className="order-history-container">
                <h2 className="order-history-heading">Order History</h2>
                <p>You have not placed any orders yet.</p>
            </div>
        );
    }

    return (
        <div className="order-history-container">
            <h2 className="order-history-heading">Order History</h2>
            {orders.map(order => (
                <div key={order.id} className="order-card">
                    <h3 className="order-id">Order Time: {new Date(order.orderDate).toLocaleString()}</h3>
                    <table className="table">
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
                    <div className="order-summary">
                        <p>Total Amount: ${order.totalAmount}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;
