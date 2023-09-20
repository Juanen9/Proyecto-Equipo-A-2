import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className={`header-container ${menuVisible ? "menu-open" : ""}`}>
      <p>Team-A GYM</p>
      <button onClick={toggleMenu} className={`menu-button ${menuVisible ? "active" : ""}`}>
        {menuVisible ? (
          <svg className="menu-icon" height="20px" version="1.1" viewBox="0 0 20 20" width="20px" xmlns="http://www.w3.org/2000/svg">
            <line stroke="white" className={`line1 ${menuVisible ? "line1-active" : ""}`} strokeWidth="2" x1="4" x2="16" y1="16" y2="4" />
            <line stroke="white" className={`line2 ${menuVisible ? "line2-active" : ""}`} strokeWidth="2" x1="4" x2="16" y1="4" y2="16" />
          </svg>
        ) : (
          <svg className="menu-icon" height="20px" version="1.1" viewBox="0 0 20 20" width="20px" xmlns="http://www.w3.org/2000/svg">
            <line stroke="white" className={`line1 ${menuVisible ? "line1-active" : ""}`} strokeWidth="1" x1="0" x2="20" y1="6.6" y2="6.6" />
            <line stroke="white" className={`line2 ${menuVisible ? "line2-active" : ""}`} strokeWidth="1" x1="0" x2="20" y1="13.3" y2="13.3" />
          </svg>
        )}
      </button>

      <div className={`menu ${menuVisible ? "visible" : ""}`}>
        <ul>
          <li className="menu-item"><Link to={"/login"}>Sign In</Link></li>
          <li className="menu-item menu-button"><Link to={"/register"}><button>Get Started</button></Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
