import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/ProductService';
import './ProductDetails.css'; // Make sure the CSS file is imported
import { cartService } from '../../services/CartService';

const ProductDetails = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await getProductById(productId);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = (product) => {
    cartService.addToCart(product);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-container">
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} className="product-image" />
      <div className="description-frame">
        <p>Description: {product.description}</p>
      </div>
      <p className="price">Price: ${parseFloat(product.price).toFixed(2)}</p>
      <button onClick={() => handleAddToCart(product)} className="add-to-cart-btn">Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
