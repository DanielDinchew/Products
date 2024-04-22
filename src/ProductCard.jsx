import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} />
      <div className="product-details">
        <h2>{product.title}</h2>
        <p>Price: ${product.price}</p>
        <p>Rating: {product.rating.rate} ({product.rating.count} reviews)</p>
        <p>Description: {product.description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
