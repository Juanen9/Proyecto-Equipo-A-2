import { Link } from "react-router-dom";
import "./Menu.css";

function Menu ({toggleMenu}) {
    return(
        <ul>
          <li className="menu-item menu-button-started"><Link className="menu-button-started-link" to={"/register"} onClick={toggleMenu}>Get Started</Link></li>
          <li className="menu-item"><Link to={"/login"} onClick={toggleMenu}>Sign In</Link></li>
        </ul>
    )
}

export default Menu;