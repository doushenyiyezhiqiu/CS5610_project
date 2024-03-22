import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../../services/ProductService'; // Adjust the import path as necessary
import './ProductDetails.css';
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

  // handle add to cart button and add one product into cart
  const handleAddToCart = (product) => {
    cartService.addToCart(product);
    alert(`Added ${product.name} to cart`);
  };

  // Placeholder content if product is not fetched yet
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} style={{ width: '200px', height: '200px' }} />
      {/* Description with a frame using CSS class */}
      <div className="description-frame">
        <p>Description: {product.description}</p>
      </div>
      {/* Price with a different font using CSS class */}
      <p className="price">Price: ${parseFloat(product.price).toFixed(2)}</p>
      <button onClick={() => handleAddToCart(product)} style={{ marginLeft: '10px' }}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
