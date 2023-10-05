import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getLikesService } from "../../../services";
import { useNavigate } from "react-router-dom";
import BackArrow from '@mui/icons-material/KeyboardBackspaceSharp';
import IconButton from '@mui/material/IconButton';
import "./GetLikes.css";

function GetLikes () {

    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [likes, setLikes] = useState([])

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getLikesService({token});
            setLikes(data)
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    const handleReturn = () => {
        window.history.back();
     }

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
    },[])

    return (
        <section className="favs-section">
            <div className="exercise-extended-container-back-button">
                <IconButton onClick={handleReturn} className="exercise-extended-back-button">
                    <BackArrow/>
                </IconButton>
            </div>
            <h1 className="favs">Likes List</h1>
            <div className="fav-list-container">
            {likes.length === 0 ? <p>You have no liked exercises</p>: null}
                {likes.map((e) => {
                    return <ul className="favs-card-container" key={e.id}> 
                        <li className="exercise-name-favs">{e["exercise_name"]}</li>
                        <li className="exercise-fav-photo"><img onClick={() => handleImage(e["id_exercise"])} src={`http://localhost:5173/public/exercisePhoto/${e["photo"]}`} alt={e["exercise_description"]}/></li>
                        <li className="exercise-description-favs">{e["exercise_description"]}</li>
                    </ul>
                })}
            </div>
        </section>
    )
}

export default GetLikes;