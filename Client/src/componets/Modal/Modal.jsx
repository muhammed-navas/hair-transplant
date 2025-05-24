import React, { useContext } from 'react'
import { IoMdClose } from "react-icons/io";
import './modal.scss'
import { ContextApi } from '../Contextapi/Context';
import { useLocation } from 'react-router-dom';

export const Modal = () => {

    const {handleResendOtp,setShowOtpModal,showOtpModal,timer,handleCloseModal ,otp,otpAllow,handleOtpSubmit,setOtpAllow ,setOtp } = useContext(ContextApi)


    
    const handleOtpChange = (e) => {
        const value = e.target.value
        if (value.length === 4){
          console.log(value,"value");
          
          setOtpAllow(true)
       }else{
          setOtpAllow(false)
       }
        setOtp(e.target.value);
        console.log(otp,"otp");
       
      };



  return (
    <div className='otp-modal'>
          <div className='otp-modal-content'>
          <div className='right-row'>
            <button className='close-button-1' onClick={handleCloseModal}><span><IoMdClose /></span></button>
            </div>
          
            <h2>We sent an OTP to your email</h2>
           
           
            {/* <button className='close-but ton' onClick = {handleCloseModal}>  X </button>
            <h2>We sent an OTP to your email</h2> */}
            <div className='input'>
              <input
              type="number" 
                name="otp"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleOtpChange}
                
              />
            </div>
            <div className='otp-actions'>
              {timer > 0 ? (
                <span className="timer">Resend OTP in {timer}s</span>
              ) : (
                <button onClick={handleResendOtp}>Resend OTP</button>
              )}
              {timer > 0 && (
                <button className={!otpAllow? 'disable' : ''} onClick={handleOtpSubmit}>Submit OTP</button>
              )}
            </div>
          </div>
          <div className='otp-modal-backdrop' onClick={handleCloseModal}></div>
        </div>
  )
}
