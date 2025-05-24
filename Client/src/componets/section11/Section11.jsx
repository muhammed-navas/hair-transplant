import React from 'react';
import './section11.scss';

const data = [
  {
    svg: 'https://www.aesop.com/u1nb1km7t5q7/7AI4tKMotpiot46NoMsbRV/ea55cce91cb42d7a8b88d53b9288451f/giftbox.svg',
    smallHeadline: 'Seasonal gift wrapping',
    paragraph: 'Orders can be prepared with a decorative sleeve. Add gift wrapping to your order at checkout.'
  },
  {
    svg: 'https://www.aesop.com/u1nb1km7t5q7/3ZHAFYCvLBqAKjXfINVH1q/acff0cee6551b41d62d3a75c1e9c2780/droplet.svg',
    smallHeadline: 'Samples with every order',
    paragraph: 'It is a pleasure to offer a selection of complimentary samples at checkout.'
  },
  {
    svg: 'https://www.aesop.com/u1nb1km7t5q7/4Wb7WJo1Hhqg95v6CZKEE9/5e8d64187475757f59138ba10479b51a/chat-bubble.svg',
    smallHeadline: 'Speak with a consultant',
    paragraph: 'Our knowledgeable consultants are available online to provide bespoke product advice.'
  }
];

export const Section11 = () => {
  return (
    <div className="section2">
      <div className="section-container">
        {data.map((item, index) => (
          <div key={index} className="section-item">
            <img className="svg-icon" src={item.svg} alt={`Icon ${index + 1}`} />
            <h4 className="small-headline">{item.smallHeadline}</h4>
            <p>{item.paragraph}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


