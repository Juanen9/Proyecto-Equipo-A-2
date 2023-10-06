import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getTraining } from "../../../services";
import { useNavigate } from "react-router-dom";
import BackArrow from '@mui/icons-material/KeyboardBackspaceSharp';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import "./GetTraining.css";

function GetTraining () {

    const navigate = useNavigate();
    const {token} = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [training, setTraining] = useState([])
    const theme = useTheme();
    const [activeStepTraining, setActiveStepTraining] = React.useState(0);
    const maxStepsTraining= training.length


    const fetchData = async () => {
        try {
            setLoading(true);
            const data = await getTraining({token});
            setTraining(data)
        } catch (error) {
            setError(error.message);
        }finally{
            setLoading(false);
        }
    }

    const handleReturn = () => {
        window.history.back();
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

    const handleNextTraining = () => {
        setActiveStepTraining((prevActiveStepTraining) => prevActiveStepTraining + 1);
      };
    
      const handleBackTraining = () => {
        setActiveStepTraining((prevActiveStepTraining) => prevActiveStepTraining - 1);
      };

    useEffect(() => {
        fetchData();
    },[])

    console.log(training)

    return (
        <section className="training-section">
            <div className="exercise-extended-container-back-button">
                <IconButton onClick={handleReturn} className="exercise-extended-back-button">
                    <BackArrow/>
                </IconButton>
            </div>
            <h1 className="training">Training List</h1>
            
            <div className="training-list-container">
                {training.map((e) => {
                    return <ul className="training-card-container" key={e.id}>
                        <li>{e.id}</li>
                        <li className="exercise-name-training">{e["training_name"]}</li>
                        <li className="exercise-description-training">{e["training_description"]}</li>
                        <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
              <Paper
                  square
                  elevation={0}
                  sx={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 50,
                  pl: 2,
                  bgcolor: 'background.default',
                  }}
              >
              <Typography>{training[activeStepTraining] ? 
              <> 
              {training[activeStepTraining]["exercise_name"]}
              </>
              : null} </Typography>
              </Paper>
              <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}
              >
                  {training[activeStepTraining] ? 
                  <img onClick={() => handleImage(training[e.id][activeStepTraining]["id_exercise"])} src={`http://localhost:5173/public/exercisePhoto/${training[0].exercise[activeStepTraining]["photo"]}`} alt={training[activeStepTraining]["exercise_description"]} className='profile-box-image'/>: null}
              </Box>
              <MobileStepper
                  variant="dots"
                  steps={maxStepsTraining}
                  position="static"
                  activeStep={activeStepTraining}
                  nextButton={
                  <Button
                      size="small"
                      onClick={handleNextTraining}
                      disabled={activeStepTraining === maxStepsTraining - 1}
                  >
                      Next
                      {theme.direction === 'rtl' ? (
                      <KeyboardArrowLeft />
                      ) : (
                      <KeyboardArrowRight />
                      )}
                  </Button>
                  }
                  backButton={
                  <Button size="small" onClick={handleBackTraining} disabled={activeStepTraining === 0}>
                      {theme.direction === 'rtl' ? (
                      <KeyboardArrowRight />
                      ) : (
                      <KeyboardArrowLeft />
                      )}
                      Back
              </Button>
              }
          />
          </Box>
                    </ul>
                })}
            </div>
        </section>
    )
}

export default GetTraining;