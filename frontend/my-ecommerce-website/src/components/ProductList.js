import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductService';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    // Placeholder function for adding a product to the cart
    const addToCart = (product) => {
        console.log("Adding to cart:", product.name);
        // Implement your logic for adding the product to the cart
        alert(`Added ${product.name} to cart`);
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', margin: 0 }}>
            {products.map(product => (
                <div key={product.id} style={{ padding: '10px', border: '1px solid #ddd', width: 'calc(20% - 20px)', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    {/* Use img tag for displaying product images */}
                    <iframe src={product.image_url} alt={product.name} style={{ width: '100px', height: '100px' }} ></iframe>
                    <h3>{product.name}</h3>
                    <p>${parseFloat(product.price).toFixed(2)}</p> {/* Format price as dollars */}
                    <div>
                        <button onClick={() => alert(`Details for ${product.name}`)}>Details</button>
                        {/* Add to Cart button next to the Details button */}
                        <button onClick={() => addToCart(product)} style={{ marginLeft: '10px' }}>Add to Cart</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
