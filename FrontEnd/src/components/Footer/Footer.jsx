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
                <a className="social-media" href="https://www.twitter.com" target="_blank"><img src={twitter} alt="Twitter" /></a>
                <a className="social-media" href="https://www.facebook.com" target="_blank"><img src={facebook} alt="facebook" ></img></a>
                <a className="social-media" href="https://www.youtube.com" target="_blank"><img src={youtube} alt="youtube" ></img></a>
                <a className="social-media" href="https://www.instagram.com" target="_blank"><img src={instagram} alt="instagram" ></img></a>
                <a className="social-media" href="https://www.tiktok.com" target="_blank"><img src={tiktok} alt="tiktok" ></img></a>
            </div>

        </section>    
    )
}

export default Footer;