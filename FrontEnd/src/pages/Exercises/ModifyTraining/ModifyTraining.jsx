import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import "./ModifyTraining.css";
import { getAllExercisesService, getTraining, modifyTrainingService } from "../../../services";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import BackArrow from '@mui/icons-material/KeyboardBackspaceSharp';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



function ModifyTraining() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [training, setTraining] = useState([]);
    const { idParam } = useParams();
    const [trainingName, setTrainingName] = useState("");
    const [trainingDescription, setTrainingDescription] = useState("");
    const [newExercisesArray, setnewExercisesArray] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [addedExercise, setAddedExercise] = React.useState('');
    const [successMessage, setSuccessMessage] = useState("");


    const fetchData = async () => {
        try {
            const data = await getTraining({ token });
            data.map((e)=>{if( e.id == idParam ){
                setTraining(e)
                if (newExercisesArray.length === 0){
                for (const exercisesId of e.exercise){
                 newExercisesArray.push(exercisesId.id)
                }
            }
            }})
            const data2 = await getAllExercisesService ({token});
            setExercises(data2)
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleReturn = () => {
        window.history.back();
     }

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(async () => {
        try {
    
          const data = new FormData();
    
          if (trainingName) {data.append("training_name", trainingName)}
            else{data.append("training_name", training["training_name"])};
    
          if (trainingDescription) {data.append("training_description", trainingDescription)}
            else{data.append("training_description", training["training_description"])};

          if (newExercisesArray) {data.append("newExercisesArray", newExercisesArray)}
                
          await modifyTrainingService ({ data, token, idParam });
    
          e.target.reset();
          setSuccessMessage("Entrenamiento modificado correctamente 👍");
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
      };

      const handleAddExercise = (event) => {
        setnewExercisesArray(prevNewExercisesArray => [...prevNewExercisesArray, event.target.value]);
      };

      const handleDeleteExercise = (deleteId) => {
        setnewExercisesArray(prevNewExercisesArray => prevNewExercisesArray.filter(prevId => prevId !== deleteId));
      };
      
  
    const handleImage = async (id) => {
        try {
            navigate(`/get-exercises-extended/${id}`);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        fetchData();
    }, [])


    return (
            <form className='modifytraining-form' onSubmit={handleForm}>
            <div className="modifytraining-back-button">
                    <IconButton onClick={handleReturn} className="exercise-extended-back-button">
                        <BackArrow/>
                    </IconButton>
                </div> 
                    <div >
                                <fieldset className="modifytraining-name-field">
                                    <input className='modifytraining-name'
                                        defaultValue={training["training_name"]}
                                        type="text"
                                        name="training_name"
                                        id="training_name"
                                        onChange={(e) => setTrainingName(e.target.value)}
                                    />
                                </fieldset>
                            </div>
                    <div className="modifytraining-list-container">
                            {exercises.length > 0 ? exercises.map((e) => {
                            if (newExercisesArray.includes(e.id)) {
                                return (
                                <ul key={e.id} className="exercise-card">
                                    <li>{e["exercise_name"]}</li>
                                    <li><img onClick={() => handleImage(e.id)} src={`http://localhost:5173/public/exercisePhoto/${e["photo"]}`} alt={e["description"]} /></li>
                                    <li className="exercise-card-button">
                                    <IconButton onClick={()=>handleDeleteExercise(e.id)} sx={{ml:"auto"}} aria-label="delete">
                                <DeleteIcon  />
                                </IconButton>
                                    </li>
                                </ul>
                                );
                            } else {
                                return null;
                            }
                            }) : <p>Exercises not found</p>}
            </div>
                            <div className="modifytraining-description-container">
                                    <fieldset className="field-muscle-group-modify">
                                        <input className="modifytraining-description"
                                            defaultValue={training["training_description"]}
                                            type="text"
                                            name="training_description"
                                            id="training_description"
                                            onChange={(e) => setTrainingDescription(e.target.value)}
                                        />
                                    </fieldset>
                            </div>
                    <div className='modifytraining-button-container'>
                            <fieldset className="modifytraining-add">              
                                <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="simple-select-label">Add Exercise...</InputLabel>
                                            <Select
                                                labelId="simple-select-label"
                                                id="simple-select"
                                                value={addedExercise}
                                                label="Add Exercise"
                                                onChange={handleAddExercise}
                                                >
                                                {exercises.length > 0 ? exercises.map((e) => {
                                                if (!newExercisesArray.includes(e.id)) {
                                                return(
                                                <MenuItem value={e.id}>{e["exercise_name"]}</MenuItem>)
                                                }}):null}
                                            </Select>
                                    </FormControl>
                                </Box>
                            </fieldset>
                                {error ? <p>{error}</p> : null}
                                {loading ? <p>Modify Exercise...</p> : null}
                                {successMessage && <p>{successMessage}</p>}
                                <button className="button-modify-exercise">Modify</button>
                        </div>
            
            </form>
    )
}

export default ModifyTraining;
