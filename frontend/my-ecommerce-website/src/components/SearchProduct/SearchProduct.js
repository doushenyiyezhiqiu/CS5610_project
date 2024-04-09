import React, { useState, useEffect } from 'react';
import { searchProducts } from '../../services/ProductService';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { cartService } from '../../services/CartService';
import '../ProductList/ProductList.css';

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

const SearchProduct = () => {
    const [products, setProducts] = useState([]);
    const query = useQuery().get('query');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await searchProducts(query);
            setProducts(fetchedProducts);
        };

        if (query) {
            fetchProducts();
        }
    }, [query]);

    const handleAddToCart = (product) => {
        cartService.addToCart(product);
        alert(`Added ${product.name} to cart`);
    };

    const handleViewDetails = (productId) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="product-grid">
            {products.map(product => (
                <div key={product.id} className="product-item">
                    <img src={product.image_url} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>${parseFloat(product.price).toFixed(2)}</p>
                    <div>
                        <button onClick={() => handleViewDetails(product.id)}>Details</button>
                        <button onClick={() => handleAddToCart(product)}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SearchProduct;
