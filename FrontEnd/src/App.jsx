import { useContext, useEffect, useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/Users/HomePage/HomePage'
import Register from './pages/Users/Register/Register'
import RecoverPassword from './pages/Users/RecoverPassword/RecoverPassword'
import Profile from './pages/Users/Profile/Profile'
import PostExercise from './pages/Exercises/PostExercise/PostExercise'
import PostTraining from './pages/Exercises//PostTraining/PostTraining'
import GetExercises from './pages/Exercises/GetExercises/GetExercises'
import GetExercisesExtended from './pages/Exercises/GetExercisesExtended/GetExercisesExtended'
import ModifyExercise from './pages/Exercises/ModifyExercise/ModifyExercise'
import GetFavs from './pages/Exercises/GetFavs/GetFavs'
import GetOrderLikes from './pages/Exercises/GetOrderLikes/GetOrderLikes'
import AdminRegister from './pages/Users/AdminRegister/AdminRegister'
import LogInUser from './pages/Users/Login/LogInUser'
import ResetPassword from './pages/Users/ResetPassword/ResetPassword'
import EditPassword from './pages/Users/EditPassword/EditPassword'
import EditMail from './pages/Users/EditEmail/EditEmail'
import UserValidation from './pages/Users/UserValidation/UserValidation'
import EmailValidation from './pages/Users/EmailValidation/EmailValidation'
import LogedPage from './pages/Users/LogedPage/LogedPage'
import { AuthContext } from './context/AuthContext'
import { getUserDataService } from './services'


function App() {
  const [info, setInfo] = useState("");
  const {token} = useContext(AuthContext)
  const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const data = await getUserDataService({ token });
      setInfo(data)
      if(typeof(info) === `string`){
        localStorage.removeItem("token")
        navigate("/")
      }
    } catch (error) {

    }
  }

    useEffect(()=>{
     fetchData()
      },[])


  return (
    <>
    <header>
      <Header/>
      </header> 
      <main> 
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/loged' element={<LogedPage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<LogInUser/>}/>
          <Route path='/admin-register' element={<AdminRegister/>}/>
          <Route path='/recover-password' element={<RecoverPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/edit-password' element={<EditPassword/>}/>
          <Route path='/edit-email' element={<EditMail/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/post-exercise' element={<PostExercise/>}/>
          <Route path='/post-training' element={<PostTraining/>}/>
          <Route path='/get-exercises' element={<GetExercises/>}/>
          <Route path='/get-exercises-extended/:idParam' element={<GetExercisesExtended/>}/>
          <Route path='/modify-exercise/:idParam' element={<ModifyExercise/>}/>
          <Route path='/favs' element={<GetFavs/>}/>
          <Route path='/order-likes' element={<GetOrderLikes/>}/>
          <Route path='/user-validation/:regCode' element={<UserValidation/>}/>
          <Route path='/email-validation/:emailCode' element={<EmailValidation/>}/>
          <Route path='/*' element={<p>Página no encontrada</p>}/>
        </Routes>
      </main> 
      <footer> 
        <Footer/>
      </footer>  
    </>
  )
}

export default App
