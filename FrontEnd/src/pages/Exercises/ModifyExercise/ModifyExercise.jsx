import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getAllExercisesExtendedService, modifyExerciseService } from "../../../services";
import "./ModifyExercise.css";
import { useNavigate, useParams } from "react-router-dom";
import editIcon from "../../../assets/edit-icon.svg";

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

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getAllExercisesExtendedService({ token, idParam });
      setExercises(data);
    } catch (error) {
      setError(error.message);
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

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      if (exerciseName) data.append("exercise_name", exerciseName);
      if (exerciseDescription) data.append("exercise_description", exerciseDescription);
      if (typology) data.append("typology", typology);
      if (muscleGroup) data.append("muscle_group", muscleGroup);
      if (exercisePhoto) data.append("exercisePhoto", exercisePhoto);

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
        <fieldset className="field-exercise-name-modify">
          <label htmlFor="exercise_name">Exercise Name</label>
          <input
            placeholder={exercises && exercises.length > 0 ? exercises[0]["exercise_name"] : ""}
            type="text"
            name="exercise_name"
            id="exercise_name"
            onChange={(e) => setExerciseName(e.target.value)}
          />
        </fieldset>
        <fieldset className="field-description-modify">
          <label htmlFor="exercise_description">Exercise Description</label>
          <textarea
            placeholder={exercises && exercises.length > 0 ? exercises[0]["exercise_description"] : ""}
            type="text"
            name="exercise_description"
            id="exercise_description"
            onChange={(e) => setExerciseDescription(e.target.value)}
          />
        </fieldset>
        <fieldset className="field-typology-modify">
          <label htmlFor="typology">Typology</label>
          <input
            placeholder={exercises && exercises.length > 0 ? exercises[0].typology : ""}
            type="text"
            name="typology"
            id="typology"
            onChange={(e) => setTypology(e.target.value)}
          />
        </fieldset>
        <fieldset className="field-muscle-group-modify">
          <label htmlFor="muscle_group">Muscle Group</label>
          <input
            placeholder={exercises && exercises.length > 0 ? exercises[0]["muscle_group"] : ""}
            type="text"
            name="muscle_group"
            id="muscle_group"
            onChange={(e) => setMuscleGroup(e.target.value)}
          />
        </fieldset>
        <fieldset className="image-field-edit-profile file-input-container-profile">
          <label className="custom-file-upload-profile" htmlFor="exercisePhoto">
            {previewImage ? (
              <img
                className="object-url-image-modify-exercise"
                src={previewImage}
                alt="Preview"
              />
            ) : exercises[0] && exercises[0].photo ? (
              <img
                className="object-url-image-modify-exercise"
                src={`http://localhost:5173/public/exercisePhoto/${exercises[0].photo}`}
                alt="Preview"
              />
            ) : null}
          </label>
          <input
            className="input-image"
            type="file"
            name="exercisePhoto"
            id="exercisePhoto"
            accept="image/*"
            onChange={handleImagePreview}
          />
          <img src={editIcon} alt="edit picture icon" className="edit-icon-modify" />
        </fieldset>
        <button className="button-modify-exercise">Modify</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Modify Exercise...</p> : null}
      </form>
    </section>
  );
}

export default ModifyExercise;
