import { Link } from "react-router-dom";
import "./LogedMenu.css";
import LogOut from "../../pages/Users/LogOut/LogOut";

function LogedMenu ({handleLogOut}) {
    return(
        <ul>
          <li className="menu-item"><Link to={"/get-exercises"}>Exercises</Link></li>
          <li className="menu-item"><Link to={"/favs"}>Exercises Favs</Link></li>
          <br/>
          <li className="menu-item"><Link to={"/profile"}>User Profile</Link></li>
          <li className="menu-item menu-button"><LogOut handleLogOut={handleLogOut}/></li>
          
        </ul>
    )
}

export default LogedMenu;