import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getUserDataService, modifyUserService } from "../../services";
import lottie from "lottie-web"; // Importa lottie-web
import animationData from "../../assets/animation_lmltug6s.json";

function EditMail() {
  const { token } = useContext(AuthContext);
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


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

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getUserDataService({ token });
      setPrevValue(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [])

  const handleForm = async (e) => {
    e.preventDefault();
    setLoading(true); 
    setTimeout(async () => {
    try {

      const data = new FormData();

      if (pwd) data.append("pwd", pwd);  
      if (email) data.append("email", email);
      if (email2) data.append("email2", email2);
      const userId = prevValue[0].id
      await modifyUserService({ data, token, userId });

      e.target.reset();
      setError(null);
      setSuccessMessage("Email modificado con éxito 👍");
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
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
      <h1>Edit Email</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleForm} encType="multipart/form-data">
      <fieldset>
          <label htmlFor="pwd">Password</label>
          <input required type="password" name="pwd" id="pwd" onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor="email">New Email</label>
          <input required type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)} />
        </fieldset>
        <fieldset>
          <label htmlFor="email2">Repeat New Email</label>
          <input required type="email" name="email2" id="email2" onChange={(e) => setEmail2(e.target.value)} />
        </fieldset>
        <button>Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Email...</p> : null}
      </form>
    </>
        )}
      </section>
  );
}

export default EditMail;
