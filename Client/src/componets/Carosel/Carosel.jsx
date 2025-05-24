import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carosel.scss';
import { FaChevronCircleRight } from "react-icons/fa";
import { FaChevronCircleLeft } from "react-icons/fa";

export const Carosel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  
  const images = [
    'https://www.aesop.com/u1nb1km7t5q7/7qXqWN3EwPQ9EpSd9W646j/8b0519155e0e83ed8c4ed20557bb0a83/Aesop_Hand_Resurrection_Aromatique_Hand_Wash_500mL_Web_Front_Large_900x1115px.png',
    'https://www.aesop.com/u1nb1km7t5q7/2chDFmrby2y0qyfiU8PrMU/1724240956ce99cc270a8d85478b94cd/Aesop_Hand_Resurrection_Aromatique_Hand_Balm_75mL_Web_Front_1_Large_900x1068px.png',
    'https://www.aesop.com/u1nb1km7t5q7/2B5x7bOOySKaMwBT0ry3na/891af07543ae0a52b5bc15290146e3e5/Aesop_Hand_Reverence_Aromatique_Hand_Balm_75mL_Web_Front_1_Large_900x1068px.png'
  ];

  const repeatedImages = [...images, ...images]; // Repeat the sequence

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        }
      }
    ],
    beforeChange: (current, next) => setActiveSlide(next),
    afterChange: (current) => setActiveSlide(current)
  };

  const goToNext = () => {
    sliderRef.current.slickNext();
  };

  const goToPrev = () => {
    sliderRef.current.slickPrev();
  };

  const progressPercentage = ((activeSlide + 1) / repeatedImages.length) * 100;
  const isFirstSlide = activeSlide === 0;
  const isLastSlide = activeSlide === repeatedImages.length - 1;

  return (
    <div className="carousel-container">
      {!isFirstSlide && <button onClick={goToPrev} className="custom-prev-button"><FaChevronCircleLeft/></button>}
      {!isLastSlide && <button onClick={goToNext} className="custom-next-button"><FaChevronCircleRight/></button>}
      <Slider ref={sliderRef} {...settings}>
        {repeatedImages.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Slide ${index + 1}`} />
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
        ))}
      </Slider>
      <div className="progress-bar">
        <div 
          className="progress-bar-inner" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};
