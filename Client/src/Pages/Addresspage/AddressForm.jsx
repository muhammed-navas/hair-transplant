import React, { useState, useEffect } from 'react';
import './AddressForm.scss';
import { MuiTelInput } from 'mui-tel-input';
import axios from 'axios';
import { axiosInterceptorPage } from '../../componets/Interceptor/interceptor';
import { Trophy } from 'lucide-react';

const RequiredAsterisk = () => <span className="required-asterisk">*</span>;

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="label">
    {children}
  </label>
);

const Input = ({ error, ...props }) => (
  <input className={`input ${error ? 'input-error' : ''}`} {...props} />
);

const Textarea = ({ error, ...props }) => (
  <textarea className={`textarea ${error ? 'input-error' : ''}`} {...props} />
);

const Button = ({ children, ...props }) => (
  <button className="button" {...props}>
    {children}
  </button>
);

const OtpModal = ({ onSubmit, onResend, isOpen, timer, otp, setOtp }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Verify Your Mobile Number</h2>
        <p>Please enter the 4-digit OTP sent to your phone</p>
        <input
          type="text"
          maxLength={4}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/, ''))} // Allow only numbers
          className="otp-input"
        />
        <div className="timer">Time left: {timer}s</div>
        <div className="modal-actions">
          <button 
            onClick={onResend} 
            className="resend-button" 
            style={{ visibility: timer === 0 ? 'visible' : 'hidden' }}>
            Resend OTP
          </button>
          <button 
            onClick={onSubmit} 
            className="submit-button" 
            style={{ visibility: timer > 0 ? 'visible' : 'hidden' }}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};



export const AddressForm = () => {

  const axiosInstance = axiosInterceptorPage();
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postcode: '',
    mobilePhone: '',
    landmark: ''
  });

  const [errors, setErrors] = useState({});
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(60);

  const handlePhoneChange = (newPhone) => {
    setFormData({ ...formData, mobilePhone: newPhone });
    setErrors({ ...errors, mobilePhone: newPhone ? '' : 'This field is required.' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    let error = value === '' ? 'This field is required.' : '';
    if (name === 'email') error = validateEmail(value);

    setErrors({ ...errors, [name]: error });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) ? '' : 'Please enter a valid email.';
  };

  const validateFormData = () => {
    const newErrors = {};
    for (const [key, value] of Object.entries(formData)) {
      if (value.trim() === '') {
        newErrors[key] = 'This field is required.';
      } else if (key === 'email') {
        newErrors[key] = validateEmail(value);
      } else {
        newErrors[key] = '';
      }
    }
    return newErrors;
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newErrors = validateFormData();
  
    // Log errors to verify their values
    console.log("Validation Errors:", newErrors);
  
    if (Object.values(newErrors).every((err) => err === '')) {
      try {
        console.log("Sending API request with data:", formData);
        const response = await axiosInstance.post('http://localhost:5000/api/user/add-address', formData);
        console.log("API response data:", response.data);
        setIsOtpModalOpen(true);
        startTimer();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    } else {
      console.log("Form validation failed, API call not triggered.");
    }
  };
  const startTimer = () => {
    setTimer(60); // Reset the timer to 60 seconds
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval); // Clear the interval when timer reaches 1
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleOtpSubmit = async () => {
    if (otp.length === 4) {

     try {
      const response = await axiosInstance.post('http://localhost:5000/api/user/verify-otp',{otp});
      console.log(response.data,"after otp submit response");
      console.log('OTP submitted:', otp);
      setIsOtpModalOpen(false);
      setOtp('')


      //rosorpay
     } catch (error) {
        console.log(error,"otp not sumbitted");
        
     }
    } else {
      alert('Please enter a valid 4-digit OTP');
    }
  };

  const handleResendOtp = async() => {
    try {
      console.log('Resending OTP...');
      startTimer();
      const response = await axiosInstance.post('http://localhost:5000/api/user/resend-otp');

      console.log('resented:', otp);

      setOtp('')



     } catch (error) {
        console.log(error,"otp not sumbitted");
        
     }
   // Reset timer when resend is clicked
  };

  return (
    <div className="main-billing">
      <div className="billing-address-form">
        <h2>Billing Address</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="form-group">
            <Label htmlFor="email">Email Address <RequiredAsterisk /></Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="firstName">First Name <RequiredAsterisk /></Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={errors.firstName}
              />
              {errors.firstName && <span className="error-text">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <Label htmlFor="lastName">Last Name <RequiredAsterisk /></Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={errors.lastName}
              />
              {errors.lastName && <span className="error-text">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <Label htmlFor="address">Address <RequiredAsterisk /></Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              rows={3}
            />
            {errors.address && <span className="error-text">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="city">City<RequiredAsterisk /></Label>
              <Input
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                error={errors.city}
              />
              {errors.city && <span className="error-text">{errors.city}</span>}
            </div>
            <div className="form-group">
              <Label htmlFor="postcode">Postcode<RequiredAsterisk /></Label>
              <Input
                id="postcode"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                error={errors.postcode}
              />
              {errors.postcode && <span className="error-text">{errors.postcode}</span>}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <Label htmlFor="mobilePhone">Mobile Phone<RequiredAsterisk /></Label>
              <MuiTelInput
                value={formData.mobilePhone}
                onChange={handlePhoneChange}
                defaultCountry="IN" 
              />
              {errors.mobilePhone && <span className="error-text">{errors.mobilePhone}</span>}
            </div>
            <div className="form-group">
              <Label htmlFor="landmark">Landmark<small>(Optional)</small></Label>
              <Input
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button type="submit">Save & Submit</Button>
        </form>
      </div>

      {/* OTP Modal */}
      <OtpModal
        isOpen={isOtpModalOpen}
        otp={otp}
        setOtp={setOtp}
        timer={timer}
        onResend={handleResendOtp}
        onSubmit={handleOtpSubmit}
      />
    </div>
  );
};
