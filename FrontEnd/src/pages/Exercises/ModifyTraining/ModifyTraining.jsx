import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import "./ModifyTraining.css";

function ModifyTraining() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchData = async () => {
        try {
            const data = await getAllExercisesService({ token });
            setExercises(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [])


    return (
        <section className="modify-training-section">
            <h1 className="training-list-title">Exercise List</h1>
            <form className="training-list-form">
            </form>
            <div className="exercise-card-border ">

                            <ul className="exercise-card">
                                <li>{["exercise_name"]}</li>
                                <li><img onClick={() => handleImage()} src={`http://localhost:5173/public/exercisePhoto/${["photo"]}`} alt={["description"]} /></li>
                                <li className="exercise-card-container">
                                <IconButton aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                                </li>
                            </ul>        
            </div>
        </section>
    )
}

export default ModifyTraining;
