import {  useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { modifyExerciseService, modifyUserService } from "../../../services";
import "./ModifyExercise.css";

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

  const handleForm = async (e) => {
    e.preventDefault();

    try {

      setLoading(true);

    const data = new FormData();

    //if (exerciseId) data.append("exerciseId", exerciseId);
    if (exerciseName) data.append("exerciseName", exerciseName);
    if (exerciseDescription) data.append("exerciseDescription", exerciseDescription);
    if (typology) data.append("typology", typology);
    if (muscleGroup) data.append("muscleGroup", muscleGroup);
    if (exercisePhoto) data.append("exercisePhoto", exercisePhoto);
    
      await modifyExerciseService({ data, token, exerciseId });

      e.target.reset();
      setExercisePhoto(null);
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
      <fieldset className="field-exercise-id">
          <label htmlFor="exerciseId">Exercise Id</label>
          <input type="number" name="exerciseId" id="exerciseId" required onChange={(e) => setExerciseId(e.target.value)}/>
        </fieldset>
        <fieldset className="field-exercise-name-modify">
          <label htmlFor="exerciseName">Exercise Name</label>
          <input type="text" name="exerciseName" id="exerciseName"onChange={(e) => setExerciseName(e.target.value)}/>
        </fieldset>
        <fieldset className="field-description-modify">
          <label htmlFor="exerciseDescription">Exercise Description</label>
          <textarea type="text" name="exerciseDescription" id="exerciseDescription" onChange={(e) => setExerciseDescription(e.target.value)}/>
        </fieldset>
        <fieldset className="field-typology-modify">
          <label htmlFor="typology">Typology</label>
          <input type="text" name="typology" id="typology" onChange={(e) => setTypology(e.target.value)}/>
        </fieldset>
        <fieldset className="field-muscle-group-modify">
          <label htmlFor="muscleGroup">Muscle Group</label>
          <input type="text" name="muscleGroup" id="muscleGroup" onChange={(e) => setMuscleGroup(e.target.value)}/>
        </fieldset>
        <fieldset className="image-field-modify-exercise file-input-container">
          <label htmlFor="exercisePhoto" className="custom-file-upload"><span>Exercise</span><span>Photo</span></label>
          <input
            type="file"
            name="exercisePhoto"
            id="exercisePhoto"
            accept={"image/*"}
            onChange={(e) => setExercisePhoto(e.target.files[0])}
          />
          {exercisePhoto ? (
            <figure>
              <img
                src={URL.createObjectURL(exercisePhoto)}
                style={{ width: "100px" }}
                alt="Preview"
              />
            </figure>
          ) : null}
        </fieldset>
        <button className="button-modify-exercise">Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Exercise...</p> : null}
      </form>
    </section>
  );
};

export default ModifyExercise;