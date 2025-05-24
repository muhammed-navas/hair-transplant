import React, { useState } from 'react';
import './Section8.scss'; // Ensure you have this SCSS file

export const ProductSection = () => {
  const [selectedSizeShampoo, setSelectedSizeShampoo] = useState('100mL');
  const [selectedSizeConditioner, setSelectedSizeConditioner] = useState('100mL');
  const [cartStatus, setCartStatus] = useState({
    shampoo: false,
    conditioner: false,
  });

  const getPrice = (size) => {
    switch (size) {
      case '100mL':
        return '140';
      case '250mL':
        return '220';
      case '500mL':
        return '400';
      default:
        return '140';
    }
  };

  const handleAddToCart = (product) => {
    setCartStatus((prevStatus) => ({
      ...prevStatus,
      [product]: true,
    }));
  };

  return (
    <section className="product-section">
      <div className="product-info">
        <p className="recent-addition">Recent Addition</p>
        <h4 className="product-title">Shampoo and Conditioner</h4>
        <p className="product-description">
          Efficacious care from roots to ends: this pairing cleanses, refreshes, and nourishes to support a healthy scalp and strands.
        </p>
      </div>
    </section>
  );
};
