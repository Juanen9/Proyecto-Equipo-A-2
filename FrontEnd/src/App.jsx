import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/Users/HomePage'
import Register from './pages/Users/Register'
import RecoverPassword from './pages/Users/RecoverPassword'
import Profile from './pages/Users/Profile'
import PostExercise from './pages/Exercises/PostExercise'
import PostTraining from './pages/Exercises/PostTraining'
import GetExercises from './pages/Exercises/GetExercises'
import GetExercisesExtended from './pages/Exercises/GetExercisesExtended'
import ModifyExercise from './pages/Exercises/ModifyExercise'
import GetFavs from './pages/Exercises/GetFavs'
import GetOrderLikes from './pages/Exercises/GetOrderLikes'
import AdminRegister from './pages/Users/AdminRegister'
import LogInUser from './pages/Users/LogInUser'
import ResetPassword from './pages/Users/ResetPassword'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<LogInUser/>}/>
          <Route path='/admin-register' element={<AdminRegister/>}/>
          <Route path='/recover-password' element={<RecoverPassword/>}/>
          <Route path='/reset-password' element={<ResetPassword/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/post-exercise' element={<PostExercise/>}/>
          <Route path='/post-training' element={<PostTraining/>}/>
          <Route path='/get-exercises' element={<GetExercises/>}/>
          <Route path='/get-exercises-extended' element={<GetExercisesExtended/>}/>
          <Route path='/modify-exercise' element={<ModifyExercise/>}/>
          <Route path='/favs' element={<GetFavs/>}/>
          <Route path='/order-likes' element={<GetOrderLikes/>}/>
        </Routes>
      <Footer/>
    </>
  )
}

export default App
