import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page5.scss';

export const Page5 = ({ onSelectOption, selectedOption, selectedOptions, selectedOptionsp, setSelectedOptionsp ,localSelectedOptions ,setLocalSelectedOptions }) => {
  


  const options = [
    { id: 1, text: 'A stronger, defined hairline' },
    { id: 2, text: 'Visibly thicker, fuller hair' },
    { id: 3, text: 'More scalp coverage' },
    { id: 4, text: 'Keep the hair I have' },
    
  ];


  useEffect(() => {
    let one = selectedOptions[4]
    console.log(one,'one')
    // Synchronize local state with global state
    setLocalSelectedOptions(Array.isArray(one) ? one : []);
  }, []);

  const handleSelect = (id) => {
    const updatedOptions = localSelectedOptions.includes(id)
      ? localSelectedOptions.filter(optionId => optionId !== id)
      : [...localSelectedOptions, id];
    setLocalSelectedOptions(updatedOptions);
    setSelectedOptionsp(updatedOptions); // Update the global state
    onSelectOption(updatedOptions); // Call parent handler
  };

  

  return (
    <div className="page5-container">
      <header>
        <h2>With treatment, what results are you hoping for?</h2>
        <h4>Choose as many as you’d like.</h4>
      </header>
      <div className="options-container">
        {options.map(option => (
          <div
            key={option.id}
            className={`option ${localSelectedOptions.includes(option.id) ? 'selected' : ''}`}
            onClick={() => handleSelect(option.id)}
          >
            <div className="circle">
              {localSelectedOptions.includes(option.id) && <TiTick className="tick" />}
            </div>
            <p>{option.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
