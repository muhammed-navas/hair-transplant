import React from 'react';
import './section10.scss';

const data = [
  {
    image: 'https://www.aesop.com/u1nb1km7t5q7/1TMUuUVztqWsUhzH7mOGDO/ddf10631ddaa705cbfced048482ee81d/Aesop_Skin_Types_Web_Athenaeum_Thumbnail_Horizontal_Mobile_640x360px.jpg',
    pText: 'Lessons from the lab',
    h3Text: 'An introduction to skin types',
    h6Text: 'Six-minute read'
  },
  {
    image: 'https://www.aesop.com/u1nb1km7t5q7/6cS5ldV6yWkh83RjQ2QhNZ/551a8b903334a56bb55011aee9f45a44/Aesop_A_Guide_to_Fragrance_Web_Athenaeum_Thumbnail_Horizontal_Mobile_640x360px.jpg',
    pText: 'Lessons from the lab',
    h3Text: 'A guide to fragrance',
    h6Text: 'Seven-minute read'
  },
  {
    image: 'https://www.aesop.com/u1nb1km7t5q7/1gjammvUSpxRYu0Gtx0UPX/994ae15670b927c1375bd93fa3a10406/Aesop_Scented_Home_Web_Athenaeum_Thumbnail_Horizontal_Mobile_640x360px.jpg',
    pText: 'Habitat',
    h3Text: 'A guide to home fragrance',
    h6Text: 'Five-minute read'
  }
];

export const Section10 = () => {
  return (
    <div className="section">
      <div className="section-container">
        {data.map((item, index) => (
          <div key={index} className="section-item">
            <img src={item.image} alt={`Thumbnail ${index + 1}`} />
            <p>{item.pText}</p>
            <div className="underline"></div>
            <h3>{item.h3Text}</h3>
            <h6>{item.h6Text}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};


