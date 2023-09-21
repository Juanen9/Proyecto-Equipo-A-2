import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { postTrainingService } from "../../../services";
import "./PostTraining.css";

function PostTraining() {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseIds, setExerciseIds] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const exercisesArray = exerciseIds
        .split(",") 
        .map((id) => parseInt(id.trim()))

      await postTrainingService({
        name,
        description,
        exercises: exercisesArray,
        token,
      });
      e.target.reset();
      setError(null)
  
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-form-post-training">
      <h1 className="add-new-training">Add new Training</h1>
      <form onSubmit={handleForm}>
        <fieldset className="name-field-post-training">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset className="description-field-post-training">
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <fieldset className="ids-field-post-training">
          <label htmlFor="exerciseIds">Exercise IDs (comma-separated)</label>
          <input
            type="text"
            name="exerciseIds"
            id="exerciseIds"
            required
            onChange={(e) => setExerciseIds(e.target.value)}
          />
        </fieldset>
        <button className="button-post-training">Post Training</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Posting exercise...</p> : null}
      </form>
    </section>
  );
}

export default PostTraining;
