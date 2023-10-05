import { useContext, useEffect, useState } from "react";
import { getOrderLikesService } from "../../../services";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function GetOrderLikes () {

    const {token} = useContext(AuthContext)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [order, setOrder] = useState([]);
    const navigate = useNavigate();

    

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getOrderLikesService({token});
            setOrder(data)
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
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
            <h1 className="favs">Most Liked Exercises</h1>
            <div className="fav-list-container">
                {order.map((e, index) => {
                    return <ul className="favs-card-container" key={index}> 
                        <li className="exercise-name-favs">{e.likes} ❤️</li>
                        <li className="exercise-fav-photo"><img onClick={() => handleImage(e.id)} src={`http://localhost:5173/public/exercisePhoto/${e.photo}`} alt={e["exercise_name"]}/></li>
                        <li className="exercise-description-favs">{e["exercise_name"]}</li>
                    </ul>
                })} 
            </div>
        </section>
    )
}

export default GetOrderLikes;