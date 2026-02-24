import React, { useState,useEffect } from 'react'
import {UserContext} from './UserContext'
import axios from 'axios'
function UserContextProvider({children}) {
    const [user,setUser]= useState(null)
    const [isLoading,setIsLoading]=useState(true)
    useEffect(() => {
      axios.get("http://localhost:3002/api/v1/users/me", { withCredentials: true })
        .then(res =>  setUser(res.data.data.user))
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
    }, []);
  return (
    <UserContext.Provider value={{user,setUser,isLoading,setIsLoading}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider