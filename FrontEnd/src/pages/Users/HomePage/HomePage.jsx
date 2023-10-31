import { Link, useNavigate } from "react-router-dom";
import videoPrueba from "../../../assets/videoPrueba.mp4"
import "./HomePage.css"
import { checkTokenValidity } from "../../../services"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";


function HomePage () {
    const [logged, setLogged] = useState(false);
    const {token} = useContext(AuthContext);
    const checkToken = async () => {
      try {
        if (token != null) {
          const isValid = await checkTokenValidity({token});
          if (isValid) {
            setLogged(true)
          };
        };
      } catch (error) {
        setLogged(false)
      }  
  };

  useEffect(()=>{
    checkToken()
  });

    return (
        <>
        <div className="div-video">
            <video autoPlay muted loop className="background-video">
                <source src={videoPrueba} type="video/mp4" />
            </video>
        </div>

        <div className="welcome">
            <h2>Team-A Gym</h2>
            {logged ?  <h3>Let's train hard !!!⚡</h3> : <Link to={"/register"}><button>Get Started</button></Link>}
        </div>
        </>
    )
}

export default HomePage;