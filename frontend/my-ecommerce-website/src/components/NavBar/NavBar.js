import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook
import './NavBar.css'; // Ensure you have this CSS file for styles
import { useState } from 'react';

// URLs for the images
const logoIconUrl = '/images/northeastern.png';
const cartIconUrl = '/images/cart.png'; 

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0(); // Destructure Auth0 hook
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        if (isAuthenticated) {
        navigate(`/search?query=${searchQuery}`);
        } else {
            alert('Please login!');
        }
    };

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/cart');
        } else {
            alert('Please login!');
        }
    };

    const handleOrderHistoryClick = () => {
        if (isAuthenticated) {
            navigate('/order-history');
        } else {
            alert('Please login!');
        }
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="navbar">
            <Link to="/">
                <img src={logoIconUrl} alt="Logo" className="navbar-logo" />
            </Link>
            
            <div className="navbar-search">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="navbar-links">
                {/* Conditionally render Login/Logout based on authentication status */}
                {isAuthenticated ? (
                    <button className='navbar-button' onClick={() => logout({ returnTo: window.location.origin })}>Logout</button>
                ) : (
                    <button className='navbar-button' onClick={() => loginWithRedirect()}>Login</button>
                )}
                <button className='navbar-button' onClick={handleOrderHistoryClick}>Order History</button>
                <img src={cartIconUrl} alt="Cart" className="navbar-cart" onClick={handleCartClick} />
            </div>
        </div>
    );
};

export default NavBar;
