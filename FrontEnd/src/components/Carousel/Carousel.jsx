import * as React from 'react';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useState } from 'react';


function Carousel (dataExercise){
    const [active, setActive] = useState(false);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps= dataExercise.exercise.length 


const handleImage = async (id) => {
    try {
        navigate(`/get-exercises-extended/${id}`);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
}



const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };



  return (
    <>
    {dataExercise.exercise[activeStep] ? 
    
    
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
              <Typography>{dataExercise.exercise[activeStep] ? 
              <> 
              {dataExercise.exercise[activeStep]["exercise_name"]}
              </>
              : null} </Typography>
              </Paper>
              <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}
              >
                  {dataExercise.exercise[activeStep] ? 
                  <img onClick={() => handleImage(dataExercise.exercise[activeStep]["id"])} src={`http://localhost:5173/public/exercisePhoto/${dataExercise.exercise[activeStep]["photo"]}`} alt={dataExercise.exercise[activeStep]["exercise_description"]} className='profile-box-image'/>: null}
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
          
          :null}
          </>
          )
            }
export default Carousel;