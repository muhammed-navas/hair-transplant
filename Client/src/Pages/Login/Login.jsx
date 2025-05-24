import React, { useContext, useState } from 'react';
import './login.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ContextApi } from '../../componets/Contextapi/Context';
import { toast, Toaster } from 'react-hot-toast';

export const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });
  const { setUserAuth, setSignup } = useContext(ContextApi);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: '',
      });
    }
  };

     const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"

  const validate = () => {
    let tempErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(loginData.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.post(`${REACT_APP_API_DEFAULT}/api/auth/login`, loginData, { withCredentials: true });
        console.log('Form Submitted:', response.data);
        const accessToken = response.data.accessToken;
        localStorage.setItem("accessToken", accessToken);
        setUserAuth(true);
        toast.success('Login Successful..!', {
          position: 'top-center',
        });
        navigate('/');
      } catch (error) {
        console.error('Error submitting form:', error);
        toast.error('Incorrect Email or Password.', {
          position: 'top-center',
        });
      }
    }
  };

  const handleNavigateToForgotPassword = () => {
    setSignup(false);
    navigate('/forgot');
  };

  return (
    <div className='outer-main'>
       {/* This will render the toast notifications */}
      <div className='form-main-div'>
        <h2>Login</h2>
        <div className='inside-form-div'>
          <div className='input'>
            <input
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className='input'>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={loginData.password}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            {errors.password && <span className="error">{errors.password}</span>}
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className='forget'>
            <small onClick={handleNavigateToForgotPassword}>Forget password?</small>
          </div>

          <button type="submit" onClick={handleSubmit}>
            Login
          </button>

          <p className="already-account">
            New to Treefoolix?<a href="/signup">Signup</a>
          </p>
        </div>
      </div>
    </div>
  );
};
