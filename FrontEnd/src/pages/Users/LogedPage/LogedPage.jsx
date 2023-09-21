import video from "../../../assets/gym.mp4"
import "./LogedPage.css";


function LogedPage () {
    return (
        <>
        <div className="div-video">
            <video autoPlay muted loop className="background-video">
                <source src={video} type="video/mp4" />
            </video>
            
        </div>

        <div className="welcome">
            <h2>Team-A Gym</h2>
            <h3>Let's train hard!!!⚡</h3>
        </div>
        </>
    )
}

export default LogedPage;