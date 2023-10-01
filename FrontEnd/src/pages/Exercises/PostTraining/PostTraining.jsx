import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getAllExercisesService, postTrainingService } from "../../../services";
import "./PostTraining.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function PostTraining() {
  const { token } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [exerciseIds, setExerciseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exercises, setExercises] = useState([]);

  const fetchData = async () => {
    try {
        const data = await getAllExercisesService({ token });
        setExercises(data);
        console.log(data);
    } catch (error) {
        setError(error.message);
    }
}

useEffect(() => {
  fetchData();
}, [])


  const handleForm = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const exercisesArray = exerciseIds.map((id) => parseInt(id));
      console.log(exercisesArray);
      await postTrainingService({
        name,
        description,
        exercises: exercisesArray,
        token,
      });
      setName("");
      setDescription("");
      setExerciseIds([]);
      setError(null);
  
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const selectedValue = e.target.value;
    setExerciseIds(prevState => {
      if (prevState.includes(selectedValue)) {
        return prevState.filter(id => id !== selectedValue);
      } else {
        return [...prevState, selectedValue];
      }
    });
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
            value={name} 
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </fieldset>
        <fieldset className="ids-field-post-training">
          <label htmlFor="exerciseIds">Choose your exercises</label>
          <FormGroup>
            {exercises.map((exercise) => (
              <FormControlLabel
                key={exercise.id}
                control={
                  <Checkbox
                    checked={exerciseIds.includes(exercise.id.toString())}
                    onChange={handleCheckboxChange}
                    value={exercise.id}
                  />
                }
                label={exercise.exercise_name}
              />
            ))}
          </FormGroup>
        </fieldset>
        <button className="button-post-training" type="submit">Post Training</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Posting training...</p> : null}
      </form>
    </section>
  );
}

export default PostTraining;
