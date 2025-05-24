import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page1.scss';

export const Page1 = ({ onSelectOption, selectedOption,selectedOptions ,currentPage }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);
  

  const options = [
    { id: 1, text: 'Receding hairline, want to slow its progress' },
    { id: 2, text: 'Experiencing hair loss, exploring options' },
    { id: 3, text: 'Experiencing hair loss, ready to start treatment ASAP' },
    { id: 4, text: 'No hair loss yet, want to get ahead of it' },
    { id: 5, text: 'None of the above' },
  ];
console.log(selectedOptions,'&&&')
  const handleSelect = (id,text) => {
    console.log(text,"text");

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
        <h2>Which best represents your hair loss and goals?</h2>
      </header>
      <div className='main-option'>
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
    </div>
  );
};
