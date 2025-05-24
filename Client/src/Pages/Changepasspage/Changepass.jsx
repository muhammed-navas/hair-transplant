import React, { useContext, useState } from 'react';
import './changepass.scss';
import { ContextApi } from '../../componets/Contextapi/Context';
import axios from 'axios';

export const Changepass = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { setShowOtpModal, showOtpModal, forgetemail, setforgetsetEmail,timer, setTimer, formData, setFormData } = useContext(ContextApi);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError('');
    console.log(forgetemail,"inside changepass");
    
       const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"
    
    try {
        console.log(forgetemail,password,"inside changepass");
       
        const response = await axios.post(`${REACT_APP_API_DEFAULT}/api/auth/change-password`,{forgetemail, password},{withCredentials:true});
           console.log(response.data,"data is here");
           
           console.log('Password changed successfully');

      } catch (error) {

        console.error('There was an error resending the OTP:', error);

      }

    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="changepass-container">
      <form onSubmit={handleSubmit}>
        <h2>Change Password</h2>
        
        <label htmlFor="password">Enter your new password</label> 
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="toggle-password-btn"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <label htmlFor="confirmPassword">Confirm your new password</label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
