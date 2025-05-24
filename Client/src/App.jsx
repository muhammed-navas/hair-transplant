import React, { useState, useEffect } from 'react';
import { Homepage } from './Pages/Homepage/Homepage';
import { Route, Routes, useLocation } from 'react-router-dom';
import { QuestionnairePage } from './Pages/Questionnaire/QuestionnairePage/QuestionnairePage';
import { Allproduct } from './Pages/ProductPage/Allproduct';
import { Header } from './componets/Header/Header';
import { PageTransition } from './componets/animation/Animationpage';
import { CartPage } from './Pages/Cart/Cart';
import { SignUpPage } from './Pages/Signup/Signuppage';
import { Login } from './Pages/Login/Login';
import { Forgetpass } from './Pages/Forgetpass/Forgetpass';
import { Changepass } from './Pages/Changepasspage/Changepass';
import { ProductPage } from './Pages/Productdetails/Productdetails';
import { axiosInterceptorPage } from './componets/Interceptor/interceptor';
import { AddressForm } from './Pages/Addresspage/AddressForm';
import './app.scss'
import { Toaster } from 'react-hot-toast';
function App() {
  





  const Header1 = () => {
    const location = useLocation();
    return location.pathname === '/login' || location.pathname === '/changepassword' || location.pathname === '/forgot' || location.pathname === '/goals' || location.pathname === '/signup' ? <Header visible={false} /> : <Header visible={true} />;
  };

  return (
    <div className='root'>
 
      <Header1 />
      <Toaster />
      <Routes>
     
      
        <Route path="/" element={<Homepage />} />
        <Route path="/goals" element={<PageTransition><QuestionnairePage /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><CartPage  /></PageTransition>} />
        <Route path="/products" element={<PageTransition><Allproduct  /></PageTransition>} />
        <Route path="/signup" element={<PageTransition><SignUpPage /></PageTransition>} />
        <Route path='/login' element={<PageTransition><Login /></PageTransition>} />
        <Route path='/forgot' element={<PageTransition><Forgetpass /></PageTransition>} />
        <Route path='/changepassword' element={<PageTransition><Changepass /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />
        <Route path="/addressform" element={<PageTransition><AddressForm/></PageTransition>} />
      </Routes>
      </div>
  );
}

export default App;
