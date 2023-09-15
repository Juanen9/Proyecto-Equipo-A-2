import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { addLikeService, deleteLikeService, getAllExercisesService, getLikesService } from "../../services";
import { useNavigate } from "react-router-dom";

function GetExercises () {

    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [exercises, setExercises] = useState([]);
    const [liked, setLiked] = useState([])

    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getAllExercisesService({token});
            setExercises(data)
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    },[])


    const fetchLikes = async () => {
        try {
            setLoading(true);
            const data = await getLikesService({token});
            const idLike = data.map((e) => e.id_exercise)
            setLiked([...idLike])
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchLikes();
    },[])



    const handleLike = async (id) =>{
        try {
            if(!liked.includes(id)){
                await addLikeService({token, id});
                setLiked(prevLiked => [...prevLiked, id]);
            } else {
                await deleteLikeService({token, id});
                setLiked(prevLiked => prevLiked.filter(exerciseId => exerciseId !== id));
            }
        } catch (error) {
            setError(error.message);
        }
    }

    const handleImage = async (id) => {
        try {
            setLoading(true);
            navigate(`/get-exercises-extended/${id}`)
            setExercises(data);
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }
    
    

    return (
        <section>
            <h1>Exercise List</h1>
                {exercises.map((e) => {
                    return <ul key={e.id}> 
                        <li>{e["exercise_name"]}</li>
                        <li>{e["exercise_description"]}</li>
                        <li><img onClick={()=>handleImage(e.id)} src={`http://localhost:5173/public/exercisePhoto/${e["photo"]}`} alt={e["description"]}/></li>
                        <button onClick={()=>handleLike(e.id)}>❤</button>
                    </ul>
                })}
        </section>
    )
}

export default GetExercises;