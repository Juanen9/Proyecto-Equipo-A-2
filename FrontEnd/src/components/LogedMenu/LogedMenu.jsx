import { Link } from "react-router-dom";
import LogOut from "../../pages/Users/LogOut/LogOut";
import { useContext, useEffect, useState } from "react";
import { getUserDataService } from "../../services";
import { AuthContext } from "../../context/AuthContext";
import "./LogedMenu.css";

function LogedMenu ({handleLogOut, toggleMenu}) {

  const {token} = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const [tokenValidation, setTokenValidation] = useState("");
  const [role, setRole] = useState("");

  //console.log(token);
  

  const fetchData = async () => {
    const data = await getUserDataService({token});
    const tokenAdmin = data[0].token;
    const role = data[0].role;
    setTokenValidation(tokenAdmin);
    console.log(data.token);
    setRole(role)
  }

  useEffect(() => {
    fetchData();
  },[])

  const handleMenu = () => {
    setActive(!active)
  }


    return(
        <ul>
          <li className="menu-item"><Link to={"/get-exercises"} onClick={toggleMenu}>Exercises</Link></li>
          <li className="menu-item"><Link to={"/favs"} onClick={toggleMenu}>Exercises Favs</Link></li>
          <li className="menu-item"><Link to={"/order-likes"} onClick={toggleMenu}>Top Rated</Link></li>
          <li className="menu-item"><Link to={"/profile"} onClick={toggleMenu}>Profile</Link></li>
          <ul className="menu-item" onClick={handleMenu}>Settings
            {active ? <div className="div-submenu"><li className="menu-item"><Link to={"/edit-email"} onClick={toggleMenu}>Edit Email</Link></li>
            <li className="menu-item"><Link to={"/edit-password"} onClick={toggleMenu}>Edit Password</Link></li></div> : null}
          </ul>{ tokenValidation == token && role == "admin" ?
            <>
              <li className="menu-item"><Link to={"/post-training"} onClick={toggleMenu}>Post Training</Link></li>
              <li className="menu-item"><Link to={"/post-exercise"} onClick={toggleMenu}>Post Exercise</Link></li>
              <li className="menu-item"><Link to={"/modify-exercise"} onClick={toggleMenu}>Modify Exercise</Link></li>
            </>
          : null}
          <li className="menu-item menu-button"><LogOut handleLogOut={handleLogOut} onClick={toggleMenu}/></li>
        </ul>
    )
}

export default LogedMenu;