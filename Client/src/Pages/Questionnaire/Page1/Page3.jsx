import React, { useState, useEffect } from 'react';
import { TiTick } from 'react-icons/ti';
import './page1.scss';

export const Page3 = ({ onSelectOption, selectedOption ,setAllData,allData ,currentPage }) => {
  const [localSelectedOption, setLocalSelectedOption] = useState(selectedOption);
  const options = [
    { id: 1, text: 'A lot' , text1 :' It’s obvious to everyone'},
    { id: 2, text: 'Some' , text1 :'   those close to me notice' },
    { id: 3, text: 'A little' , text1 :'  only i notice'},
   
  ];

  const handleSelect = (id,text) => {
    setLocalSelectedOption(id);
    setAllData([...allData,{text,currentPage,id}])
      onSelectOption(id);
   
  };

  useEffect(() => {
    setLocalSelectedOption(selectedOption);
  }, [selectedOption]);

  return (
    <div   className="page1-container">
      <header>
        <h2>How much hair have you lost?

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
              {localSelectedOption === option.id && <TiTick className="tick" />}
            </div>
            <div>
            <p>{option.text}</p>
            <small className='small' >{option.text1}</small>
            </div>
         

          </div>
        ))}
      </div>
    </div>
  );
};
