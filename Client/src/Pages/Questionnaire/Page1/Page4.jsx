import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page1.scss';

export const Page4 = ({ onSelectOption, selectedOption ,setAllData,allData ,currentPage  }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);
  const options = [
    { id: 1, text: 'Over a year ago' },
    { id: 2, text: 'In the past year' },
    { id: 3, text: 'In the past few months' },
    { id: 4, text: 'Not sure' },

  ];
  const handleSelect = (id,text) => {
    setLocalSelectedOption(id);
    setAllData([...allData,{text,currentPage,id}])
   
      onSelectOption(id);
   
  };

  useEffect(() => {
    setLocalSelectedOption(selectedOption);
    console.log(localSelectedOption,"hhh");
  }, [selectedOption]);

  return (
    <div   className="page1-container">
      <header>
        <h2>When did you start noticing changes to your hair?</h2>
      </header>
      <div className="options-container">
        {options.map(option => (
          <div
            key={option.id}
            className={`option ${localSelectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleSelect(option.id,option.text)}
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
