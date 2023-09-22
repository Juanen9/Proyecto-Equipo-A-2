import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Users/HomePage/HomePage'
import Register from './pages/Users/Register/Register'
import RecoverPassword from './pages/Users/RecoverPassword/RecoverPassword'
import Profile from './pages/Users/Profile/Profile'
import PostExercise from './pages/Exercises/PostExercise/PostExercise'
import PostTraining from './pages/Exercises//PostTraining/PostTraining'
import GetExercises from './pages/Exercises/GetExercises/GetExercises'
import GetExercisesExtended from './pages/Exercises/GetExercisesExtended'
import ModifyExercise from './pages/Exercises/ModifyExercise'
import GetFavs from './pages/Exercises/GetFavs'
import GetOrderLikes from './pages/Exercises/GetOrderLikes'
import AdminRegister from './pages/Users/AdminRegister/AdminRegister'
import LogInUser from './pages/Users/Login/LogInUser'
import ResetPassword from './pages/Users/ResetPassword'
import EditPassword from './pages/Users/EditPassword/EditPassword'
import EditMail from './pages/Users/EditEmail/EditEmail'
import UserValidation from './pages/Users/UserValidation'
import EmailValidation from './pages/Users/EmailValidation'
import LogedPage from './pages/Users/LogedPage/LogedPage'

function App() {
  const [count, setCount] = useState(0)

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
          <Route path='/modify-exercise' element={<ModifyExercise/>}/>
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
