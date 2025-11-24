import { useState } from 'react'
import NavBar from '../components/NavBar'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Signup from '../pages/Signup'
import { Route,Routes } from 'react-router-dom'
import './App.css'
import ReportIssue from '../pages/ReportIssue'

function App() {
 

  return (
    <>
     <NavBar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Signup' element={<Signup/>}/>
      <Route path='/ReportIssue' element={<ReportIssue/>}/>
     </Routes>

    </>
  )
}

export default App
