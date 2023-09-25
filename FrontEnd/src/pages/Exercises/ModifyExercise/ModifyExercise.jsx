import {  useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getAllExercisesExtendedService, modifyExerciseService } from "../../../services";
import "./ModifyExercise.css";
import { useNavigate, useParams } from "react-router-dom";
import editIcon from "../../../assets/edit-icon.svg"

function ModifyExercise  ()  {
  const { token } = useContext(AuthContext);
  const [exerciseId, setExerciseId] = useState("");
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDescription, setExerciseDescription] = useState("");
  const [exercisePhoto, setExercisePhoto] = useState(null);
  const [typology, setTypology] = useState("");
  const [muscleGroup, setMuscleGroup] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {idParam} = useParams();
  const [exercises, setExercises] = useState([]);
  const navigate = useNavigate();



  const fetchData = async () => {
    try {
        setLoading(true);
        const data = await getAllExercisesExtendedService({token, idParam});
        setExercises(data);
    } catch (error) {
        setError(error.message);
    }finally{
        setLoading(false);
    }

}

useEffect(() => {
    if(idParam){
      fetchData();  
    }
},[idParam])


  const handleForm = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

    const data = new FormData();

   
    if (exerciseName) data.append("exerciseName", exerciseName);
    if (exerciseDescription) data.append("exerciseDescription", exerciseDescription);
    if (typology) data.append("typology", typology);
    if (muscleGroup) data.append("muscleGroup", muscleGroup);
    if (exercisePhoto.length > 0) data.append("exercisePhoto", exercisePhoto);

    console.log(exerciseName, typology, muscleGroup, exercisePhoto);
    
      await modifyExerciseService({ data, token, idParam });

      navigate(`/get-exercises-extended/${idParam}`)
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
        <fieldset className="field-exercise-name-modify">
          <label htmlFor="exerciseName">Exercise Name</label>
          <input placeholder={exercises.length > 0 ? exercises[0]["exercise_name"] : ""} type="text" name="exerciseName" id="exerciseName"onChange={(e) => setExerciseName(e.target.value)}/>
        </fieldset>
        <fieldset className="field-description-modify">
          <label htmlFor="exerciseDescription">Exercise Description</label>
          <textarea placeholder={exercises.length > 0 ? exercises[0]["exercise_description"] : ""} type="text" name="exerciseDescription" id="exerciseDescription" onChange={(e) => setExerciseDescription(e.target.value)}/>
        </fieldset>
        <fieldset className="field-typology-modify">
          <label htmlFor="typology">Typology</label>
          <input placeholder={exercises.length > 0 ? exercises[0].typology : ""} type="text" name="typology" id="typology" onChange={(e) => setTypology(e.target.value)}/>
        </fieldset>
        <fieldset className="field-muscle-group-modify">
          <label htmlFor="muscleGroup">Muscle Group</label>
          <input placeholder={exercises.length > 0 ? exercises[0]["muscle_group"]: ""} type="text" name="muscleGroup" id="muscleGroup" onChange={(e) => setMuscleGroup(e.target.value)}/>
        </fieldset> 
        <fieldset className="image-field-edit-profile file-input-container-profile">
          <label className="custom-file-upload-profile" htmlFor="exercisePhoto">{exercisePhoto ? ( // Mostrar la nueva imagen seleccionada (si existe)
              <img className="object-url-image-modify-exercise"
                src={URL.createObjectURL(exercisePhoto)}
                alt="Preview"
              />
          ) : exercises[0] && exercises[0].photo ? ( // Mostrar la imagen de perfil existente solo si existe
              <img className="object-url-image-modify-exercise"
                src={`http://localhost:5173/public/exercisePhoto/${exercises[0].photo}`}
                alt="Preview"
              />
          ) : null}
          </label>

          <input className="input-image"
            type="file"
            name="exercisePhoto"
            id="exercisePhoto"
            accept="image/*"
            onChange={(e) => setExercisePhoto(e.target.files[0])} // Actualizar el estado cuando se selecciona una imagen
          />
          <img src={editIcon} alt="edit picture icon" className="edit-icon-modify"/>
        </fieldset>
        <button className="button-modify-exercise">Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Exercise...</p> : null}
      </form>
    </section>
  );
};

export default ModifyExercise;