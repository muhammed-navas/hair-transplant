import React, { useRef, useState, useEffect } from 'react';
import './allproduct.scss';
import { Section6 } from '../../componets/Section6/Section6';
import { Section7 } from '../../componets/Section7/2Section7';
import { ProductSection } from '../../componets/Section2-8/Section8';
import { ProductSection2 } from '../../componets/Section9/Section9';
import { IoIosArrowForward } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Section10 } from '../../componets/Section10/Section10';
import { Section11 } from '../../componets/section11/Section11';
import { Footer } from '../../componets/Footer/Footer';

export const Allproduct = () => {
  const insideRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const navigate = useNavigate();

  const handleStart = (e) => {
    setIsDown(true);
    const pageX = ('touches' in e) ? e.touches[0].pageX : e.pageX;
    setStartX(pageX - insideRef.current.offsetLeft);
    setScrollLeft(insideRef.current.scrollLeft);
  };

  const handleEnd = () => {
    setIsDown(false);
  };

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    setTimeout(() => {
      navigate('/goals');
    }, 400); // 400ms delay
  };

  const handleMove = (e) => {
    if (!isDown) return;
    const pageX = ('touches' in e) ? e.touches[0].pageX : e.pageX;
    const x = pageX - insideRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Adjust the multiplier as needed
    insideRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const insideElement = insideRef.current;

    if (window.innerWidth <= 534) {
      insideElement.addEventListener('mousedown', handleStart);
      insideElement.addEventListener('touchstart', handleStart);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchend', handleEnd);
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('touchmove', handleMove);

      return () => {
        insideElement.removeEventListener('mousedown', handleStart);
        insideElement.removeEventListener('touchstart', handleStart);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchend', handleEnd);
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('touchmove', handleMove);
      };
    }
  }, [isDown, startX, scrollLeft]);

  return (
    <div className='Allproduct-main'>
      <Section6/>

      <motion.div
        className='undder-hero'
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div 
          className='inside' 
          ref={insideRef} 
          style={{ cursor: isDown ? 'grabbing' : 'grab' }}
        >
          <p>All Hair</p>
          <p>Shampoo & Conditioner</p>
          <p>Hair Treatments</p>
          <p>Grooming</p>
        </div>
      </motion.div>

      <Section7/>

      <ProductSection/>
      <ProductSection2  />

      <motion.div
        className='first-main'
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className='section10-main'>
          <h1>See if treatment is right for me</h1>
          <div className='second-10'>
            <p>Hair loss treatment for a long term solution</p>
            <button onClick={handleLinkClick} className='button'>
              Get Started <IoIosArrowForward />
            </button>
          </div>
        </div>
      </motion.div>
      <Section10/>
      <Section11/>
      <Footer/>
    </div>
  );
}
