import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Ensure you have this CSS file for styles

// URLs for the images
const logoIconUrl = 'https://drive.google.com/thumbnail?id=1hsrVM5O8WPF0WchNBpWeGGWC3P0-n_0l';
const cartIconUrl = 'https://drive.google.com/thumbnail?id=1kgR-0m4XJFay8ztIw_U4WAihakjBwsdw'; 

const NavBar = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = () => {
        // Navigate to a search page or handle the search differently
        navigate(`/search?query=${searchQuery}`);
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
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="navbar-links">
                {/* Order History as a button */}

                
                <button onClick={() => navigate('/order-history')}>Order History</button>
                
                {/* Cart as a clickable icon with Link */}
                <Link to="/cart">
                    <img src={cartIconUrl} alt="Cart" className="navbar-cart" />
                </Link>
            </div>
        </div>
    );
};

export default NavBar;
