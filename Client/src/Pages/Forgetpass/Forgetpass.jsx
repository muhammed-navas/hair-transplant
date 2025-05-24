import React, { useContext, useEffect, useState } from 'react'
import './forget.scss'
import axios from 'axios';
import { Modal } from '../../componets/Modal/Modal';
import { ContextApi } from '../../componets/Contextapi/Context';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
export const Forgetpass = () => {

  
    const [errors, setErrors] = useState('');

    const { setShowOtpModal, showOtpModal, forgetemail, setforgetsetEmail,timer, setTimer, formData, setFormData } = useContext(ContextApi);
    const naviagte = useNavigate()
    const handleChange = (e) => {
      setforgetsetEmail(e.target.value)
      console.log(forgetemail,"forget");
      
      };

        const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"
    
    


      useEffect(() => {
        if (showOtpModal && timer > 0) {
          const intervalId = setInterval(() => {
            setTimer((prevTimer) => prevTimer - 1);
          }, 1000);
          return () => clearInterval(intervalId);
        }
      }, [showOtpModal, timer, setTimer]);

  const validate = async()=>{

    let tempErrors 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(forgetemail)) {
      tempErrors = 'Please enter a valid email address';

    }else{

      try {

        console.log("before validate");
        const response = await axios.post(`${REACT_APP_API_DEFAULT}/api/auth/forgot-password`,{forgetemail})
        console.log(response.data,"This data is updated");
        setforgetsetEmail(forgetemail)
        setShowOtpModal(true)
      
      } catch (error) {
        toast.error('This Email is not Registered')
        console.log(error,"backend error");

      }
    }

    setErrors(tempErrors);
    
  }

  const handleSubmit = async(e) => {
    console.log('Form Submitted', forgetemail);
    e.preventDefault();
    if(validate()){
    
    }
  };


  return (
    <div className='outer-main'>
      <div className='form-main-div'>
        <h2> Forget Password </h2>
         <div className='inside-form-div'> 
           <div className='input'> 
             <input
            type="email"
            name="email"
            placeholder=""
            value={forgetemail}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          {errors && <span className="error"> {errors} </span>}
        </div>

        <button type="submit" onClick = {handleSubmit}>
         Submit 
        </button>
      
      </div>
    </div>
    {
      showOtpModal && <Modal/>
    }
  </div>
  )
}
