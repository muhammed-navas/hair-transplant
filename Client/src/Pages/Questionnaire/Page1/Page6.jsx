import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page1.scss';

export const Page6 = ({ onSelectOption, selectedOption }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);

  const options = [
    { id: 1, text: 'Straight or wavy' },
    { id: 2, text: 'Curly or coily' },
    { id: 3, text: 'Textured or processed' },
    { id: 4, text: 'I don’t have hair' },
  
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
        <h2>What’s your hair type?</h2>
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
