import React, { useState, useEffect, useRef } from "react";
import "./checkout.scss";
import FirebaseOTPVerification from '../../componets/mobileVerification/MobileOtp'
import { auth } from "../../config/firebase";

const CheckoutPage = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    // otp: "",
    address: "",
    email: "",
    paymentMethod: "",
    upiId: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    selectedBank: "",
  });

  const [errors, setErrors] = useState({});
  const [currentStep, setCurrentStep] = useState(1);
  const [mobileVerified, setMobileVerified] = useState(false);
//   const [otpSent, setOtpSent] = useState(false);
//   const [otpVerified, setOtpVerified] = useState(false);
  const [addressSaved, setAddressSaved] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
    const [userFirebaseData, setUserFirebaseData] = useState(null);

  // OTP Timer
//   useEffect(() => {
//     let interval = null;
//     if (otpTimer > 0) {
//       interval = setInterval(() => {
//         setOtpTimer((timer) => timer - 1);
//       }, 1000);
//     } else if (otpTimer === 0) {
//       clearInterval(interval);
//     }
//     return () => clearInterval(interval);
//   }, [otpTimer]);

//   const validateMobile = () => {
//     const newErrors = {};
//     if (!formData.mobile) {
//       newErrors.mobile = "Mobile number is required";
//     } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
//       newErrors.mobile = "Please enter a valid 10-digit mobile number";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const validateOTP = () => {
//     const newErrors = {};
//     if (!formData.otp) {
//       newErrors.otp = "OTP is required";
//     } else if (!/^\d{6}$/.test(formData.otp)) {
//       newErrors.otp = "Please enter a valid 6-digit OTP";
//     }
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

const recaptchaVerifierRef = useRef(null);

useEffect(() => {
  const initializeRecaptcha = async () => {
    try {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }

      const { RecaptchaVerifier } = await import("firebase/auth");

      recaptchaVerifierRef.current = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "normal",
          callback: (response) => {
            console.log("reCAPTCHA solved:", response);
          },
          "expired-callback": () => {
            console.log("reCAPTCHA expired");
          },
        },
        auth
      );

      await recaptchaVerifierRef.current.render();
      console.log("reCAPTCHA initialized successfully");
    } catch (error) {
      console.error("Error initializing reCAPTCHA:", error);
      setErrors({
        mobile: "Failed to initialize verification. Please refresh the page.",
      });
    }
  };

  if (currentStep === 1 && !mobileVerified) {
    initializeRecaptcha();
  }

  return () => {
    try {
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.clear();
      }
    } catch (err) {
      console.warn("reCAPTCHA cleanup error:", err.message);
    } finally {
      recaptchaVerifierRef.current = null;
    }
  };
}, [currentStep, mobileVerified]);


