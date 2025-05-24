import React, { useEffect } from 'react';
import './page8.scss';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

export const Page11 = ({ onNext }) => {

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200, // Default animation duration in milliseconds
      easing: 'ease-in-out', // Easing function for the animation
      once: true, // Whether animation should happen only once
    });

    // Set a timeout to trigger onNext after 5 seconds
    const timer = setTimeout(() => {
      console.log('Timer triggered'); // Debugging statement
      if (typeof onNext === 'function') {
        onNext();
        console.log('onNext called'); // Debugging statement
      } else {
        console.error('onNext is not a function'); // Debugging statement
      }
    }, 4000); // 5000 milliseconds = 5 seconds

    // Cleanup timeout if the component unmounts
    return () => clearTimeout(timer);
  }, [onNext]);




  return (
    <div className='mainpage8'>
      <div className='inner-page-8'>
        <p data-aos="fade-up" data-aos-duration="1000">Next, let's talk about lifestyle factors.</p>
        <p data-aos="fade-up" data-aos-duration="3500">Uncovering which root causes may be affecting you can help us better understand your hair needs</p>
      </div>
    </div>
  );
}
