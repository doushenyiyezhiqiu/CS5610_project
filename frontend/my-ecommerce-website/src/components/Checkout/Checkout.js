import React, { useState } from 'react';
import { cartService } from '../../services/CartService';
import { submitOrder } from '../../services/CheckoutService';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Ngg0rEHLw8pQL0lnAgduz4hh1g2D8BRHyWSwKGL9HqIjTzMVAZmcTmpxO1EqhG9PNXVfE6eWIiQ0xmrdPj7Npvg00793gB1rQ');

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: "#32325d",
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "20px",
            "::placeholder": {
                color: "#aab7c4"
            },
            // Remove spacing and zip code configurations here
        },
        invalid: {
            color: "#fa755a",
            iconColor: "#fa755a"
        }
    },
    // To hide the postal code field
    hidePostalCode: true
};

const CheckoutForm = () => {

    const states = [
        { name: "Alabama", abbreviation: "AL" },
        { name: "Alaska", abbreviation: "AK" },
        { name: "Arizona", abbreviation: "AZ" },
        { name: "Arkansas", abbreviation: "AR" },
        { name: "California", abbreviation: "CA" },
        { name: "Colorado", abbreviation: "CO" },
        { name: "Connecticut", abbreviation: "CT" },
        { name: "Delaware", abbreviation: "DE" },
        { name: "Florida", abbreviation: "FL" },
        { name: "Georgia", abbreviation: "GA" },
        { name: "Hawaii", abbreviation: "HI" },
        { name: "Idaho", abbreviation: "ID" },
        { name: "Illinois", abbreviation: "IL" },
        { name: "Indiana", abbreviation: "IN" },
        { name: "Iowa", abbreviation: "IA" },
        { name: "Kansas", abbreviation: "KS" },
        { name: "Kentucky", abbreviation: "KY" },
        { name: "Louisiana", abbreviation: "LA" },
        { name: "Maine", abbreviation: "ME" },
        { name: "Maryland", abbreviation: "MD" },
        { name: "Massachusetts", abbreviation: "MA" },
        { name: "Michigan", abbreviation: "MI" },
        { name: "Minnesota", abbreviation: "MN" },
        { name: "Mississippi", abbreviation: "MS" },
        { name: "Missouri", abbreviation: "MO" },
        { name: "Montana", abbreviation: "MT" },
        { name: "Nebraska", abbreviation: "NE" },
        { name: "Nevada", abbreviation: "NV" },
        { name: "New Hampshire", abbreviation: "NH" },
        { name: "New Jersey", abbreviation: "NJ" },
        { name: "New Mexico", abbreviation: "NM" },
        { name: "New York", abbreviation: "NY" },
        { name: "North Carolina", abbreviation: "NC" },
        { name: "North Dakota", abbreviation: "ND" },
        { name: "Ohio", abbreviation: "OH" },
        { name: "Oklahoma", abbreviation: "OK" },
        { name: "Oregon", abbreviation: "OR" },
        { name: "Pennsylvania", abbreviation: "PA" },
        { name: "Rhode Island", abbreviation: "RI" },
        { name: "South Carolina", abbreviation: "SC" },
        { name: "South Dakota", abbreviation: "SD" },
        { name: "Tennessee", abbreviation: "TN" },
        { name: "Texas", abbreviation: "TX" },
        { name: "Utah", abbreviation: "UT" },
        { name: "Vermont", abbreviation: "VT" },
        { name: "Virginia", abbreviation: "VA" },
        { name: "Washington", abbreviation: "WA" },
        { name: "West Virginia", abbreviation: "WV" },
        { name: "Wisconsin", abbreviation: "WI" },
        { name: "Wyoming", abbreviation: "WY" }
    ];

    const { user } = useAuth0();
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState(user ? user.email : '');
    const [shippingAddress, setShippingAddress] = useState('');
    const [shippingCity, setShippingCity] = useState('');
    const [shippingState, setShippingState] = useState('');
    const [shippingZipCode, setShippingZipCode] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [billingCity, setBillingCity] = useState('');
    const [billingState, setBillingState] = useState('');
    const [billingZipCode, setBillingZipCode] = useState('');
    const [sameAsShipping, setSameAsShipping] = useState(false);

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

    const handleStripePayment = async () => {
        if (!stripe || !elements) {
            console.log("Stripe hasn't loaded yet");
            return;
        }

        const cardElement = elements.getElement(CardElement);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.log('[error]', error);
            alert('Payment unsuccessful!');
            return; // Stop the process and handle the error
        } else {
            // Send paymentMethod.id and orderData.amount to your backend
            const response = await fetch('http://127.0.0.1:5000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount: totalAmount * 100, // Convert dollars to cents
                }),
            });

            const paymentIntentResponse = await response.json();

            if (paymentIntentResponse && paymentIntentResponse.status === 400) {
                console.log('The payment response is:' + paymentIntentResponse);
                alert('Payment unsuccessful!');
            }
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await handleStripePayment();

        const formattedTotalAmount = parseFloat(totalAmount).toFixed(2);

        const cartItems = cartService.cartItems.map(item => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            imageUrl: item.imageUrl,
            name: item.name
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
            totalAmount: formattedTotalAmount,
            cartItems
        };

        try {
            // Attempt to submit the order
            const response = await submitOrder(orderData);
            console.log('the status is:' + response.status);
            if (response && response.status === 201) {
                alert('Order placed successfully!');
                cartService.clearCart();
                navigate('/');
            } else {
                alert(`Failed to place order: ${response.statusText || "Server error"}`);
            }
        } catch (error) {
            console.error('Error submitting order:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (


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
                <select
                    value={shippingState}
                    onChange={(e) => setShippingState(e.target.value)}
                >
                    <option value="">Select a state</option>
                    {states.map((state) => (
                        <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                    ))}
                </select>
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
                        <select
                            value={billingState}
                            onChange={(e) => setBillingState(e.target.value)}
                        >
                            <option value="">Select a state</option>
                            {states.map((state) => (
                                <option key={state.abbreviation} value={state.abbreviation}>{state.name}</option>
                            ))}
                        </select>
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
                <CardElement options={CARD_ELEMENT_OPTIONS} />
            </div>
            <button onClick={handleSubmit} style={{ marginTop: '20px' }}>Submit</button>

        </form>


    );
};

const Checkout = () => {
    return (
        <div>
            <h2>Checkout</h2>
            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default Checkout;
