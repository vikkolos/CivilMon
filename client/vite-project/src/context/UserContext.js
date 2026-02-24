import React, { useContext } from "react";
import { createContext } from "react";
export const UserContext = createContext();
export default function useUser() {
    return useContext(UserContext)
}