const validateAddress = () => {
  const newErrors = {};
  if (!formData.address) {
    newErrors.address = "Delivery address is required";
  } else if (formData.address.length < 10) {
    newErrors.address = "Please enter a complete address";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const validateEmail = () => {
  const newErrors = {};
  if (!formData.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = "Please enter a valid email";
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));

  // Clear error when user starts typing
  if (errors[name]) {
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  }
};

//   const handleSendOTP = () => {
//     if (validateMobile()) {
//       setOtpSent(true);
//       setOtpTimer(30);
//       // Simulate OTP sending
//       console.log("OTP sent to:", formData.mobile);
//     }
//   };

//   const handleVerifyOTP = () => {
//     if (validateOTP()) {
//       // Simulate OTP verification (in real app, verify with backend)
//       if (formData.otp === "123456") {
//         setOtpVerified(true);
//         setMobileVerified(true);
//         setCurrentStep(2);
//       } else {
//         setErrors({ otp: "Invalid OTP. Please try again." });
//       }
//     }
//   };


const handleMobileVerificationSuccess = (verificationData) => {
  console.log("Mobile verification successful:", verificationData);

  // Store user data from Firebase
  setUserFirebaseData(verificationData);

  // Extract phone number (remove country code for display)
  const phoneNumber = verificationData.phoneNumber.replace("+91", "");
  setFormData((prev) => ({
    ...prev,
    mobile: phoneNumber,
  }));

  // Store Firebase ID token for API calls
  if (verificationData.idToken) {
    localStorage.setItem("firebaseIdToken", verificationData.idToken);
  }

  setMobileVerified(true);
  setCurrentStep(2);
  setErrors({});
};

const handleMobileVerificationError = (error) => {
  console.error("Mobile verification failed:", error);
  setErrors({ mobile: error });
};

const handleSaveAddress = () => {
  if (validateAddress()) {
    setAddressSaved(true);
    setCurrentStep(3);
  }
};

const handleContinueToPayment = () => {
  if (validateEmail()) {
    setCurrentStep(4);
  }
};

const handlePayment = () => {
  if (!formData.paymentMethod) {
    setErrors({ payment: "Please select a payment method" });
    return;
  }

  // Here you can use the Firebase ID token for payment processing
  const firebaseToken = localStorage.getItem("firebaseIdToken");
  console.log("Processing payment with Firebase token:", firebaseToken);

  alert("Order placed successfully!");
};

const handleEditStep = (step) => {
    setCurrentStep(step);
    if (step === 1) {
      // If user wants to change mobile number, reset verification
      setMobileVerified(false);
      setUserFirebaseData(null);
      localStorage.removeItem("firebaseIdToken");
      
      // Clear any existing reCAPTCHA
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
      
      // Reset errors
      setErrors({});
    }
  };

  const banks = [
    { id: "sbi", name: "State Bank of India", icon: "🏦" },
    { id: "hdfc", name: "HDFC Bank", icon: "🏦" },
    { id: "icici", name: "ICICI Bank", icon: "🏦" },
    { id: "kotak", name: "Kotak Mahindra Bank", icon: "🏦" },
    { id: "axis", name: "Axis Bank", icon: "🏦" },
    { id: "federal", name: "Federal Bank", icon: "🏦" },
    { id: "indian", name: "Indian Overseas Bank", icon: "🏦" },
    { id: "indianbank", name: "Indian Bank", icon: "🏦" },
  ];

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-main">
          {/* Step 1: Mobile Login */}
          <div className={`checkout-step ${currentStep >= 1 ? "active" : ""}`}>
            <div className="step-header">
              <span className="step-number">1</span>
              <h3>
                LOGIN
                {mobileVerified && (
                  <span className="status-icon success">✅</span>
                )}
                {!mobileVerified && currentStep > 1 && (
                  <span className="status-icon error">❌</span>
                )}
              </h3>
              {mobileVerified && currentStep > 1 && (
                <button
                  className="change-btn"
                  onClick={() => handleEditStep(1)}
                >
                  CHANGE
                </button>
              )}
            </div>

            {currentStep === 1 && !mobileVerified && (
              <div className="step-content">
                <FirebaseOTPVerification
                  onVerificationSuccess={handleMobileVerificationSuccess}
                  onVerificationError={handleMobileVerificationError}
                  buttonText="SEND OTP"
                  verifyButtonText="VERIFY"
                  placeholder="Enter mobile number"
                  countryCode="+91"
                  className="checkout-otp"
                />

                {/* Add reCAPTCHA container */}
                <div
                  id="recaptcha-container"
                  className="recaptcha-container"
                ></div>

                {errors.mobile && (
                  <span className="error-text">{errors.mobile}</span>
                )}
              </div>
            )}

            {mobileVerified && currentStep > 1 && (
              <div className="step-summary">
                <p>
                  <strong>Mobile:</strong> +91{formData.mobile} ✅ Verified
                </p>
                {userFirebaseData && (
                  <p className="user-uid">
                    <small>User ID: {userFirebaseData.uid}</small>
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Step 2: Delivery Address */}
          {mobileVerified && (
            <div
              className={`checkout-step ${currentStep >= 2 ? "active" : ""}`}
            >
              <div className="step-header">
                <span className="step-number">2</span>
                <h3>
                  DELIVERY ADDRESS
                  {addressSaved && (
                    <span className="status-icon success">✅</span>
                  )}
                  {!addressSaved && currentStep > 2 && (
                    <span className="status-icon error">❌</span>
                  )}
                </h3>
                {addressSaved && currentStep > 2 && (
                  <button
                    className="change-btn"
                    onClick={() => handleEditStep(2)}
                  >
                    CHANGE
                  </button>
                )}
              </div>

              {currentStep === 2 && (
                <div className="step-content">
                  <div className="form-group">
                    <label>Delivery Address</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete delivery address including house number, street, area, city, state, and pincode"
                      className={errors.address ? "error" : ""}
                      rows="4"
                    />
                    {errors.address && (
                      <span className="error-text">{errors.address}</span>
                    )}
                  </div>

                  <button
                    className="continue-btn"
                    onClick={handleSaveAddress}
                    disabled={!formData.address}
                  >
                    SAVE ADDRESS & CONTINUE
                  </button>
                </div>
              )}

              {addressSaved && currentStep > 2 && (
                <div className="step-summary">
                  <p>
                    <strong>Address:</strong> {formData.address}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Order Summary */}
          {addressSaved && (
            <div
              className={`checkout-step ${currentStep >= 3 ? "active" : ""}`}
            >
              <div className="step-header">
                <span className="step-number">3</span>
                <h3>ORDER SUMMARY</h3>
                {currentStep > 3 && (
                  <button
                    className="change-btn"
                    onClick={() => handleEditStep(3)}
                  >
                    CHANGE
                  </button>
                )}
              </div>

              {currentStep >= 3 && (
                <div className="step-content">
                  <div className="product-item">
                    <img
                      src="https://t3.ftcdn.net/jpg/12/02/16/42/240_F_1202164288_nhKn2VYmVHiX9FBhxyItKpUt8lfO3Ufw.jpg"
                      alt="ZEBRONICS ZEB-ASTRA"
                      className="product-image"
                    />
                    <div className="product-details">
                      <h4>ZEBRONICS ZEB-ASTRA 40/ZEB-PSPK 44 20 W Blue...</h4>
                      <p className="product-variant">Black, Stereo Channel</p>
                      <p className="seller">Seller: SVPeripherals</p>
                      <div className="price-section">
                        <span className="current-price">₹999</span>
                        <span className="original-price">₹2,199</span>
                        <span className="discount">54% Off</span>
                        <span className="offers">2 offers available</span>
                      </div>
                      <p className="protect-fee">+ ₹9 Protect Promise Fee</p>
                    </div>
                    <div className="quantity-controls">
                      <button className="qty-btn">-</button>
                      <span className="qty">1</span>
                      <button className="qty-btn">+</button>
                      <button className="remove-btn">REMOVE</button>
                    </div>
                  </div>

                  <div className="delivery-options">
                    <div className="delivery-option">
                      <input type="radio" name="delivery" id="delivery1" />
                      <label htmlFor="delivery1">
                        Delivery by Tomorrow, Wed | ₹40 Free
                      </label>
                    </div>
                    <div className="delivery-option">
                      <input
                        type="radio"
                        name="delivery"
                        id="delivery2"
                        defaultChecked
                      />
                      <label htmlFor="delivery2">
                        Delivery by Tomorrow, Wed | ₹70 Free
                      </label>
                    </div>
                    <div className="delivery-info">
                      <span className="info-icon">📦</span>
                      <p>
                        Open Box Delivery is eligible for this item. You will
                        receive a confirmation post payment.
                      </p>
                      <a href="#" className="know-more">
                        Know More
                      </a>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Order confirmation email will be sent to</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email ID"
                      className={errors.email ? "error" : ""}
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>

                  {currentStep === 3 && (
                    <button
                      className="continue-btn"
                      onClick={handleContinueToPayment}
                    >
                      CONTINUE TO PAYMENT
                    </button>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Payment Options */}
          {currentStep >= 4 && (
            <div className="checkout-step active">
              <div className="step-header">
                <span className="step-number">4</span>
                <h3>PAYMENT OPTIONS</h3>
              </div>

              <div className="step-content">
                <div className="payment-timer">
                  <span className="timer-icon">⏰</span>
                  <span>Complete payment in 00:13:00</span>
                </div>

                <div className="payment-methods">
                  {/* UPI */}
                  <div className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      id="upi"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="upi" className="payment-label">
                      <span className="payment-icon">💳</span>
                      UPI
                    </label>
                    {formData.paymentMethod === "upi" && (
                      <div className="payment-details">
                        <p>Choose an option</p>
                        <div className="upi-options">
                          <input
                            type="radio"
                            name="upiOption"
                            id="upiId"
                            defaultChecked
                          />
                          <label htmlFor="upiId">Your UPI ID</label>
                        </div>
                        <input
                          type="text"
                          name="upiId"
                          value={formData.upiId}
                          onChange={handleInputChange}
                          placeholder="Enter UPI ID"
                          className="upi-input"
                        />
                        <div className="payment-actions">
                          <button className="verify-btn">VERIFY</button>
                          <button className="pay-btn" onClick={handlePayment}>
                            PAY ₹1,008
                          </button>
                        </div>
                        <p className="upi-app-link">Pay by any UPI app</p>
                      </div>
                    )}
                  </div>

                  {/* Credit/Debit Card */}
                  <div className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      id="card"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="card" className="payment-label">
                      Credit / Debit / ATM Card
                    </label>
                    {formData.paymentMethod === "card" && (
                      <div className="payment-details">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="Enter Card Number"
                          className="card-input"
                        />
                        <div className="card-row">
                          <select
                            name="expiryMonth"
                            value={formData.expiryMonth}
                            onChange={handleInputChange}
                            className="expiry-select"
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {String(i + 1).padStart(2, "0")}
                              </option>
                            ))}
                          </select>
                          <select
                            name="expiryYear"
                            value={formData.expiryYear}
                            onChange={handleInputChange}
                            className="expiry-select"
                          >
                            <option value="">YY</option>
                            {Array.from({ length: 10 }, (_, i) => (
                              <option key={i} value={24 + i}>
                                {24 + i}
                              </option>
                            ))}
                          </select>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="CVV"
                            className="cvv-input"
                            maxLength="3"
                          />
                        </div>
                        <button className="pay-btn" onClick={handlePayment}>
                          PAY ₹1,008
                        </button>
                        <p className="security-note">
                          Add and secure cards as per RBI guidelines
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Net Banking */}
                  <div className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="netbanking"
                      id="netbanking"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="netbanking" className="payment-label">
                      Net Banking
                    </label>
                    {formData.paymentMethod === "netbanking" && (
                      <div className="payment-details">
                        <h4>Popular Banks</h4>
                        <div className="banks-grid">
                          {banks.map((bank) => (
                            <div key={bank.id} className="bank-option">
                              <input
                                type="radio"
                                name="selectedBank"
                                value={bank.id}
                                id={bank.id}
                                onChange={handleInputChange}
                              />
                              <label htmlFor={bank.id}>
                                <span className="bank-icon">{bank.icon}</span>
                                {bank.name}
                              </label>
                            </div>
                          ))}
                        </div>
                        <div className="other-banks">
                          <h4>Other Banks</h4>
                          <select
                            name="selectedBank"
                            value={formData.selectedBank}
                            onChange={handleInputChange}
                            className="bank-select"
                          >
                            <option value="">---Select Bank---</option>
                            <option value="other1">Bank of Baroda</option>
                            <option value="other2">Punjab National Bank</option>
                            <option value="other3">Canara Bank</option>
                          </select>
                        </div>
                        <button className="pay-btn" onClick={handlePayment}>
                          PAY ₹1,008
                        </button>
                        <p className="security-note">
                          This instrument has low success, use UPI or cards for
                          better experience
                        </p>
                      </div>
                    )}
                  </div>

                  {/* EMI */}
                  <div className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="emi"
                      id="emi"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="emi" className="payment-label">
                      EMI (Easy Installments)
                    </label>
                    {formData.paymentMethod === "emi" && (
                      <div className="payment-details">
                        <div className="emi-warning">
                          <span className="warning-icon">⚠️</span>
                          <p>
                            Pay in easy monthly installments from any of the
                            options below. <a href="#">Terms and Conditions</a>
                          </p>
                        </div>
                        <div className="emi-options">
                          <div className="emi-option">
                            <span>+ CREDIT CARD EMI</span>
                          </div>
                          <div className="emi-option">
                            <span>+ NO COST EMI</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Cash on Delivery */}
                  <div className="payment-method">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      id="cod"
                      onChange={handleInputChange}
                    />
                    <label htmlFor="cod" className="payment-label">
                      Cash on Delivery
                    </label>
                  </div>
                </div>

                {errors.payment && (
                  <span className="error-text">{errors.payment}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price Details Sidebar */}
        <div className="price-sidebar">
          <div className="price-card">
            <h3>PRICE DETAILS</h3>
            <div className="price-row">
              <span>Price (1 item)</span>
              <span>₹999</span>
            </div>
            <div className="price-row">
              <span>Delivery Charges</span>
              <span className="free">₹70 FREE</span>
            </div>
            <div className="price-row">
              <span>Protect Promise Fee</span>
              <span>₹9</span>
            </div>
            <hr />
            <div className="price-row total">
              <span>Total Payable</span>
              <span>₹1,008</span>
            </div>
            <div className="savings">
              Your Total Savings on this order ₹1,191
            </div>
          </div>

          <div className="offers-card">
            <div className="offer-item">
              <span className="offer-icon">💳</span>
              <div>
                <p>
                  No Cost EMI on Bajaj Finserv EMI Card on Cart value above
                  ₹2999
                </p>
              </div>
            </div>
            <div className="offer-item">
              <span className="offer-icon">💰</span>
              <div>
                <p>5% Unlimited Cashback on Flipkart Axis Bank Credit Card</p>
              </div>
            </div>
          </div>

          <div className="security-info">
            <span className="security-icon">✅</span>
            <div>
              <p>Safe and Secure Payments. Easy returns.</p>
              <p>100% Authentic products.</p>
            </div>
          </div>

          <div className="terms">
            <p>
              By continuing with the order, you confirm that you are above 18
              years of age, and you agree to the Flipkart's{" "}
              <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
