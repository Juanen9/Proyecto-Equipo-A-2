import "./Footer.css";
import twitter from "../../assets/twitter.svg";
import facebook from "../../assets/facebook.svg";
import youtube from "../../assets/youtube.svg";
import instagram from "../../assets/instagram.svg";
import tiktok from "../../assets/tiktok.svg"

function Footer () {
    return (
        <section className="footer">
            <div>
                <p>&copy;Team-A</p>
            </div>

            <div className="media-links">            
                <a className="social-media"><img src={twitter}></img></a>
                <a className="social-media"><img src={facebook}></img></a>
                <a className="social-media"><img src={youtube}></img></a>
                <a className="social-media"><img src={instagram}></img></a>
                <a className="social-media"><img src={tiktok}></img></a>
            </div>

        </section>    
    )
}

export default Footer;