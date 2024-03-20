import React from 'react';
import lap from './../pic.jpg'
const Card = ({ product }) => {
  return (
    <div className='card'>
      <img src={lap} alt="image" className='img'/>
      <h3>{product.product_name}</h3>
      <h3>Rating: {product.rating}*</h3>
      <h4> discount:{product.discount*100}%</h4>
      <p>{product.availability ? "In Stock" : "Out of Stock"}</p>
    </div>
  );
};

export default Card;
