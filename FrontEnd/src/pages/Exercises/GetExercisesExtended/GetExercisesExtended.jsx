    import { useContext, useEffect, useState } from "react";
    import { AuthContext } from "../../../context/AuthContext";
    import { addFavService, addLikeService, deleteExerciseService, deleteFavService, deleteLikeService, getAllExercisesExtendedService, getFavsService, getLikesService, getUserDataService } from "../../../services";
    import { useNavigate, useParams } from "react-router-dom";
    import "./GetExercisesExtended.css"
    import BackArrow from '@mui/icons-material/KeyboardBackspaceSharp';
    import LikeIcon from '@mui/icons-material/FavoriteSharp';
    import IconButton from '@mui/material/IconButton';
    import FavIcon from '@mui/icons-material/StarPurple500Sharp';
import { Icon } from "@mui/material";

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
        const [tokenValidation, setTokenValidation] = useState("");
        const [role, setRole] = useState("");

        const fetchDataToken = async () => {
            const data = await getUserDataService({token});
            const tokenAdmin = data[0].token;
            const role = data[0].role;
            setTokenValidation(tokenAdmin);
            setRole(role)
          };

          useEffect(() => {
            fetchDataToken();
          },[])

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

        const handleModifyExerciseButton = async (idParam1) => {
            try {
                navigate(`/modify-exercise/${idParam1}`);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        

        return (
            <section className="exercise-extended-section">
                <div className="exercise-extended-container-back-button">
                    <IconButton onClick={handleReturn} className="exercise-extended-back-button">
                        <BackArrow/>
                    </IconButton>
                </div>
                    {exercises.length > 0 && !deleted ? 
                    (<ul className="exercise-extended-card">
                        <div className="fav-extended-button">
                            <IconButton onClick={() => handleFav(exercises[0].id)} className={fav.includes(exercises[0].id) ? 'fav' : 'unfav'}>
                                <FavIcon/>
                            </IconButton>
                        </div>
                            
                            <li><img src={`http://localhost:5173/public/exercisePhoto/${exercises[0]["photo"]}`} alt={exercises["description"]}/></li>
                        <div className="exercise-extended-card-container">
                            <li>{exercises[0]["exercise_name"]}</li>
                            <IconButton onClick={() => handleLike(exercises[0].id)} className={liked.includes(exercises[0].id) ? 'liked' : 'disliked'}>
                                <LikeIcon/>
                            </IconButton>

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
            {tokenValidation == token && role == "admin" && (exercises.length > 0 && !deleted)  ? 
            <div className="exercise-extended-button-container">
                <button onClick={()=>handleDelete(exercises[0].id)} className="exercise-extended-delete">Delete</button>
                <button onClick={() => handleModifyExerciseButton(exercises[0].id)} className="exercise-extended-modify">Modify Exercise</button>
            </div>:null}
            </section>
        )
    }

    export default GetExercisesExtended;