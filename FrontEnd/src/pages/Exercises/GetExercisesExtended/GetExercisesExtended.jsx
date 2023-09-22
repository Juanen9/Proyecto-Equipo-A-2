    import { useContext, useEffect, useState } from "react";
    import { AuthContext } from "../../../context/AuthContext";
    import { addFavService, addLikeService, deleteExerciseService, deleteFavService, deleteLikeService, getAllExercisesExtendedService, getFavsService, getLikesService } from "../../../services";
    import { useNavigate, useParams } from "react-router-dom";
    import "./GetExercisesExtended.css"
    import backArrow from "../../../assets/back-arrow.svg"
    import favIconWhite from "../../../assets/fav-icon-white.svg"
    import favIconYellow from "../../../assets/fav-icon-yellow.svg"
    import likeIconWhite from "../../../assets/like-icon-white.svg"
    import likeIconRed from "../../../assets/like-icon-red.svg"

    function GetExercisesExtended () {

        const navigate = useNavigate();
        const {token} = useContext(AuthContext);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState("");
        const [exercises, setExercises] = useState([]);
        const [liked, setLiked] = useState([]);
        const [fav, setFav] = useState([]);
        const {idParam} = useParams();
        const [deleted, setDeleted] = useState(false);

        console.log(fav)

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


        const fetchFavs = async () => {
            try {
                setLoading(true);
                const data = await getFavsService({token});
                const idFav = data.map((e) => e.id_exercise)
                setFav([...idFav])
            } catch (error) {
                setError(error.message);
            }finally{
                setLoading(false);
            }
        }
    
        useEffect(() => {
            fetchFavs();
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
        
        const handleFav = async (id) =>{
            try {
                if(!fav.includes(id)){
                    await addFavService({token, id});
                    setFav(prevFav => [...prevFav, id]);
                } else {
                    await deleteFavService({token, id});
                    setFav(prevFav => prevFav.filter(exerciseId => exerciseId !== id));
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
            <section className="exercise-extended-section">
                <div className="exercise-extended-section-back-button">
                    <button onClick={handleReturn} className="back-arrow-button"><img src={backArrow} alt="back arrow"/></button>
                </div>
                    {exercises.length > 0 && !deleted ? 
                    (<ul className="exercise-extended-card">
                        <div className="fav-extended-button">
                            <button onClick={()=>handleFav(exercises[0].id)}><img src={fav.includes(exercises[0].id)? favIconYellow:favIconWhite} alt="favorite icon" /></button>
                        </div>
                            
                            <li><img src={`http://localhost:5173/public/exercisePhoto/${exercises[0]["photo"]}`} alt={exercises["description"]}/></li>
                        <div className="exercise-extended-card-container">
                            <li>{exercises[0]["exercise_name"]}</li>
                            <button onClick={()=>handleLike(exercises[0].id)}><img src={liked.includes(exercises[0].id)? likeIconRed:likeIconWhite} alt="like icon"/></button>
                        </div>
                        <div className="typology-muscle">
                            <li>Typology: {exercises[0]["typology"]}</li>
                            <li>Muscle Group: {exercises[0]["muscle_group"]}</li>
                        </div>

                            <li className="exercise-extended-description">{exercises[0]["exercise_description"]}</li>
                            
                    </ul>) : deleted ?(
                <p>Ejercicio eliminado</p>
            ): (
                <p>Loading...</p>
            )}
            {exercises.length > 0 && !deleted ?<button onClick={()=>handleDelete(exercises[0].id)} className="exercise-extended-delete">Delete</button>:null}
            </section>
        )
    }

    export default GetExercisesExtended;