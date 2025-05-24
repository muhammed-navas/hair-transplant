import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page1.scss';

export const Page7 = ({ onSelectOption, selectedOption }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);

  const options = [
      { id: 1, text: 'Buzzed, shaved, or bald' },
      { id: 2, text: 'Short' },
      { id: 3, text: 'Medium' },
      { id: 4, text: 'Long' }
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
        <h2>How long is your hair?</h2>
      </header>
      <div className="options-container">
        {options.map(option => (
          <div
            key={option.id}
            className={`option ${localSelectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="circle">
              {localSelectedOption === option.id && <TiTick className="tick" />}
            </div>
            <p>{option.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
