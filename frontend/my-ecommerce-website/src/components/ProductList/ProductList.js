import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/ProductService';
import { cartService } from '../../services/CartService';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    const { isAuthenticated, loginWithRedirect, logout } = useAuth0(); 

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        if (isAuthenticated) {
        cartService.addToCart(product);
        } else {
            alert(`Please login!`);
        }
    };

    const handleViewDetails = (productId) => {
        if (isAuthenticated) {
        navigate(`/product/${productId}`);
        } else {
            alert(`Please login!`);
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: 0 }}>
            {products.map(product => (
                <div key={product.id} style={{
                    padding: '10px',
                    // Removed the border style here
                    width: 'calc(20% - 20px)',
                    boxSizing: 'border-box',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <img src={product.image_url} alt={product.name} style={{ width: '100px', height: '100px' }} />
                    <h3>{product.name}</h3>
                    <p>${parseFloat(product.price).toFixed(2)}</p> {/* Format price as dollars */}
                    <div>
                        <button onClick={() => handleViewDetails(product.id)}>Details</button>
                        <button onClick={() => handleAddToCart(product)} style={{ marginLeft: '10px' }}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
