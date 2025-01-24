import { Routes ,Route} from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import { useAuthStore } from "./store/useAuthStore"
import { useEffect } from "react"
// import { axios } from "./lib/axios"

const App = () => {
const {authUser, checkAuth} = useAuthStore()

useEffect(() => {
  checkAuth()
  console.log(authUser)
}, [])


  return (
    <div className=''>
      <Navbar/>
      <Routes>
        <Route path="/" element ={<HomePage/>}/>
        <Route path="/signup" element ={<SignUpPage/>}/>
        <Route path="/login" element ={<LoginPage/>}/>
        <Route path="/settings" element ={<SettingsPage/>}/>
        <Route path="/profile" element ={<ProfilePage/>}/>
      </Routes>
    </div>
  )
}

export default App
