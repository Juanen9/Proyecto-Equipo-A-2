import {  useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { modifyExerciseService, modifyUserService } from "../../services";

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
    <>
      <h1>Modify Exercise</h1>
      <form onSubmit={handleForm}>
      <fieldset>
          <label htmlFor="exerciseId">Exercise Id</label>
          <input type="number" name="exerciseId" id="exerciseId" required onChange={(e) => setExerciseId(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="exerciseName">Exercise Name</label>
          <input type="text" name="exerciseName" id="exerciseName"onChange={(e) => setExerciseName(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="exerciseDescription">Exercise Description</label>
          <textarea type="text" name="exerciseDescription" id="exerciseDescription" onChange={(e) => setExerciseDescription(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="typology">Typology</label>
          <input type="text" name="typology" id="typology" onChange={(e) => setTypology(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="muscleGroup">Muscle Group</label>
          <input type="text" name="muscleGroup" id="muscleGroup" onChange={(e) => setMuscleGroup(e.target.value)}/>
        </fieldset>
        <fieldset>
          <label htmlFor="exercisePhoto">Exercise Photo</label>
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
        <button>Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Exercise...</p> : null}
      </form>
    </>
  );
};

export default ModifyExercise;