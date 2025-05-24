import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import './section.scss'; // Assuming you're using a SCSS file for styling

export const Section3 = () => {
  return (
    <div className="section3-container">
      <div className="left">
        <h2>Elevating the experience of Eleos</h2>
        <p>Receive a complimentary, limited-edition sleeve inspired by Eleos Aromatique Hand Balm with any hand care purchase on Aesop.com—including our Resurrection and Reverence ranges.</p>
        <button className="claim-button">
          Claim your gift <IoIosArrowForward />
        </button>
      </div>
      <div className="right">
        <img src="https://www.aesop.com/u1nb1km7t5q7/2KtdH0x5rGOlygHsADGY0H/b799cba1043f7cf7915f3515216fe971/Aesop_Eleos_Sleeve_KR_2024_Web_Homepage_Secondary_Mid_Desktop_2560x1440px.jpg" alt="Eleos Sleeve" />
      </div>
    </div>
  );
}


