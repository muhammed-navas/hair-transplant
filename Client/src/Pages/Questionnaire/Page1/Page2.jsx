import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page2.scss';
import less from '../../../assets/less.png';
import top from '../../../assets/top.png';
import allover from '../../../assets/allover.png';
export const Page2 = ({ onSelectOption, selectedOption }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);

  const options = [
    { id: 1, text: 'Along the hairline',img : less },
    { id: 2, text: 'At the top' ,img : top },
    { id: 3, text: 'All over',img :  allover },

  ];

  const handleSelect = (id) => {
    setLocalSelectedOption(id);
   
      onSelectOption(id);
   
  };

  useEffect(() => {
    setLocalSelectedOption(selectedOption);
  }, [selectedOption]);

  return (
    <div className="page2-container">
    <header>
      <h2>Where are you noticing changes to your hair?</h2>
    </header>
    <div className="options-container">
      {options.map(option => (
        <div
          key={option.id}
          className={`option ${localSelectedOption === option.id ? 'selected' : ''}`}
          onClick={() => handleSelect(option.id)}
        >
          <div className="left-content">
            <div className="circle">
              {localSelectedOption === option.id && <TiTick className="tick" />}
            </div>
            <p>{option.text}</p>
          </div>
          <div className="right-content">
            <img className='option-image' src={option.img} alt={option.text} />
          </div>
        </div>
      ))}
    </div>
  </div>
  );
};
