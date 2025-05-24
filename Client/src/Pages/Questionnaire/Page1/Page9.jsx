import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page1.scss';

export const Page9 = ({ onSelectOption, selectedOption,selectedOptions ,currentPage }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);
  

  const options = [
    { id: 1, text: 'Yes' },
    { id: 2, text: 'No' },
    { id: 3, text: 'Not sure' }
  
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
        <h2>Does hair loss run in your family?</h2>
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
