import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getAllExercisesExtendedService, modifyExerciseService } from "../../../services";
import "./ModifyExercise.css";
import { useNavigate, useParams } from "react-router-dom";
import editIcon from "../../../assets/edit-icon.svg";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function ModifyExercise() {
  const { token } = useContext(AuthContext);
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [exercisePhoto, setExercisePhoto] = useState(null);
  const [typology, setTypology] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { idParam } = useParams();
  const [exercises, setExercises] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const [valueTypo, setValueTypo] = React.useState('');
  const [valueMuscle, setValueMuscle] = React.useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllExercisesExtendedService({ token, idParam });
      setExercises(data);
    } catch (error) {
      setError(error.message);
      navigate("/")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (idParam) {
      fetchData();
    }
  }, [idParam]);

  const handleImagePreview = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setPreviewImage(URL.createObjectURL(selectedImage));
      setExercisePhoto(selectedImage);
    } else {
      setPreviewImage(null);
      setExercisePhoto(null);
    }
  };

  const handleChangeTypo = (event) => {
    setValueTypo(event.target.value);
  };
  const handleChangeMuscle = (event) => {
    setValueMuscle(event.target.value);
  };


  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      if (exerciseName) {data.append("exercise_name", exerciseName)}
        else{data.append("exercise_name", exercises[0]["exercise_name"])};

      if (exerciseDescription) {data.append("exercise_description",exerciseDescription)}
        else{data.append("exercise_description", exercises[0]["exercise_description"])};

      if (valueTypo) {data.append("typology", valueTypo)}
        else{data.append("typology", exercises[0]["typology"])};

      if (valueMuscle) {data.append("muscle_group", valueMuscle)}
        else{data.append("muscle_group", exercises[0]["muscle_group"])};

      if (exercisePhoto) {data.append("exercisePhoto", exercisePhoto)}  
        
      await modifyExerciseService({ data, token, idParam });

      e.target.reset();
      navigate(`/get-exercises-extended/${idParam}`);
      setExercisePhoto(null);
      setPreviewImage(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form-modify-exercise">
      <h1 className="modify-exercise">Modify Exercise</h1>
      <form onSubmit={handleForm}>
        <div className="modify-exercise-column">
          <div className="modify-exercise-column-container">
            <fieldset className="image-field-edit-profile file-input-container-profile">
              <label className="modify-exercise-upload-image" htmlFor="exercisePhoto">{exercisePhoto ? ( // Mostrar la nueva imagen seleccionada (si existe)
                  <img className="modify-exercise-object-url-image"
                    src={URL.createObjectURL(exercisePhoto)}
                    alt="Preview"
                  />
              ) : exercises[0] && exercises[0].photo ? ( 
                  <img className="modify-exercise-object-url-image"
                    src={`http://localhost:5173/public/exercisePhoto/${exercises[0].photo}`}
                    alt="Preview"
                  />
              ) : null}
              </label>

              <input className="custom-file-upload-profile"
                type="file"
                name="exercisePhoto"
                id="exercisePhoto"
                accept="image/*"
                onChange={(e) => setExercisePhoto(e.target.files[0])} // Actualizar el estado cuando se selecciona una imagen
              />
            </fieldset>
          </div>
          <div>
            <fieldset className="field-exercise-name-modify">
              <label htmlFor="exercise_name">Exercise Name</label>
              <input
                defaultValue={exercises && exercises.length > 0 ? exercises[0]["exercise_name"] : ""}
                type="text"
                name="exercise_name"
                id="exercise_name"
                onChange={(e) => setExerciseName(e.target.value)}
              />
            </fieldset>
            <fieldset className="field-description-modify">
              <label htmlFor="exercise_description">Exercise Description</label>
              <textarea
                defaultValue={exercises && exercises.length > 0 ? exercises[0]["exercise_description"] : ""}
                type="text"
                name="exercise_description"
                id="exercise_description"
                onChange={(e) => setExerciseDescription(e.target.value)}
              />
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
            <div className="modify-exercise-column-button">
              <button className="button-modify-exercise">Modify</button>
              {error ? <p>{error}</p> : null}
              {loading ? <p>Modify Exercise...</p> : null}
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default ModifyExercise;
