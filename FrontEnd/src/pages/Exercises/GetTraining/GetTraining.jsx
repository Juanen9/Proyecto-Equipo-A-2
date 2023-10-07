import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getTraining } from "../../../services";
import BackArrow from '@mui/icons-material/KeyboardBackspaceSharp';
import IconButton from '@mui/material/IconButton';
import Carousel from '../../../components/Carousel/Carousel';
import "./GetTraining.css";

function GetTraining () {

    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [training, setTraining] = useState([]);


    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getTraining({token});
            setTraining(data)
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
                    return <ul className="training-card-container" key={e.id}>
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