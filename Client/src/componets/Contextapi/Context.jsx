import React, { createContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosInterceptorPage } from "../Interceptor/interceptor"; // Assuming this is your interceptor file
import axios from "axios";
import toast from "react-hot-toast";

// Environment variables automatically accessible through `process.env`
export const ContextApi = createContext();

export const Apiprovider = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosInstance = axiosInterceptorPage();

  const [otp, setOtp] = useState('');
  const [otpAllow, setOtpAllow] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isSignup, setSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [products, setProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState();
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [forgetEmail, setForgetEmail] = useState('');

  const [userAuth, setUserAuth] = useState(false);
  const [allCartData, setAllCartData] = useState([]);
  const [totalPrice, setTotalPrice] = useState();

  const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"

  const fetchCart = async () => {
    try {
      console.log("inside cart 1");
      const access = localStorage.getItem('accessToken');
      if (access) {
        const response = await axiosInstance.get(`${REACT_APP_API_DEFAULT}/api/user/cart`);
        setAllCartData(response.data.cartData.items);
        setTotalPrice(response.data.cartData.cartTotal);
        setCartLength(response.data.cartData.items.length);
        console.log("inside cart 2");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const access = localStorage.getItem('accessToken');
    if (access) {
      fetchCart();
      setUserAuth(true);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_DEFAULT}/api/user/product-data`);
      setProducts(response.data.products);
      console.log("Products fetched:", response.data.products);
      fetchCart();
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleResendOtp = async () => {
    setTimer(60);
    setOtp('');
    setOtpAllow(false);

    try {
      const response = await axios.post(`${REACT_APP_API_DEFAULT}/api/auth/resend-otp`, { email: formData.email || forgetEmail });
      console.log('OTP Resent:', response.data);
    } catch (error) {
      console.error('There was an error resending the OTP:', error);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      const response = await axiosInstance.post(`${REACT_APP_API_DEFAULT}/api/user/addToCart`, { productId, quantity });
      fetchCart();
      setAddedToCart(response.data);
      console.log('Product added to cart:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleOtpSubmit = async () => {
    if (otp) {
      try {
        const response = await axios.post(`${REACT_APP_API_DEFAULT}/api/auth/verify-otp`, { otp, isSignup, email: formData.email || forgetEmail });
        if (isSignup) {
          localStorage.setItem("accessToken", response.data.accessToken);
          navigate('/');
          toast.success('SignUp Successfully!', { position: 'top-center' });
        } else {
          navigate('/changepassword');
        }
        setUserAuth(true);
      } catch (error) {
        console.error('Error verifying OTP:', error);
      }
    }
  };

  return (
    <ContextApi.Provider value={{
      setShowOtpModal,
      otp,
      forgetEmail,
      handleOtpSubmit,
      formData,
      setFormData,
      setOtp,
      otpAllow,
      setOtpAllow,
      timer,
      setTimer,
      setForgetEmail,
      handleResendOtp,
      setUserAuth,
      userAuth,
      isSignup,
      setSignup,
      fetchProducts,
      products,
      handleAddToCart,
      addedToCart,
      allCartData,
      fetchCart,
      totalPrice,
      cartLength,
    }}>
      {children}
    </ContextApi.Provider>
  );
};
