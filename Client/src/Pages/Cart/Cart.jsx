import React, { useContext, useEffect, useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import './cart.scss';
import axios from 'axios';
import { ContextApi } from '../../componets/Contextapi/Context';
import { axiosInterceptorPage } from '../../componets/Interceptor/interceptor';
import { useNavigate } from 'react-router-dom';

const CartItem = ({ id, name, price, quantity, increaseCartItemQuantity, decreaseCartItemQuantity, onRemove }) => {
  const handleIncrease = () => {
    if (quantity < 5) {
      const newQuantity = quantity + 1;
      increaseCartItemQuantity(id, newQuantity);
    }
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      decreaseCartItemQuantity(id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <p className="cart-item__name">{name}</p>
      <div className="cart-item__quantity-control">
        <button onClick={handleDecrease} disabled={quantity === 1} className="cart-item__button">
          <Minus className="cart-item__icon" />
        </button>
        <span className="cart-item__quantity">{quantity}</span>
        <button onClick={handleIncrease} disabled={quantity === 5} className="cart-item__button">
          <Plus className="cart-item__icon" />
        </button>
      </div>
      <span className="cart-item__price">${price}</span>
      <button onClick={() => onRemove(id)} className="cart-item__button cart-item__button--remove">
        <Trash2 className="cart-item__icon" />
      </button>
    </div>
  );
};

export const CartPage = () => {
  const { allCartData, fetchCart ,totalprice} = useContext(ContextApi);
  const [items, setItems] = useState([]);
  const axiosInstance = axiosInterceptorPage();
 const naviagte = useNavigate()

    const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"

  useEffect(() => {
  

    
    if (allCartData) {
      const formattedItems = allCartData.map(item => ({
        id: item.product._id,
        name: item.product.name,
        price: item.itemTotal,
        quantity: item.quantity,
      }));
      setItems(formattedItems);
    }
  }, [allCartData]);

  const increaseCartItemQuantity = async (productId, newQuantity) => {
    try {
      await axiosInstance.patch(`${REACT_APP_API_DEFAULT}/api/user/increase-quantity`, 
        { productId, newQuantity },{withCredentials : true}
      );
      fetchCart();
    } catch (error) {
      console.error('Error increasing cart item quantity:', error);
    }
  };

  const decreaseCartItemQuantity = async (productId, newQuantity) => {
    try {
      await axiosInstance.patch(`${REACT_APP_API_DEFAULT}/api/user/decrease-quantity`, 
        { productId, newQuantity },{withCredentials : true}
      );
      fetchCart();
    } catch (error) {
      console.error('Error decreasing cart item quantity:', error);
    }
  };

  const handleRemove = async (productId) => {
    try {
      const response = await axiosInstance.delete(`${REACT_APP_API_DEFAULT}/api/user/remove-item`, {
        data: { productId },
      });
      console.log(response.data,"response data");
      
      fetchCart();
      console.log("called");
      
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handlechangenavigate = () =>{
    naviagte('/addressform')
  }

  const shippingFee = 40;

  return (
    <div className="cart-page">
      <div className="cart-container">
       

        {items.length === 0 ? (
          <p className="cart-empty-message">Your cart is empty</p>
        ) : (
          <>
          <h1 className="cart-title">Your Cart</h1> 
            <div className="cart-header">
              <span>Product Name</span>
              <span>Quantity</span>
              <span>Price</span>
              <span>Delete</span>
            </div>

            {items?.map(item => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                increaseCartItemQuantity={increaseCartItemQuantity}
                onRemove={handleRemove}
                decreaseCartItemQuantity={decreaseCartItemQuantity}
              />
            ))}

            <div className="cart-summary">
              <div className="cart-summary__row">
                <span>Shipping Fee:</span>
                <span>${shippingFee}</span>
              </div>
              <div className="cart-summary__row cart-summary__row--total">
                <span>Total:</span>
                <span>${totalprice + shippingFee }</span>
              </div>
            </div>
            <button onClick={handlechangenavigate} className="checkout-button">Checkout</button>
          </>
        )}
      </div>
    </div>
  );
};
