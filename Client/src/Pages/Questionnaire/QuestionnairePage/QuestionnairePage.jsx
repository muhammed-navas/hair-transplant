import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import './questionnaire.scss';
import { Page1 } from '../Page1/Page1';
import { Page2 } from '../Page1/Page2';
import { Page3 } from '../Page1/Page3';
import { Page4 } from '../Page1/Page4';
import { Page5 } from '../Page1/Page5';
import { Page6 } from '../Page1/Page6';
import { Page7 } from '../Page1/Page7';
import { Page8 } from '../Page1/Page8';
import { Page9 } from '../Page1/Page9';
import { Page10 } from '../Page1/Page10';

const pages = [Page1, Page2, Page3, Page4, Page5, Page6, Page7 , Page8,Page9,Page10]; // List of pages

export const QuestionnairePage = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [selectedOptionsp, setSelectedOptionsp] = useState([]);
  const [allData,setAllData] = useState([])
  const [localSelectedOptions, setLocalSelectedOptions] = useState([]);


  console.log(selectedOptionsp,"selectedOptionsp in main page");

  const navigate = useNavigate();

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const Handlehome = () => {
    navigate('/');
  }

  const handleOptionSelect = (page, options) => {
    setSelectedOptions(prevState => ({
      ...prevState,
      [page]: options,
    }));
    setSelectedOptionsp(options);

    if (currentPage !== 4) {
      setTimeout(() => {
        handleNext();
      }, 200);
    }
  };

  const CurrentPageComponent = pages[currentPage];
  const progressPercentage = ((currentPage + 1) / pages.length) * 100;
console.log(selectedOptions,"selectedOptions");
console.log(allData,"selectedOptions");
  return (
    <div className='QuestionnairePage-main'>
      <header className="header">
        <div>
          {currentPage > 0 && (
            <div onClick={handlePrev} className="header-left">
              <div className="back-button" onClick={handlePrev}>
                <BiArrowBack />
              </div>
            </div>
          )}
        </div>

        <div className="header-right">
          <div className="logo" onClick={() => navigate('/')}>
            Hair Cycles
          </div>
        </div>
      </header>

      <div className='progress'>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${progressPercentage}%` }}></div>
        </div>
      </div>

      <div
        key={currentPage}
        className='page-wrapper'
      >
        <CurrentPageComponent
          onNext={handleNext}
          localSelectedOptions={localSelectedOptions}
          setLocalSelectedOptions={setLocalSelectedOptions}
          onPrev={handlePrev}
          currentPage={currentPage}
          allData={allData}
          selectedOptionsp={selectedOptionsp}
          setAllData={setAllData}
          setSelectedOptionsp={setSelectedOptionsp}
          selectedOptions={selectedOptions}
          selectedOption={selectedOptions[currentPage]}
          onSelectOption={(options) => handleOptionSelect(currentPage, options)}
        />
      </div>

      {/* Show the button only if selectedOptionsp has values */}
      {(currentPage === 4 && localSelectedOptions.length > 0 ) && (
        <motion.div
          className='fbutton'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <button onClick={handleNext}>
            Continue
          </button>
        </motion.div>
      )}
    </div>
  );
};
