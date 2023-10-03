import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getFavsService, getUserDataService} from "../../../services";
import "./Profile.css";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';


function Profile(){
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [favs, SetFavs] = useState([]);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = favs.length;

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await getUserDataService({ token });
      setValue(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const fetchFavs = async () => {
    try {
      const dataFav = await getFavsService({token});
      SetFavs(dataFav)
    } catch (error) {
      setError(error.message);
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };    

  useEffect(() => {
    fetchData();
    fetchFavs();
  }, [])



  return (
    <section className="profile-section">
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
            <Typography>{favs[activeStep] ? favs[activeStep]["exercise_name"]: null}</Typography>
            </Paper>
            <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}
            >
                {favs[activeStep] ? 
                <img src={`http://localhost:5173/public/exercisePhoto/${favs[activeStep]["photo"]}`} alt={favs[activeStep]["exercise_description"]} className='profile-box-image'/>: null}
            </Box>
            <MobileStepper
                variant="dots"
                steps={maxSteps}
                position="static"
                activeStep={activeStep}
                nextButton={
                <Button
                    size="small"
                    onClick={handleNext}
                    disabled={activeStep === maxSteps - 1}
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
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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
    </section>
  );
}


export default Profile