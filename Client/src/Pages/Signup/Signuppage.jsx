import React, { useState, useContext, useEffect } from 'react';
import './signuppage.scss';


import axios from 'axios';
import { ContextApi } from '../../componets/Contextapi/Context';
import { Modal } from '../../componets/Modal/Modal';
import toast from 'react-hot-toast';

export const SignUpPage = () => {
  const { setShowOtpModal, showOtpModal, timer, setTimer, formData, setFormData } = useContext(ContextApi);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);


  const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"


  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (formData.firstName.length < 3 || formData.firstName.length > 20) {
      tempErrors.firstName = 'First name must be between 3 and 20 characters';
    }

    if (!emailRegex.test(formData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (formData.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(`${REACT_APP_API_DEFAULT}/api/auth/signup`, formData);
        console.log('Form Submitted:', response.data);
        setShowOtpModal(true);
   
      } catch (error) {
        toast.error('This Email is Already in use', {
          position: 'top-center',
        });
        console.error('There was an error submitting the form:', error);
      }
    }
  };

  useEffect(() => {
    if (showOtpModal && timer > 0) {
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [showOtpModal, timer, setTimer]);

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            {errors.firstName && <span className="error">{errors.firstName}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && <span className="error">{errors.password}</span>}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
          </div>

          <button type="submit" className="submit-btn">Sign Up</button>
        </form>
        <p className="account-redirect">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
      {showOtpModal && <Modal/>}
    </div>
  );
};
