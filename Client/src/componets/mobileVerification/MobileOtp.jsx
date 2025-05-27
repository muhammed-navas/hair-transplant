import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../../config/firebase.js";

// import "./FirebaseOTPVerification.scss";

const FirebaseOTPVerification = ({
  onVerificationSuccess,
  onVerificationError,
  buttonText = "SEND OTP",
  verifyButtonText = "VERIFY OTP",
  placeholder = "Enter mobile number",
  countryCode = "+91",
  className = "",
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [isVerified, setIsVerified] = useState(false);

  // OTP Timer
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((timer) => timer - 1);
      }, 1000);
    } else if (otpTimer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Initialize reCAPTCHA
  useEffect(() => {
    const initRecaptcha = () => {
      if (!window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier = new RecaptchaVerifier(
            auth,
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                console.log("reCAPTCHA solved");
              },
              "expired-callback": () => {
                console.log("reCAPTCHA expired");
                setError("reCAPTCHA expired. Please try again.");
              },
            }
          );
        } catch (error) {
          console.error("Error initializing reCAPTCHA:", error);
          setError(
            "Failed to initialize verification. Please refresh the page."
          );
        }
      }
    };

    initRecaptcha();

    // Cleanup on unmount
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
      }
    };
  }, []);

  const validatePhoneNumber = (phone) => {
    // For Indian numbers: should be 10 digits starting with 6-9
    const indianPhoneRegex = /^[6-9]\d{9}$/;
    return indianPhoneRegex.test(phone);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setPhoneNumber(value);
      if (error && error.includes("phone")) {
        setError("");
      }
    }
  };

  const handleOtpChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 6) {
      setOtp(value);
      if (error && error.includes("OTP")) {
        setError("");
      }
    }
  };

  const handleSendOtp = async () => {
    setError("");
    setLoading(true);

    if (!validatePhoneNumber(phoneNumber)) {
      setError("Please enter a valid 10-digit mobile number");
      setLoading(false);
      return;
    }

    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const appVerifier = window.recaptchaVerifier;

      if (!appVerifier) {
        throw new Error("reCAPTCHA not initialized");
      }

      const confirmation = await signInWithPhoneNumber(
        auth,
        fullPhoneNumber,
        appVerifier
      );

      setConfirmationResult(confirmation);
      setOtpSent(true);
      setOtpTimer(30);
      console.log("OTP sent successfully");
    } catch (err) {
      console.error("Error sending OTP:", err);
      setError(`Failed to send OTP: ${err.message}`);

      // Reset reCAPTCHA on error
      if (window.recaptchaVerifier) {
        try {
          window.recaptchaVerifier.render().then(function (widgetId) {
            if (window.grecaptcha) {
              window.grecaptcha.reset(widgetId);
            }
          });
        } catch (recaptchaError) {
          console.error("Error resetting reCAPTCHA:", recaptchaError);
        }
      }

      if (onVerificationError) {
        onVerificationError(err.message);
      }
    }

    setLoading(false);
  };

  const handleVerifyOtp = async () => {
    setError("");
    setLoading(true);

    if (!otp || otp.length !== 6) {
      setError("Please enter a valid 6-digit OTP");
      setLoading(false);
      return;
    }

    try {
      if (!confirmationResult) {
        throw new Error("Please send OTP first");
      }

      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Get Firebase ID token
      const idToken = await user.getIdToken();

      setIsVerified(true);
      console.log("OTP verified successfully", user);

      // Call success callback with user data and token
      if (onVerificationSuccess) {
        onVerificationSuccess({
          user: user,
          phoneNumber: user.phoneNumber,
          uid: user.uid,
          idToken: idToken,
        });
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      setError(`Invalid OTP: ${err.message}`);

      if (onVerificationError) {
        onVerificationError(err.message);
      }
    }

    setLoading(false);
  };

  const handleResendOtp = () => {
    setOtp("");
    setError("");
    setOtpTimer(30);
    handleSendOtp();
  };

  const resetVerification = () => {
    setPhoneNumber("");
    setOtp("");
    setConfirmationResult(null);
    setError("");
    setOtpSent(false);
    setOtpTimer(0);
    setIsVerified(false);
    setLoading(false);
  };

  if (isVerified) {
    return (
      <div className={`firebase-otp-container ${className}`}>
        <div className="verification-success">
          <span className="success-icon">✅</span>
          <p>Mobile number verified successfully!</p>
          <p className="verified-number">
            {countryCode}
            {phoneNumber}
          </p>
          <button
            className="change-number-btn"
            onClick={resetVerification}
            type="button"
          >
            Change Number
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`firebase-otp-container ${className}`}>
      {!otpSent ? (
        <div className="phone-input-section">
          <div className="form-group">
            <label htmlFor="phoneNumber">Mobile Number</label>
            <div className="mobile-input-group">
              <span className="country-code">{countryCode}</span>
              <input
                type="tel"
                id="phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder={placeholder}
                className={error && error.includes("phone") ? "error" : ""}
                maxLength="10"
                disabled={loading}
              />
              <button
                type="button"
                className="send-otp-btn"
                onClick={handleSendOtp}
                disabled={!phoneNumber || loading || phoneNumber.length < 10}
              >
                {loading ? "Sending..." : buttonText}
              </button>
            </div>
            {error && error.includes("phone") && (
              <span className="error-text">{error}</span>
            )}
          </div>
        </div>
      ) : (
        <div className="otp-input-section">
          <div className="form-group">
            <label htmlFor="otp">Enter OTP</label>
            <div className="otp-input-group">
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                className={error && error.includes("OTP") ? "error" : ""}
                maxLength="6"
                disabled={loading}
              />
              <button
                type="button"
                className="verify-otp-btn"
                onClick={handleVerifyOtp}
                disabled={!otp || otp.length < 6 || loading}
              >
                {loading ? "Verifying..." : verifyButtonText}
              </button>
            </div>
            {error && error.includes("OTP") && (
              <span className="error-text">{error}</span>
            )}
          </div>

          <div className="otp-info">
            <p>
              OTP sent to {countryCode}
              {phoneNumber}
            </p>
            {otpTimer > 0 ? (
              <p className="timer">Resend OTP in {otpTimer}s</p>
            ) : (
              <button
                type="button"
                className="resend-otp-btn"
                onClick={handleResendOtp}
                disabled={loading}
              >
                Resend OTP
              </button>
            )}
            <button
              type="button"
              className="change-number-btn"
              onClick={resetVerification}
            >
              Change Number
            </button>
          </div>
        </div>
      )}

      {error && !error.includes("phone") && !error.includes("OTP") && (
        <div className="error-text general-error">{error}</div>
      )}

      {/* reCAPTCHA container */}
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default FirebaseOTPVerification;
