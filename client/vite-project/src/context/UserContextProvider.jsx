import React, { useState,useEffect } from 'react'
import {UserContext} from './UserContext'
import axios from 'axios'
import useRole from './RoleCOntext'
function UserContextProvider({children}) {
    const [user,setUser]= useState(null)
    const {Role}=useRole();
    const [isLoading,setIsLoading]=useState(true)
    useEffect(() => {
      if(Role==="citizen"){
        axios.get("http://localhost:3002/api/v1/users/me", { withCredentials: true })
        .then(res =>  setUser(res.data.data.user))
        .catch(() => setUser(null))
        .finally(() => setIsLoading(false));
      }
      else{
          axios.get("http://localhot:3002/api/v1/rep/me",{withCredentials:true})
          .then(res =>  setUser(res.data.data.user))
          .catch(() => setUser(null))
          .finally(() => setIsLoading(false));
      }
    }, []);
  return (
    <UserContext.Provider value={{user,setUser,isLoading,setIsLoading}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider