import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { logInUserService } from "../../../services";
import lottie from "lottie-web"; // Importa lottie-web
import animationData from "../../../assets/animation_lmltug6s.json"; // Importa tu archivo de animación JSON
import "./LogInUser.css";

function LogInUser() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      // Configura la animación cuando loading sea true
      const container = document.getElementById("lottie-container");
      const animation = lottie.loadAnimation({
        container,
        animationData, // Tu archivo de animación JSON importado
        renderer: "svg", // Puedes elegir "canvas" o "html" según tus necesidades
        loop: true,
        autoplay: true,
      });

      // Detén la animación cuando ya no sea necesaria (por ejemplo, después de completar la carga)
      return () => {
        animation.stop();
        animation.destroy();
      };
    }
  }, [loading]);

  const handleForm = async (e) => {
    e.preventDefault();

    setLoading(true); // Inicia la animación de carga

    // Agregar un retraso de 5 segundos (5000 ms) antes de realizar la operación
    setTimeout(async () => {
      try {
        const token = await logInUserService({ email, pwd });
        login(token);
        navigate("/");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false); // Detiene la animación de carga después de completar la operación
      }
    }, 2000);
  };

  return (
    <section className="login-form">
      {loading ? (
        <div id="lottie-container">
          {/* Este div contendrá la animación mientras carga */}
        </div>
      ) : (
        <>
          <h1 className="begin">Let’s Begin</h1>
          <form onSubmit={handleForm}>
            <fieldset className="email-field-login">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
            <fieldset className="password-field-login">
              <label htmlFor="pwd">Password</label>
              <input
                type="password"
                name="pwd"
                id="pwd"
                value={pwd}
                required
                onChange={(e) => setPwd(e.target.value)}
              />
            </fieldset>
            <fieldset className="last-field">
              <div className="div-links">
                <Link to={'/recover-password'} className="subrayado-log">Forgot password</Link>
                <p>or</p>
                <Link to={'/register'} className="subrayado-log">Create an account</Link>
              </div>
              <div className="div-button-login">
                <button className="button-login" type="submit">Login</button>
              </div>  
              {error ? <p>{error}</p> : null}
            </fieldset>  
          </form>
        </>
      )}
    </section>
  );
}

export default LogInUser;
