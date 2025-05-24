import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './section5.scss';
import { IoIosArrowForward } from 'react-icons/io';
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";


export const Carosel2 = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const sliderRef = useRef(null);
  const images = [
    'https://www.aesop.com/u1nb1km7t5q7/4QiOwpUNVCCHmSmPcgA9Rj/af62a87afaef2b746628da20d1143566/Aesop_YOHO_Mall_Hero_Bleed_Tablet_1536x864px.jpg',
    'https://www.aesop.com/u1nb1km7t5q7/2v1k3NsQApUkWrE3oP5Wbl/702a846433f9d49d924c4dfcea661edb/Aesop_YOHO_Mall_Hero_Bleed_Desktop_2880x1620px.jpg',
    'https://www.aesop.com/u1nb1km7t5q7/1wOORxVBCv4oCWaBXOWsio/c4ddbbc742fe7b9b9a56ae95b0f89cb7/Aesop_MO_Stores_DFS_Macau_Four_Seasons_Hero_Bleed_Tablet_1536x864px.jpg'
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
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

  const progressPercentage = ((activeSlide + 1) / images.length) * 100;
  const isFirstSlide = activeSlide === 0;
  const isLastSlide = activeSlide === images.length - 1;

  return (
    <div className="carousel-container">
      {!isFirstSlide && <button onClick={goToPrev} className="custom-prev-button"><FaChevronCircleLeft/></button>}
      {!isLastSlide && <button onClick={goToNext} className="custom-next-button"><FaChevronCircleRight/></button>}
      <Slider ref={sliderRef} {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <img src={image} alt={`Slide ${index + 1}`} />
           
          </div>
        ))}
      </Slider>
      <div className="progress-bar">
        <div className="progress-bar-inner" style={{ width: `${progressPercentage}%` }} />
      </div>
    </div>
  );
};

export const Section5 = () => {
  return (
    <div className="section-5">
      <div className="content">
        <h2>Store locator</h2>
        <p>Our consultants are available to host you in-store and provide tailored guidance on gift purchases.</p>
        <button>
          Find a nearby store <IoIosArrowForward />
        </button>
      </div>
      <Carosel2 />
      
    </div>
  );
};


