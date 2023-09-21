import { Link } from "react-router-dom";
import "./Menu.css";

function Menu () {
    return(
        <ul>
          <li className="menu-item menu-button-started"><Link className="menu-button-started-link" to={"/register"}>Get Started</Link></li>
          <li className="menu-item"><Link to={"/login"}>Sign In</Link></li>
        </ul>
    )
}

export default Menu;