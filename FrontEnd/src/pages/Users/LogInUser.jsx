import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { logInUserService } from "../../services";
import lottie from "lottie-web"; // Importa lottie-web
import animationData from "../../assets/animation_lmltug6s.json"; // Importa tu archivo de animación JSON

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
    }, 5000);
  };

  return (
    <section>
      {loading ? (
        <div id="lottie-container" style={{ width: "100px", height: "100px" }}>
          {/* Este div contendrá la animación mientras carga */}
        </div>
      ) : (
        <>
          <h1>Login</h1>
          <form onSubmit={handleForm}>
            <fieldset>
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
            <fieldset>
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
            <button type="submit">Login</button>
            <Link to={'/recover-password'}>Has olvidado la contraseña?</Link>
            {error ? <p>{error}</p> : null}
          </form>
        </>
      )}
    </section>
  );
}

export default LogInUser;
