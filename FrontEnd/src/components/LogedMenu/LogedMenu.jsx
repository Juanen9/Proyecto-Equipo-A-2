import { Link } from "react-router-dom";
import "./LogedMenu.css";
import LogOut from "../../pages/Users/LogOut/LogOut";

function LogedMenu ({handleLogOut, toggleMenu}) {
    return(
        <ul>
          <li className="menu-item"><Link to={"/get-exercises"} onClick={toggleMenu}>Exercises</Link></li>
          <li className="menu-item"><Link to={"/favs"} onClick={toggleMenu}>Exercises Favs</Link></li>
          <br/>
          <li className="menu-item"><Link to={"/profile"} onClick={toggleMenu}>User Profile</Link></li>
          <li className="menu-item menu-button"><LogOut handleLogOut={handleLogOut} onClick={toggleMenu}/></li>
          
        </ul>
    )
}

export default LogedMenu;