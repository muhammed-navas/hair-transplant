import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import './section4.scss'; // Assuming you're using a SCSS file for styling

export const Section4 = () => {
  return (
    <div className="section4-container">
      <div className="left">
        <h2>Virtual guidance from home's comfort</h2>
        <p>For advice on our range of formulations, we welcome you to book a complimentary live consultation. Following your appointment, you will receive a bespoke product sample when you place an order.</p>
        <button className="discover-button">
          Discover live consultations <IoIosArrowForward />
        </button>
      </div>
      <div className="right">
        <img src="https://www.aesop.com/u1nb1km7t5q7/48WUU7O1mDZ0jSogoWRyNl/151c278f42d867e1d2dd786e74174ab1/Aesop_IFT_Event_TH_Web_Homepage_Secondary_Mid_Desktop_2560x1440px.jpg" alt="Virtual guidance" />
      </div>
    </div>
  );
}


