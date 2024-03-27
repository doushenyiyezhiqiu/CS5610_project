import React, { useEffect, useState } from 'react';
import { cartService } from '../../services/CartService';
import { useNavigate } from 'react-router-dom';

const CartDetails = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const navigate = useNavigate();

    useEffect(() => {
        const refreshCart = () => {
            setCartItems([...cartService.cartItems]);
            setTotalPrice(cartService.totalPrice.value);
        };

        refreshCart();

        const totalPriceSubscription = cartService.totalPrice.subscribe(() => {
            refreshCart();
        });

        return () => {
            totalPriceSubscription.unsubscribe();
        };
    }, []);

    const handleIncrement = (cartItem) => {
        cartService.addToCart(cartItem);
    };

    const handleDecrement = (cartItem) => {
        cartService.decrementQuantity(cartItem);
    };

    const handleCheckout = () => {
        navigate(`/checkout`);
    }

    return (
        <div>
            <h2>Cart Details</h2>
            <table style={{ width: '100%', tableLayout: 'fixed' }}>
                <thead>
                    <tr>
                        <th style={{ width: '20%' }}>Product Image</th>
                        <th style={{ width: '40%' }}>Product Name</th>
                        <th style={{ width: '20%' }}>Product Quantity</th>
                        <th style={{ width: '20%' }}>Product Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(item => (
                        <tr key={item.id}>
                            <td style={{ textAlign: 'center' }}>
                                <img src={item.imageUrl} alt={item.name} style={{ width: '50px', height: '50px' }} />
                            </td>
                            <td>{item.name}</td>
                            <td style={{ textAlign: 'center' }}>
                                <button onClick={() => handleDecrement(item)}>-</button>
                                {` ${item.quantity} `}
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </td>
                            <td>${item.price.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: '20px', textAlign: 'right' }}>
                <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
            </div>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <button onClick={handleCheckout}>Checkout</button>
            </div>
        </div>
    );
};

export default CartDetails;

