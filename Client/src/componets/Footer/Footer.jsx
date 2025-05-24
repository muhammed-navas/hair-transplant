import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import './footer.scss';

export const Footer = () => {
  return (
    <div className="footer-container">
      <div className="subscribe-section">
        <h2>Subscribe to Aesop communications</h2>
        
        <div className="subscribe-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">
            <IoIosArrowForward />
          </button>
        </div>
        <div className="subscribe-info">
         
          <label htmlFor="subscribe">
            Subscribe to receive communications from Aesop. By subscribing, you confirm you have read and understood our privacy policy.
          </label>
       
        </div>
       
      </div>
      <div className="footer-sections">
        <div className="footer-section">
          <h3>Orders and support</h3>
          <hr />
          <ul>
            <li>Contact us</li>
            <li>FAQs</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>Order history</li>
            <li>Check gift card balance</li>
            <li>Terms and conditions</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Services</h3>
          <hr />
          <ul>
            <li>Live assistance</li>
            <li>Corporate gifts</li>
            <li>Facial Appointments</li>
            <li>Click and Collect</li>
            <li>Video consultation</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Location preferences</h3>
          <hr />
          <ul>
            <li>Shipping: Hong Kong, SAR</li>
            <li>Language: 繁體中文</li>
            <li>English</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Sustainability</h3>
          <hr />
          <ul>
            <li className='con'>All Aesop products are vegan, and we do not test our formulations or ingredients on animals. We are Leaping Bunny approved and a Certified B Corporation. <a href="#">Learn more</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>About</h3>
          <hr />
          <ul>
            <li>Our story</li>
            <li>Foundation</li>
            <li>Careers</li>
            <li>Privacy policy</li>
            <li>Accessibility</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Social media</h3>
          <hr />
          <ul>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
            <li>WeChat</li>
            <li>Weibo</li>
          </ul>
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <div className="footer-logo">Hair Cycles</div>
      </div>
    </div>
  );
};


