import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { postExerciseService } from "../../../services";
import lottie from "lottie-web"; // Importa lottie-web
import animationData from "../../../assets/animation_lmlvl2he.json";
import "./PostExercise.css";
import fotoSubida from "../../../../src/assets/fotoSubida.png";
import { useNavigate } from "react-router-dom";
import { checkTokenValidity } from "../../../services"
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function PostExercise () {
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [valueTypo, setValueTypo] = React.useState('');
    const [valueMuscle, setValueMuscle] = React.useState('');



    const checkToken = async () => {
      if (token) {
        const isValid = await checkTokenValidity({token});
        if (!isValid) {
          navigate("/");
        }
      };
    };

    useEffect(()=>{
      checkToken()
    },[]);

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

    const handleChangeTypo = (event) => {
      setValueTypo(event.target.value);
    };
    const handleChangeMuscle = (event) => {
      setValueMuscle(event.target.value);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(async () => {
        try {
            const data = new FormData(e.target);
            data.append("typology", valueTypo);
            data.append("muscleGroup", valueMuscle);
            await postExerciseService({data, token});
            e.target.reset();
            setImage(null);
            setError(null);
            setSuccessMessage("Ejercicio añadido correctamente 👍");
            setTimeout(() => {
              setSuccessMessage("");
            }, 2000)
        } catch (error) {
            setError(error.message);
            setTimeout(() => {
              setError(null);
            }, 2000);
        }finally{
            setLoading(false);
        }
      }, 2000);
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
                <img src={fotoSubida} alt="Foto de subida de imágenes" className="post-exercise-upload-image"/>
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
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Typology</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valueTypo}
                  label="Typology"
                  onChange={handleChangeTypo}
                >
                  <MenuItem value={"Push"}>Push</MenuItem>
                  <MenuItem value={"Pull"}>Pull</MenuItem>
                </Select>
              </FormControl>
            </Box>
            </fieldset>
            <fieldset className="muscleGroup-field-post-exercise">
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Muscle Group</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={valueMuscle}
                  label="muscleGroup"
                  onChange={handleChangeMuscle}
                >
                  <MenuItem value={"Hombros"}>Hombros</MenuItem>
                  <MenuItem value={"Espalda"}>Espalda</MenuItem>
                  <MenuItem value={"Brazo"}>Brazo</MenuItem>
                  <MenuItem value={"Pecho"}>Pecho</MenuItem>
                  <MenuItem value={"Pierna"}>Pierna</MenuItem>
                </Select>
              </FormControl>
            </Box>
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