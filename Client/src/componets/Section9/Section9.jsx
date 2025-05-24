import React, { useState, useEffect, useContext } from 'react';
import './section9.scss';
import { Link } from 'react-router-dom';
import { ContextApi } from '../Contextapi/Context';

export const ProductSection2 = () => {
  const { fetchProducts, products, handleAddToCart, allCartData } = useContext(ContextApi);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Create a set of product IDs already in the cart for quick lookup
  const cartProductIds = new Set(allCartData.map(item => item.product._id));
    
  console.log(allCartData,"data");
  console.log(products,"products");
  

  const handleAddToCartClick = async (productId) => {
    await handleAddToCart(productId);
  };

  return (
    <div className="product-section-new">
      <h1>All Hair</h1>
      <div className="product-details">
        {products?.map((product) => (
          <div className="product-item" key={product._id}>
            <Link to={`/product/${product._id}`} className="product-image">
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-name">{product.name}</div>
            <div className="product-details-bottom">
              <p>{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button
                onClick={() => handleAddToCartClick(product._id)}
                className="add-to-cart-btn"
                disabled={cartProductIds.has(product._id)} // Disable button if item is added
              >
                {cartProductIds.has(product._id) ? 'Item Added' : 'Add To Your Cart'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
