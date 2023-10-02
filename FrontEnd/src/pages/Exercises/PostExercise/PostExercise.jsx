import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { postExerciseService } from "../../../services";
import lottie from "lottie-web"; // Importa lottie-web
import animationData from "../../../assets/animation_lmlvl2he.json";
import "./PostExercise.css";
import fotoEstandar from "../../../../public/exercisePhoto/fotoEstandar.png"

function PostExercise () {

    const {token} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
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

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(async () => {
        try {
  
            const data = new FormData(e.target);
            await postExerciseService({data, token});


            e.target.reset();
            setImage(null);
            setError(null);
            setSuccessMessage("Ejercicio añadido correctamente 👍");
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
              setError(null);
            }, 5000);
        }finally{
            setLoading(false);
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);
        }
      }, 5000);
    }


    return (
      <section className="login-form-post-exercise">
        {loading ? (
        <div id="lottie-container" className="lottie-container">
          {/* Este div contendrá la animación mientras carga */}
        </div>
        ) : (
        <>
      <h1 className="add-new-exercise">Add new Exercise</h1>
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleForm}>
        <div className="post-exercise-column">
          <div className="post-exercise-column-container">
            <fieldset className="image-field-post-exercise file-input-container">
              <label htmlFor="exercisePhoto" className="custom-file-upload">
              {image ? (
                <figure>
                  <img className="post-exercise-object-url-image"
                    src={URL.createObjectURL(image)}
                    alt="Preview"
                  />
                </figure>
              ) : <>
                <img src={fotoEstandar} alt="Foto de subida de imágenes" className="post-exercise-upload-image"/>
                </>}
                </label>
              <input required
                type="file"
                name="exercisePhoto"
                id="exercisePhoto"
                accept={"image/*"}
                onChange={(e) => setImage(e.target.files[0])}
              />
            </fieldset>
          </div>
          <div className="post-exercise-column-container">
            <fieldset className="name-field-post-exercise">
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" required />
            </fieldset>
            <fieldset className="description-field-post-exercise">
              <label htmlFor="description">Description</label>
              <textarea type="text" name="description" id="description" required />
            </fieldset>
            <fieldset className="typology-field-post-exercise">
              <label htmlFor="typology">Typology</label>
              <input type="text" name="typology" id="typology" required />
            </fieldset>
            <fieldset className="muscleGroup-field-post-exercise">
              <label htmlFor="muscleGroup">Muscle Group</label>
              <input type="text" name="muscleGroup" id="muscleGroup" required />
            </fieldset>
            <div className="post-exercise-column-button">
            <button className="button-post-exercise">Post Exercise</button>
            {error ? <p>{error}</p> : null}
            {loading ? <p>posting exercise...</p> : null}
            </div>
          </div>
        </div> 
      </form>
    </>
    )}
    </section>
    );
}


export default PostExercise;