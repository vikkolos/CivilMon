import React from "react";
import { useEffect,useState } from "react";
import { roleContext } from "./RoleCOntext";
 function RolecontextProvider({children}){
    const [Role,setRole]=useState("citizen");
    return (
        <roleContext.Provider value={{Role,setRole}}>
            {children}
        </roleContext.Provider>
    )
 }
 export default RolecontextProvider;