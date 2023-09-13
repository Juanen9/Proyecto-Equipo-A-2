import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getAllExercisesService } from "../../services";

function GetExercises () {

    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [exercises, setExercises] = useState([]);

    console.log(exercises);

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


    return (
        <section>
            <h1>Exercise List</h1>
                {exercises.map((e) => {
                    return <ul>
                        <li>{e.id}</li>
                        <li>{e["exercise_name"]}</li>
                        <li>{e["exercise_description"]}</li>
                        <li><img src={`http://localhost:3001/uploads/exercisePhoto/${e["photo"]}`} alt={e["description"]}/></li>
                    </ul>
                })}
        </section>
    )
}

export default GetExercises;

/*"id": 1,
            "exercise_name": "Dominadas",
            "exercise_description": "Entrenamiento de espalda",
            "photo": "a85f05fe-4205-4240-9017-3ff6406fef2d_avatar.jpg",
            "typology": "Pull",
            "muscle_group": "Espalda" */