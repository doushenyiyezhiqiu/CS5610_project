import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/ProductService'; // Adjust the import path as necessary

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

  // Placeholder content if product is not fetched yet
  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{product.name}</h2>
      <img src={product.image_url} alt={product.name} style={{ width: '200px', height: '200px' }} />
      <p>Description: {product.description}</p>
      <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
      {/* Add to Cart Button */}
      <button onClick={() => {/* Add to cart functionality */}}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
