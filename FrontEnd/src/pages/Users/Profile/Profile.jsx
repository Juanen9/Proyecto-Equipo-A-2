import * as React from 'react';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getFavsService, getLikesService, getUserDataService} from "../../../services";
import "./Profile.css";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useNavigate } from 'react-router-dom';
import LikeIcon from '@mui/icons-material/FavoriteSharp';
import IconButton from '@mui/material/IconButton';
import FavIcon from '@mui/icons-material/StarPurple500Sharp';
import vestuario from '../../../assets/vestuario.jpg'
import brush from '../../../assets/brush.png'
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function Profile(){
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [value, setValue] = useState("");
  const [favs, SetFavs] = useState([]);
  const [likes, SetLikes] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const [activeStepFav, setActiveStepFav] = React.useState(0);
  const [activeStepLike, setActiveStepLike] = React.useState(0);
  const maxStepsFav = favs.length
  const maxStepsLike = likes.length;

  const divStyle = {
    backgroundImage: `url(${vestuario})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: 'auto',
  };
  
  const brushFondo = {
    backgroundImage: `url(${brush})`,
    backgroundSize: 'cover',
    width: 'auto'
  };
  
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
  
  const fetchLikes = async () => {
    try {
      const dataLike = await getLikesService({token});
      SetLikes(dataLike)
    } catch (error) {
      setError(error.message);
    }
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

const handleFavClick = async (id) => {
  try {
      navigate(`/favs`);
  } catch (error) {
      setError(error.message);
  } finally {
      setLoading(false);
  }
}

const handleLikeClick = async (id) => {
  try {
      navigate('/likes')
  } catch (error) {
      setError(error.message);
  } finally {
      setLoading(false);
  }
}

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  };
}

  const handleNextFav = () => {
    setActiveStepFav((prevActiveStepFav) => prevActiveStepFav + 1);
  };

  const handleBackFav = () => {
    setActiveStepFav((prevActiveStepFav) => prevActiveStepFav - 1);
  };    

  const handleNextLike = () => {
    setActiveStepLike((prevActiveStepLike) => prevActiveStepLike + 1);
  };

  const handleBackLike = () => {
    setActiveStepLike((prevActiveStepLike) => prevActiveStepLike - 1);
  };

  useEffect(() => {
    fetchData();
    fetchFavs();
    fetchLikes();
  }, [])

console.log(favs)

  return (
    <section className="profile-section" style={divStyle}>
        <div className='profile-user-data'>
          {value[0] ? (
            <>
              {value[0]["avatar"] ? (
                <img
                  src={`http://localhost:5173/public/avatarUser/${value[0]["avatar"]}`}
                  alt="Preview"
                />
              ) : (
                <Stack direction="row" spacing={2} >
                  <Avatar {...stringAvatar(value[0]["user_name"])} style={{ width: '160px', height: '160px', fontSize: '6em' }}/>
                </Stack>
              )}
              <p className='profile-name' style={brushFondo}>{value[0]["user_name"]}</p>
              <p className='profile-email' style={brushFondo}>{value[0]["email"]}</p>
            </>
          ) : null}
        </div>
      <div className='profile-images-container'>
        <div className='profile-favs-images'>
          
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
              <Typography>{favs[activeStepFav] ? 
              <>
              <FavIcon/>{favs[activeStepFav]["exercise_name"]}
              </> : null}</Typography>
              </Paper>
              <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}
              >
                  {favs[activeStepFav] ? 
                  <img onClick={() => handleImage(favs[activeStepFav]["id_exercise"])} src={`http://localhost:5173/public/exercisePhoto/${favs[activeStepFav]["photo"]}`} alt={favs[activeStepFav]["exercise_description"]} className='profile-box-image'/>: null}
              </Box>
              <MobileStepper
                  variant="dots"
                  steps={maxStepsFav}
                  position="static"
                  activeStep={activeStepFav}
                  nextButton={
                  <Button
                      size="small"
                      onClick={handleNextFav}
                      disabled={activeStepFav === maxStepsFav - 1}
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
                  <Button size="small" onClick={handleBackFav} disabled={activeStepFav === 0}>
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
        </div>
        <div className='profile-likes-images'>
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
              <Typography>{likes[activeStepLike] ? 
              <>
              <LikeIcon/>{likes[activeStepLike]["exercise_name"]}
              </>: null}</Typography>
              </Paper>
              <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}
              >
                  {likes[activeStepLike] ? 
                  <img onClick={() => handleImage(likes[activeStepLike]["id_exercise"])} src={`http://localhost:5173/public/exercisePhoto/${likes[activeStepLike]["photo"]}`} alt={likes[activeStepLike]["exercise_description"]} className='profile-box-image'/>: null}
              </Box>
              <MobileStepper
                  variant="dots"
                  steps={maxStepsLike}
                  position="static"
                  activeStep={activeStepLike}
                  nextButton={
                  <Button
                      size="small"
                      onClick={handleNextLike}
                      disabled={activeStepLike === maxStepsLike - 1}
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
                  <Button size="small" onClick={handleBackLike} disabled={activeStepLike === 0}>
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
        </div>
          <div className='profile-icons-container'>
            <IconButton onClick={handleFavClick} className='profile-icon'>
                <FavIcon />
                <span>Go to My Favs</span>
            </IconButton>
            
            <IconButton onClick={handleLikeClick} className='profile-icon'>
                <LikeIcon />
                <span>Go to My Likes</span>
            </IconButton>
          </div>
        </div>
    </section>
  );
}


export default Profile