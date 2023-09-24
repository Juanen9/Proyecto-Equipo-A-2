import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getFavsService } from "../../../services";
import { useNavigate } from "react-router-dom";
import "./GetFavs.css";

function GetFavs () {

    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [favs, setFavs] = useState([])

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getFavsService({token});
            setFavs(data)
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return (
        <section className="favs-section">
            <h1 className="favs">Favs List</h1>
                {favs.map((e) => {
                    return <ul className="favs-card-container" key={e.id}> 
                        <li className="exercise-name-favs">{e["exercise_name"]}</li>
                        <li><img src={`http://localhost:5173/public/exercisePhoto/${e["photo"]}`} alt={e["exercise_description"]}/></li>
                        <li className="exercise-description-favs">{e["exercise_description"]}</li>
                    </ul>
                })}
        </section>
    )
}

export default GetFavs;