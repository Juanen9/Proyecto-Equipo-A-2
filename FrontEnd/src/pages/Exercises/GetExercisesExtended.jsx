    import { useContext, useEffect, useState } from "react";
    import { AuthContext } from "../../context/AuthContext";
    import { addLikeService, deleteExerciseService, deleteLikeService, getAllExercisesExtendedService } from "../../services";
    import { useNavigate, useParams } from "react-router-dom";

    function GetExercisesExtended () {

        const navigate = useNavigate();
        const {token} = useContext(AuthContext);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const [exercises, setExercises] = useState([]);
        const [liked, setLiked] = useState([]);
        const {idParam} = useParams();
        const [deleted, setDeleted] = useState(false);

        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getAllExercisesExtendedService({token, idParam});
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

        const handleDelete = async (id) => {
            try {
                setLoading(true);
                if(window.confirm('Are you sure?')){
                await deleteExerciseService({token, id});
                
                }
                
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
                navigate("/get-exercises");
            }
        }

        const handleReturn = () => {
            navigate("/get-exercises");
        }
        

        return (
            <section>
                <h1>Exercise</h1>
                    {exercises.length > 0 && !deleted ? (<ul>
                        <li>{exercises[0]["exercise_name"]}</li>
                        <li>{exercises[0]["exercise_description"]}</li>
                        <li><img src={`http://localhost:5173/public/exercisePhoto/${exercises[0]["photo"]}`} alt={exercises["description"]}/></li>
                        <button onClick={()=>handleLike(exercises[0].id)}>❤</button>
                        <button onClick={handleReturn}>Back to Exercise List</button>
                    </ul>) : deleted ?(
                <p>Ejercicio eliminado</p>
            ): (
                <p>Loading...</p>
            )}
            {exercises.length > 0 && !deleted ?<button onClick={()=>handleDelete(exercises[0].id)}>Delete</button>:null}
            </section>
        )
    }

    export default GetExercisesExtended;