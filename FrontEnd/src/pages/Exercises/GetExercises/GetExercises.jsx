import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { addLikeService, deleteLikeService, getAllExercisesService, getLikesService } from "../../../services";
import { useNavigate } from "react-router-dom";
import "./GetExercises.css";
import likeIconWhite from "../../../assets/like-icon-white.svg"
import likeIconRed from "../../../assets/like-icon-red.svg"
import lottie from "lottie-web"; // Importa lottie-web
import animationData from "../../../assets/animation_lmltug6s.json"; // Importa tu archivo de animación JSON

function GetExercises() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [exercises, setExercises] = useState([]);
    const [liked, setLiked] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        if (loading) {
            // Configura la animación cuando loading sea true
            const container = document.getElementById("lottie-container");
            const animation = lottie.loadAnimation({
                container,
                animationData, // Tu archivo de animación JSON importado
                renderer: "svg", // Puedes elegir "canvas" o "html" según tus necesidades
                loop: true,
                autoplay: true,
            });

            // Detén la animación cuando ya no sea necesaria (por ejemplo, después de completar la carga)
            return () => {
                animation.stop();
                animation.destroy();
            };
        }
    }, [loading]);

    const fetchData = async () => {
        setTimeout(async () => {
        try {
            const data = await getAllExercisesService({ token });
            setExercises(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, 5000);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const fetchLikes = async () => {
        setTimeout(async () => {
        try {
            const data = await getLikesService({ token });
            const idLike = data.map((e) => e.id_exercise)
            setLiked([...idLike]);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, 5000);
    }

    useEffect(() => {
        fetchLikes();
    }, [])

    const handleLike = async (id) => {
        setTimeout(async () => {
        try {
            if (!liked.includes(id)) {
                await addLikeService({ token, id });
                setLiked(prevLiked => [...prevLiked, id]);
            } else {
                await deleteLikeService({ token, id });
                setLiked(prevLiked => prevLiked.filter(exerciseId => exerciseId !== id));
            }
        } catch (error) {
            setError(error.message);
        }
    }, 5000);
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

    const handleFilter = (e) => {
        const data = e.target.value
        setFilter(data);
    }

    const filterExercises = exercises.filter((exercise) =>
        exercise["exercise_name"].toLowerCase().includes(filter.toLowerCase()) ||
        exercise["typology"].toLowerCase().includes(filter.toLowerCase()) ||
        exercise["muscle_group"].toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <section className="get-exercise-section">
            <h1 className="exercise-list-title">Exercise List</h1>
            <form className="exercise-list-form">
                <fieldset>
                    <input id="filter" name="filter" type="text" placeholder="Search exercise..." onChange={handleFilter}></input>
                </fieldset>
            </form>
            {loading ? (
                <div id="lottie-container">
                    {/* Este div contendrá la animación mientras carga */}
                </div>
            ) : (
                filterExercises.length > 0 ? filterExercises.map((e) => (
                    <ul key={e.id} className="exercise-card">
                        <li><img onClick={() => handleImage(e.id)} src={`http://localhost:5173/public/exercisePhoto/${e["photo"]}`} alt={e["description"]} /></li>
                        <div className="exercise-card-container">
                            <li>{e["exercise_name"]}</li>
                            <button onClick={() => handleLike(e.id)}>
                                <img src={liked.includes(e.id) ? likeIconRed : likeIconWhite} alt="like icon" />
                            </button>
                        </div>
                    </ul>
                )) : <p>Exercises not found</p>
            )}
        </section>
    )
}

export default GetExercises;
