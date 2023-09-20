import { Link } from "react-router-dom";
import videoPrueba from "../../../assets/videoPrueba.mp4"
import "./HomePage.css"


function HomePage () {
    return (
        <>
        <div className="div-video">
            <video autoPlay muted loop className="background-video">
                <source src={videoPrueba} type="video/mp4" />
            </video>
        </div>

        <div className="welcome">
            <h2>Team-A Gym</h2>
            <Link to={"/register"}><button>Get Started</button></Link>
        </div>
        </>
    )
}

export default HomePage;