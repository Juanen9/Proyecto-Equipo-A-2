import "./Footer.css";
import twitter from "../../assets/twitter.svg";
function Footer () {
    return (
        <>
            <p>&copy;Team-A</p>
            <a><img src={twitter}></img></a>
        </>    
    )
}

export default Footer;