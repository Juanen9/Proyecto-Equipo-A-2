import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import LogedMenu from "../LogedMenu/LogedMenu";
import { AuthContext } from "../../context/AuthContext";
import Menu from "./Menu/Menu";
import { checkTokenValidity } from "../../services";

function Header({logged, setLogged}) {
  const [menuVisible, setMenuVisible] = useState(false);
  const {token} = useContext(AuthContext);
  const [log, setLog] = useState("");
  const navigate = useNavigate();


  useEffect(() => {
    setLog(token)
  },[token])

  const toggleMenu = async () => {
    if (token) {
      const isValid = await checkTokenValidity({token});
      if (!isValid) {
        localStorage.removeItem("token");
        setLog("");
        navigate("/login");
      }
    }
    setMenuVisible(!menuVisible);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    setLog("");
    navigate("/");
}

  return (
    <div className={`header-container ${menuVisible ? "menu-open" : ""}`}>
      <Link to={"/"}><p>Team-A GYM</p></Link>
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
          {log ? <LogedMenu handleLogOut={handleLogOut} toggleMenu={toggleMenu}/> : <Menu toggleMenu={toggleMenu}/>}
      </div>
    </div>
  );
}

export default Header;
