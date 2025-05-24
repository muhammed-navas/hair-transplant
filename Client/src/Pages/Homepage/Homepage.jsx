import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import './homepage.scss';

import { Carosel } from '../../componets/Carosel/Carosel';
import { AiOutlineRight } from 'react-icons/ai';
import { Section3 } from '../../componets/Section3/Section3';
import { Section4 } from '../../componets/Section4/Section4';
import { Footer } from '../../componets/Footer/Footer';
import { Section5 } from '../../componets/section5/Section5';
import { IoIosArrowForward } from 'react-icons/io';


export const Homepage = () => {
  const navigate = useNavigate();

  const handleLinkClick = (e) => {
    e.preventDefault(); // Prevent default navigation
    setTimeout(() => {
      navigate('/products');
    }, 300); // 400ms delay
  };

  const sections = [
   
    {
      title: "Your Heading Here 2",
      content: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: 'https://www.aesop.com/u1nb1km7t5q7/5U605A7FoYhpc3VYMLKo1F/bc9eb15a32b39c4a122a46e5a79482d8/Aesop_Eleos_Sleeve_KR_2024_Web_Homepage_Secondary_Mid_Tablet_1400x788px.jpg',
      backgroundColor: '#d0afde'
    },
    {
      title: "Your Heading Here 1",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque ut erat non nisi.",
      image: 'https://www.aesop.com/u1nb1km7t5q7/6oMdPxraLxVxMj7xpTCcH5/a0c220803246962ecd24b91b1c31d043/Aesop_Personal_Care_2022_Web_Homepage_Secondary_50-50_Tablet_1536x950px.jpg',
      backgroundColor: '#7b7261'
    },
    {
      title: "Your Heading Here 3",
      content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: 'https://www.aesop.com/u1nb1km7t5q7/50yfP8qTyL8IMxevuAgouF/b6f5afa06fdfb3b5c827fda7ae50e2a0/Aesop_IFT_Event_TH_Web_Homepage_Secondary_Mid_Tablet_1400x788px.jpg',
      backgroundColor: '#d0d0d0'
    },
  ];

  return (
    <div className='homepage'>
 
      <div className='content-section'>

        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          fadeEffect={{
            crossFade: true
          }}
          speed={2000}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {sections.map((section, index) => (
            <SwiperSlide key={index}>
              <div 
                className='carousel-item'
                style={{ backgroundColor: section.backgroundColor }} // Set background color
              >
                <div className='text-content'>
                  <div className='text-div'>
                    <h2>{section.title}</h2>
                    <p>{section.content}</p>
                    <div onClick={handleLinkClick} className='button-main'>
                      <div><button className='button-2' >Learn More</button></div>
                      <p><IoIosArrowForward /></p>
                    </div>
                  </div>
                </div>
                <div 
                  className='image-container' 
                  style={{ backgroundImage: `url(${section.image})` }} 
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <Carosel />

      <div className='additional-info'>
        <div className='content-wrapper'>
          <h2>Eminently suited to all</h2>
          <p>An Aesop Gift Card is the ideal gift for the fussy, the faraway and anyone in between—conveniently delivered with the click of a mouse to conceal last-minute selections.</p>
          <button>
            Purchase Now <AiOutlineRight />
          </button>
        </div>
        <div className='image-wrapper'>
          <img 
            src='https://www.aesop.com/u1nb1km7t5q7/1puhwTy0xTMusHggeBve7y/0809fe2c17c678369df30d00274cece8/Aesop-Other-Digital-Gift-Card-medium1.png'
            alt='Aesop Gift Card'
          />
        </div>
      </div>
      <Section3/>
      <Section4/>
      <Section5/>
      <Footer/>
    </div>
  );
};
