import React from 'react';
import './section7.scss';

export const Section7 = () => {
  return (
    <div className="category-section">
      <h4>Discover by category</h4>
      <div className="category-content">
        <div
          className="category-item"
          style={{ backgroundImage: "url('https://www.aesop.com/u1nb1km7t5q7/2TvdiAWQHAojEYDvsLNWR/a47953877950ba94b14643d1985357a9/Aesop_Category_Page_2024_Hair_Secondary_Grid_Shampoo_Conditioner_Tablet_430x440px.jpg')" }}
        >
          <p>Shampoo & Conditioner</p>
        </div>
        <div
          className="category-item"
          style={{ backgroundImage: "url('https://www.aesop.com/u1nb1km7t5q7/ukdmNwCR9qcEAebwQIqB0/ef0442fc93697f19dec7a47cfacd3d8f/Aesop_Category_Page_Hair_Secondary_1_Tiles_Hair_Tablet_430x540px.jpg')" }}
        >
          <p>Hair Treatments</p>
        </div>
        <div
          className="category-item"
          style={{ backgroundImage: "url('https://www.aesop.com/u1nb1km7t5q7/1H8FmIySjNzmBlUHZsrgxJ/cf998aff783488b51dedaac27d324de5/Aesop_Category_Page_2024_Hair_Secondary_Grid_Grooming_Tablet_430x440px.jpg')" }}
        >
          <p>Grooming</p>
        </div>
      </div>
    </div>
  );
};
