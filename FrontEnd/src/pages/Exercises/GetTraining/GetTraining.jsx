import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { deleteTrainingService, getTraining, getUserDataService } from "../../../services";
import BackArrow from '@mui/icons-material/KeyboardBackspaceSharp';
import Carousel from '../../../components/Carousel/Carousel';
import "./GetTraining.css";
import { useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


function GetTraining () {
    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [training, setTraining] = useState([]);
    const [deleted, setDeleted] = useState(false)
    const [tokenValidation, setTokenValidation] = useState("")
    const [role, setRole] = useState("");


    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getTraining({token});
            setTraining(data)
        } catch (error) {
            setError(error.message);
            navigate("/")
        }finally{
            setLoading(false);
        }
    }

    const handleDelete = async (id) => {
        try {
            setLoading(true);
             
            if(window.confirm('Are you sure?')){
            setTraining (p => p.filter(e => e.id != id))
            await deleteTrainingService({token, id});
            }           
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    const handleReturn = () => {
        window.history.back();
     }

    const handleNavigate = async (id) => {
    try {
        navigate(`/modify-training/${id}`);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
    }

     const fetchDataToken = async () => {
        const data = await getUserDataService({token});
        const tokenAdmin = data[0].token;
        const role = data[0].role;
        setTokenValidation(tokenAdmin);
        setRole(role)
      };

    useEffect(() => {
        fetchData();
        fetchDataToken();
    },[])


    return (
        <section className="training-section">
            <h1 className="training-title">Training List</h1> 
            <div className="training-list-container">
                {training.length > 0 ? training.map((e) => {
                    return  <ul className="training-card-container" key={e.id}>
                        <li className="training-name"><p onClick={() => handleNavigate(e.id)}>{e["training_name"]}</p>                         
                        {role == "admin" ? <> 
                        <IconButton sx={{ml:"auto"}} aria-label="delete">
                        <DeleteIcon  onClick={()=>handleDelete(training[0].id)}/>
                        </IconButton>
                        </>:null}
                        </li>
                        {e.exercise ? <Carousel exercise = {e.exercise}/> : null}
                        <li className="training-description">{e["training_description"]}</li>
                    </ul>
                }):<p> No training found</p>}
            </div>
        </section>
    )
}

export default GetTraining;