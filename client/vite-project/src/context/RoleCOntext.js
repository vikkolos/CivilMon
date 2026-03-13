import { createContext,useContext } from "react";
import React from "react";
export const roleContext = createContext();
 export default function useRole(){
    return useContext(roleContext);
 }