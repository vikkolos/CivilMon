import { useState } from 'react'
import NavBar from '../components/NavBar'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import ReportIssue from '../pages/ReportIssue'
import UserContextProvider from './context/UserContextProvider.jsx'
import Protected from './Protected'
import RepProfile from '../pages/RepProfile'
import RolecontextProvider from './context/RolecontextProvider'
function App() {
 

  return (  
  <RolecontextProvider>
    <UserContextProvider>
     <NavBar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/ReportIssue' element={<Protected>
        <ReportIssue/>
      </Protected>} />
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/RepProfile' element={<RepProfile/>}/>
     </Routes>     
    </UserContextProvider>
    </RolecontextProvider>
   )
}

export default App
