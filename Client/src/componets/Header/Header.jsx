
import React, { useState, useEffect, useRef, useContext } from 'react';
import './header.scss';

import { useLocation, useNavigate } from 'react-router-dom';
import { axiosInterceptorPage } from '../Interceptor/interceptor';
import { ContextApi } from '../Contextapi/Context';
import { HeaderContent } from './HeaderContent';

export const Header = ({ visible }) => {
  const [isHidden, setIsHidden] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedNavItem, setSelectedNavItem] = useState('home');
  const headerRef = useRef(null);
  const { setUserAuth, userAuth, cartLength } = useContext(ContextApi);
  const location = useLocation();
  const navigate = useNavigate();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [ isActive ,setIsActive] = useState(false)

  useEffect(() => {
    // Update header height when the component mounts or updates
    setHeaderHeight(headerRef.current?.offsetHeight || 0);
  }, []);


  // const REACT_APP_API_DEFAULT = "https://trifolix-hair-transplant-3.onrender.com"
  const REACT_APP_API_DEFAULT = "http://localhost:5000";

  useEffect(() => {

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 0) {
        setIsSticky(true);

        if (currentScrollY > lastScrollY) {
          setIsHidden(true); // Hide the header on scroll down
        } else {
          setIsHidden(false); // Show the header on scroll up
        }
      } else {
        setIsSticky(false);
        setIsHidden(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, headerHeight]);


  // useEffect(() => {
  //   const currentScrollY = window.scrollY;
  //   if (currentScrollY < 0 && currentScrollY > 0) {
  //     setIsSticky(true);
  //   }
  // }, [])
  
    


  useEffect(() => {
    document.body.classList.toggle('no-scroll', isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    const pathToNavItemMap = {
      '/': 'home',
      '/cart': 'cart',
      // Add other routes here
    };

    setSelectedNavItem(pathToNavItemMap[location.pathname] || 'home');
  }, [location.pathname]);

  const toggleMenu = () => {
    setIsActive(!isActive)
    setIsMenuOpen(!isMenuOpen)
  };

  const handleNavClick = async (item) => {
    setSelectedNavItem(item);
    setIsMenuOpen(false);

    const axiosInstance = axiosInterceptorPage();
    try {
      const response = await axiosInstance.post(`${REACT_APP_API_DEFAULT}/api/user/checking`, { selectedNavItem: item },
        { headers: { "Content-Type": "application/json" } });
      console.log(response.data, "data");
    } catch (error) {
      console.log(error, 'this is error');
    }
  };

  const handlelogout = async () => {
    const axiosInstance = axiosInterceptorPage();
    try {
      const response = await axiosInstance.post(`${REACT_APP_API_DEFAULT}/api/auth/logout`, {},
        { headers: { "Content-Type": "application/json" } });
      console.log(response.data, "logout successfully");
      setUserAuth(false);
      localStorage.clear();
    } catch (error) {
      console.log(error, 'this is error');
    }
  };


  return (
    <>
      {visible && (
        <div className="header-container" ref={headerRef}>
          <div className="header-wrapper">
            <HeaderContent
              isHidden={isHidden}
              isSticky={isSticky}
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
              selectedNavItem={selectedNavItem}
              handleNavClick={handleNavClick}
              handlelogout={handlelogout}
              setUserAuth={setUserAuth}
              userauth={userAuth}
              cartlength={cartLength}
              isActive={isActive}
            />
          </div>
        </div>
      )}
    </>
  );
};
