import React, { useEffect } from 'react'
import useUser from './context/UserContext'
import { useNavigate } from 'react-router-dom'

function Protected({children}) {
    const navigate= useNavigate()
    const {user,isLoading} = useUser()
    useEffect(()=>{
        if(!isLoading && !user){
            navigate("/Login")
        } 
            
    },[user,isLoading])
    if (isLoading) {
        return (
          <div className="h-screen flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
          </div>
        );
      }  
  return (
   children
  )
}

export default Protected