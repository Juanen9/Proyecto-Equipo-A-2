import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getUserDataService, modifyUserService } from "../../../services";
import lottie from "lottie-web"; // Importa lottie-web
import animationData from "../../../assets/animation_lmltug6s.json"; // Importa tu archivo de animación JSON
import "./EditPassword.css";

function EditPassword() {
  const { token } = useContext(AuthContext);
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [pwd3, setPwd3] = useState("");
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

    setLoading(true); // Inicia la animación de carga

    setTimeout(async () => {
    try {
      
      const data = new FormData();

      if (pwd) data.append("pwd", pwd);
      if (pwd2) data.append("pwd2", pwd2);
      if (pwd3) data.append("pwd3", pwd3);

      const userId = prevValue[0].id
      await modifyUserService({ data, token, userId });

      e.target.reset();
      setError(null);
      setSuccessMessage("Password modificada con éxito 👍");
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
    <section className="edit-password-form">
      {loading ? (
        <div id="lottie-container" style={{ width: "100px", height: "100px" }}>
          {/* Este div contendrá la animación mientras carga */}
        </div>
      ) : (
    <>
      <h1 className="edit-password">Edit Password</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleForm} encType="multipart/form-data">
        <fieldset className="field-edit-password-old">
          <label htmlFor="pwd">Password</label>
          <input required type="password" name="pwd" id="pwd" onChange={(e) => setPwd(e.target.value)} />
        </fieldset>
        <fieldset className="field-edit-new-password">
          <label htmlFor="pwd2">New Password</label>
          <input required type="password" name="pwd2" id="pwd2" onChange={(e) => setPwd2(e.target.value)} />
        </fieldset>
        <fieldset className="field-edit-repeat-new-password">
          <label htmlFor="pwd3">Repeat New Password</label>
          <input required type="password" name="pwd3" id="pwd3" onChange={(e) => setPwd3(e.target.value)} />
        </fieldset>
        <button className="button-edit-password">Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Password...</p> : null}
      </form>
    </>
  )}
  </section>
  );  
}

export default EditPassword;
