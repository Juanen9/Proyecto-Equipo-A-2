import "./LogOut.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";

function LogOut ({handleLogOut}) {

    const {token} = useContext(AuthContext);
    

    return(
        <button className="button-logout" onClick={handleLogOut}>Log Out</button>
    )
}

export default LogOut;