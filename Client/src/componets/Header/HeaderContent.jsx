import React, { useContext } from "react";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import { easeIn } from "framer-motion";
import { ContextApi } from "../Contextapi/Context";

export const HeaderContent = ({
  isHidden,
  isSticky,
  headerRef,
  toggleMenu,
  isMenuOpen,
  selectedNavItem,
  handleNavClick,
  handlelogout,
  userauth,
  cartlength,
  isActive,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(ContextApi);

  const checkToken = localStorage.getItem("accessToken");


  const path = location.pathname;
  const currentNavItem = path === "/" ? "home" : path.substring(1); 

  const handleTreatment = () => {

    if (user.isQuestion === true) {
      toast.success("Treatment Form Submit is Successful..!", {
        position: "top-center",
      });
    } else {
      navigate("/question");
    }
  };

  return (
    <header
      ref={headerRef}
      className={`header ${isHidden ? "header--hidden" : ""} ${
        isSticky ? "header--sticky" : ""
      }`}
    >
      <div className="header-left">
        <div className="logo">Hair Cycles</div>
        <div className="nav-links">
          <Link to="/" className={currentNavItem === "home" ? "selected" : ""}>
            Home
          </Link>
          <a
            onClick={handleTreatment}
            className={`nav-link ${
              currentNavItem === "question" ? "selected" : ""
            }`}
          >
            Treatment Form
          </a>
          {/* <Link to='#shop' className={currentNavItem === 'shop' ? 'selected' : ''} onClick={() => handleNavClick('shop')}>Shop</Link>
          <Link to='#stores' className={currentNavItem === 'stores' ? 'selected' : ''} onClick={() => handleNavClick('stores')}>Stores</Link> */}
        </div>
      </div>

      <div className="header-right">
        <div className="user-icons">
          <Link
            to={checkToken && userauth ? "/Products" : "/login"}
            className={`nav-link ${
              currentNavItem === "Products" ? "selected" : ""
            }`}
          >
            Products
          </Link>
          {!userauth && (
            <Link to="/login" className="nav-link">
              Login
            </Link>
          )}
          <Link
            to={checkToken && userauth ? "/cart" : "/login"}
            className={`nav-link ${
              currentNavItem === "cart" ? "selected" : ""
            }`}
          >
            Cart{" "}
            {cartlength ? (
              <small style={{ color: "red", fontSize: "12px" }}>
                {cartlength}
              </small>
            ) : (
              ""
            )}
          </Link>

          <Link to="/profile" className="nav-link">
            <img
              style={{ width: "30px", height: "30px" }}
              src="https://cdn-icons-png.flaticon.com/128/1144/1144709.png"
              alt="profile"
            />
          </Link>
        </div>
        <FaBars className="menu-icon" onClick={toggleMenu} />
      </div>

      {/* Mobile Section */}
      <div className={`mobile-menu-content  ${isMenuOpen ? "open" : "close"} `}>
        <IoMdClose className="close-icon" onClick={toggleMenu} />
        <div className="mobile-nav-links">
          <Link
            to="/"
            onClick={toggleMenu}
            className={currentNavItem === "home" ? "selected" : ""}
          >
            Home
          </Link>
          <Link
            to="/cart"
            onClick={toggleMenu}
            className={currentNavItem === "cart" ? "selected" : ""}
          >
            Cart{" "}
            {cartlength ? (
              <small style={{ color: "green" }}>{cartlength}</small>
            ) : (
              ""
            )}
          </Link>
          <Link
            to="#shop"
            className={currentNavItem === "shop" ? "selected" : ""}
            onClick={() => handleNavClick("shop")}
          >
            Shop
          </Link>
          {!userauth ? (
            <a
              style={{ cursor: "pointer" }}
              className={currentNavItem === "Login" ? "selected" : ""}
              onClick={() => navigate("/login")}
            >
              Login
            </a>
          ) : (
            <a style={{ cursor: "pointer" }} onClick={handlelogout}>
              Logout
            </a>
          )}
          <Link
            to="/Products"
            onClick={toggleMenu}
            className={currentNavItem === "Products" ? "selected" : ""}
          >
            Products
          </Link>

          <Link
            to="#cabinet"
            className={currentNavItem === "cabinet" ? "selected" : ""}
            onClick={() => handleNavClick("cabinet")}
          >
            Cabinet
          </Link>
        </div>
      </div>
    </header>
  );
};
