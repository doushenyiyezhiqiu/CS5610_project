import React, { useState } from 'react';
import { cartService } from '../../services/CartService';
import { submitOrder } from '../../services/CheckoutService';

const Checkout = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingState, setShippingState] = useState('');
    const [shippingZipCode, setShippingZipCode] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [billingCity, setBillingCity] = useState('');
    const [billingState, setBillingState] = useState('');
    const [billingZipCode, setBillingZipCode] = useState('');
    const [sameAsShipping, setSameAsShipping] = useState(false);
    const [creditCardNumber, setCreditCardNumber] = useState('');
    const [creditCardExpirationDate, setCreditCardExpirationDate] = useState('');
    const [creditCardCvv, setCreditCardCvv] = useState('');

    const totalAmount = parseFloat(cartService.totalPrice.value); 

    const handleSameAsShippingChange = () => {
        setSameAsShipping(!sameAsShipping);
        if (!sameAsShipping) {
            setBillingAddress(shippingAddress);
            setBillingCity(shippingCity);
            setBillingState(shippingState);
            setBillingZipCode(shippingZipCode);
        } else {
            setBillingAddress('');
            setBillingCity('');
            setBillingState('');
            setBillingZipCode('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formattedTotalAmount = parseFloat(totalAmount).toFixed(2);

        console.log("Total amount is:" + totalAmount);

        const cartItems = cartService.cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            imageUrl: item.imageUrl
        }));
        
        const orderData = {
            firstName,
            lastName,
            email,
            shippingAddress,
            shippingCity,
            shippingState,
            shippingZipCode,
            billingAddress,
            billingCity,
            billingState,
            billingZipCode,
            creditCardNumber,
            creditCardExpirationDate,
            creditCardCvv,
            totalAmount: formattedTotalAmount,
            cartItems
        };
        
        try {
            // Attempt to submit the order
            const response = await submitOrder(orderData);
            console.log('the status is:' + response.status);
            if (response && response.status === 201) {
                alert('Order placed successfully!');
            } else {
                alert(`Failed to place order: ${response.statusText || "Server error"}`);
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            <form>
                <div>
                    <label>First Name:</label>
                    <input
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label>Last Name:</label>
                    <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <label>Email Address:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Shipping Address</h3>
                    <label>Address:</label>
                    <input
                        type="text"
                        placeholder="Address"
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                    />
                    <label>City:</label>
                    <input
                        type="text"
                        placeholder="City"
                        value={shippingCity}
                        onChange={(e) => setShippingCity(e.target.value)}
                    />
                    <label>State:</label>
                    <input
                        type="text"
                        placeholder="State"
                        value={shippingState}
                        onChange={(e) => setShippingState(e.target.value)}
                    />
                    <label>Zip Code:</label>
                    <input
                        type="text"
                        placeholder="Zip Code"
                        value={shippingZipCode}
                        onChange={(e) => setShippingZipCode(e.target.value)}
                    />
                </div>
                <div>
                    <h3>Billing Address</h3>
                    <label>
                        <input
                            type="checkbox"
                            checked={sameAsShipping}
                            onChange={handleSameAsShippingChange}
                        /> Same as shipping address
                    </label>
                    {!sameAsShipping && (
                        <>
                            <label>Address:</label>
                            <input
                                type="text"
                                placeholder="Address"
                                value={billingAddress}
                                onChange={(e) => setBillingAddress(e.target.value)}
                            />
                            <label>City:</label>
                            <input
                                type="text"
                                placeholder="City"
                                value={billingCity}
                                onChange={(e) => setBillingCity(e.target.value)}
                            />
                            <label>State:</label>
                            <input
                                type="text"
                                placeholder="State"
                                value={billingState}
                                onChange={(e) => setBillingState(e.target.value)}
                                />
                                <label>Zip Code:</label>
                                <input
                                    type="text"
                                    placeholder="Zip Code"
                                    value={billingZipCode}
                                    onChange={(e) => setBillingZipCode(e.target.value)}
                                />
                            </>
                        )}
                    </div>
                    <div>
                        <h3>Credit Card Information</h3>
                        <label>Card Number:</label>
                        <input
                            type="text"
                            name="number"
                            placeholder="Card Number"
                            value={creditCardNumber}
                            onChange={(e) => setCreditCardNumber(e.target.value)}
                        />
                        <label>Expiration Date:</label>
                        <input
                            type="text"
                            name="expirationDate"
                            placeholder="Expiration Date (MM/YY)"
                            value={creditCardExpirationDate}
                            onChange={(e) => setCreditCardExpirationDate(e.target.value)}
                        />
                        <label>CVV:</label>
                        <input
                            type="text"
                            name="cvv"
                            placeholder="CVV"
                            value={creditCardCvv}
                            onChange={(e) => setCreditCardCvv(e.target.value)}
                        />
                    </div>
                    <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit</button>
                </form>
            </div>
        );
    };
    
    export default Checkout;
