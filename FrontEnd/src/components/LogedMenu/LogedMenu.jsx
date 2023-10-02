import { Link } from "react-router-dom";
import LogOut from "../../pages/Users/LogOut/LogOut";
import { useContext, useEffect, useState } from "react";
import { getUserDataService } from "../../services";
import { AuthContext } from "../../context/AuthContext";
import "./LogedMenu.css";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';


function LogedMenu ({handleLogOut, toggleMenu}) {

  const {token} = useContext(AuthContext);
  const [active, setActive] = useState(false);
  const [tokenValidation, setTokenValidation] = useState("");
  const [role, setRole] = useState("");
  


  const fetchData = async () => {
    try {
      const data = await getUserDataService({token});
      const tokenAdmin = data[0].token;
      const role = data[0].role;
      setTokenValidation(tokenAdmin);
      setRole(role)
    } catch (error) {
      
    }

  }

  useEffect(() => {
    fetchData();
  },[])

  const handleMenu = () => {
    setActive(!active)
  }

  
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
      setAnchorEl(null);
    };
  

    return(
        <ul>
          <li className="menu-item"><Link to={"/get-exercises"} onClick={toggleMenu}>Exercises</Link></li>
          <li className="menu-item"><Link to={"/favs"} onClick={toggleMenu}>Exercises Favs</Link></li>
          <li className="menu-item"><Link to={"/order-likes"} onClick={toggleMenu}>Top Rated</Link></li>
          <li className="menu-item">
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Settings
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}><Link to={"/profile"} onClick={toggleMenu}>Edit Profile</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to={"/edit-email"} onClick={toggleMenu}>Edit Email</Link></MenuItem>
            <MenuItem onClick={handleClose}><Link to={"/edit-password"} onClick={toggleMenu}>Edit Password</Link></MenuItem>
          </Menu>
          </li>
            { tokenValidation == token && role == "admin" ?
            <>
              <li className="menu-item"><Link to={"/post-training"} onClick={toggleMenu}>Post Training</Link></li>
              <li className="menu-item"><Link to={"/post-exercise"} onClick={toggleMenu}>Post Exercise</Link></li>
            </>
          : null}
          <li className="menu-logout"><LogOut handleLogOut={handleLogOut} onClick={toggleMenu}/></li>
        </ul>
    )
}

export default LogedMenu;