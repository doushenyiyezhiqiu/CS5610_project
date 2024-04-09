import React, { useState, useEffect } from 'react';
import { getProducts } from '../../services/ProductService';
import { useNavigate } from 'react-router-dom';
import './ProductList.css';
import { cartService } from '../../services/CartService';
import { useAuth0 } from '@auth0/auth0-react'; // Import useAuth0 hook

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);

    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };

        fetchProducts();
    }, []);

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const totalPages = Math.ceil(products.length / productsPerPage);

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
        <div>
            <div className="product-grid">
                {currentProducts.map(product => (
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
            <div className="pagination">
                <span onClick={() => paginate(Math.max(1, currentPage - 1))}>&laquo; Previous</span>
                {[...Array(totalPages).keys()].map(number => (
                    <a key={number + 1} onClick={() => paginate(number + 1)} className={currentPage === number + 1 ? 'active' : ''}>
                        {number + 1}
                    </a>
                ))}
                <span onClick={() => paginate(Math.min(totalPages, currentPage + 1))}>Next &raquo;</span>
            </div>
        </div>
    );
};

export default ProductList;
