import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page1.scss';

export const Page10 = ({ onSelectOption, selectedOption,selectedOptions ,currentPage }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);
  

  const options = [
    { id: 1, text: 'All the time' },
    { id: 2, text: 'Sometimes' },
    { id: 3, text: 'Rarely' },
    { id: 4, text: 'Not sure' }
  
  ];

  const handleSelect = (id) => {
    setLocalSelectedOption(id);
    onSelectOption(id);
  };

  useEffect(() => {
    setLocalSelectedOption(selectedOption);
  }, [selectedOption]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    
    <div className="page1-container">
      <header>
        <h2>How often do you tend to experience stress?

</h2>
      </header>
      <div className="options-container">
        {options.map(option => (
          <div
            key={option.id}
            className={`option ${localSelectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleSelect(option.id,option.text)}
          >
            <div className="circle">
              {localSelectedOption === option.id  && <TiTick className="tick" />}
            </div>
            <p>{option.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
