import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { postTrainingService } from "../../services";

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
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  };

  return (
    <>
      <h1>Add new Training</h1>
      <form onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            required
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="exerciseIds">Exercise IDs (comma-separated)</label>
          <input
            type="text"
            name="exerciseIds"
            id="exerciseIds"
            required
            onChange={(e) => setExerciseIds(e.target.value)}
          />
        </fieldset>
        <button>Post Training</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Posting exercise...</p> : null}
      </form>
    </>
  );
}

export default PostTraining;
