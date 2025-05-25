import React, { useContext, useEffect, useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import './cart.scss';
import axios from 'axios';
import { ContextApi } from '../../componets/Contextapi/Context';
import { axiosInterceptorPage } from '../../componets/Interceptor/interceptor';
import { useNavigate } from 'react-router-dom';

const CartItem = ({
  id,
  name,
  price,
  img,
  quantity,
  stock,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  onRemove,
}) => {
  const [disableButtons, setDisableButtons] = useState(false);
  const [disableButtons1, setDisableButtons1] = useState(false);

  const handleIncrease = () => {
    if (quantity < stock) {
      const newQuantity = quantity + 1;
      increaseCartItemQuantity(id, newQuantity);
      setDisableButtons(true);
    }
  };

  const handleDecrease = () => {
    console.log(quantity,'---')
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      decreaseCartItemQuantity(id, newQuantity);
      setDisableButtons1(true);
    }else{
      onRemove(id)

    }
    
  };

  // Auto-enable buttons after 1 second
  useEffect(() => {
    if (disableButtons || disableButtons1) {
      const timer = setTimeout(() => {
        setDisableButtons(false);
        setDisableButtons1(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [disableButtons, disableButtons1]);

  return (
    <div className="cart-item">
      <img
        style={{
          width: "80px",
          height: "60px",
          objectFit: "contain",
          marginRight: "10px",
        }}
        src={img}
        alt={name}
      />
      <p className="cart-item__name">{name}</p>
      <div className="cart-item__quantity-control">
        <button
          onClick={handleDecrease}
          disabled={disableButtons1 || quantity <= 0}
          className="cart-item__button"
        >
          <Minus className="cart-item__icon" />
        </button>
        <span className="cart-item__quantity">{quantity}</span>
        <button
          onClick={handleIncrease}
          disabled={disableButtons || quantity >= stock}
          className="cart-item__button"
        >
          <Plus className="cart-item__icon" />
        </button>
      </div>
      <span className="cart-item__price">${price}</span>
      <button
        onClick={() => onRemove(id)}
        className="cart-item__button cart-item__button--remove"
      >
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

    // const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"
      const REACT_APP_API_DEFAULT = "http://localhost:5000";

  useEffect(() => {
  
    if (allCartData) {
      const formattedItems = allCartData.map(item => ({
        id: item.product._id,
        name: item.product.name,
        image:item.image,
        stock:item.stock,
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
      fetchCart()
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
                img={item.image}
                stock={item.stock}
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
