import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { deleteTrainingService, getTraining } from "../../../services";
import BackArrow from '@mui/icons-material/KeyboardBackspaceSharp';
import IconButton from '@mui/material/IconButton';
import Carousel from '../../../components/Carousel/Carousel';
import "./GetTraining.css";
import { useNavigate } from "react-router-dom";

function GetTraining () {
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [training, setTraining] = useState([]);
    const [deleted, setDeleted] = useState(false)



    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getTraining({token});
            setTraining(data)
        } catch (error) {
            setError(error.message);
            navigate("/")
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
            if(window.confirm('Are you sure?')){
            await deleteTrainingService({token, id});           
            }           
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    const handleReturn = () => {
        window.history.back();
     }

    useEffect(() => {
        fetchData();
    },[])


    return (
        <section className="training-section">
            <h1 className="training-title">Training List</h1> 
            <div className="training-list-container">
                {training.map((e) => {
                    return  <ul className="training-card-container" key={e.id}>
                        <button onClick={()=>handleDelete(training[0].id)} className="training-extended-delete">Delete</button>
                        <li className="training-name">{e["training_name"]}</li>
                        {e.exercise ? <Carousel exercise = {e.exercise}/> : null}
                        <li className="training-description">{e["training_description"]}</li>
                    </ul>
                })}
            </div>
        </section>
    )
}

export default GetTraining;