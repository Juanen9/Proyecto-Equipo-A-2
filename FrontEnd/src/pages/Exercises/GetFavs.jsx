import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getFavsService } from "../../services";
import { useNavigate } from "react-router-dom";

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
        <section>
            <h1>Favs List</h1>
                {favs.map((e) => {
                    return <ul key={e.id}> 
                        <li>{e["exercise_name"]}</li>
                        <li>{e["exercise_description"]}</li>
                        <li>{e["typology"]}</li>
                        <li>{e["muscle_group"]}</li>
                        <li><img src={`http://localhost:5173/public/exercisePhoto/${e["photo"]}`} alt={e["exercise_description"]}/></li>
                    </ul>
                })}
        </section>
    )
}

export default GetFavs;