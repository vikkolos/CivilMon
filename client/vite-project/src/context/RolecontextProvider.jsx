import React, { useState } from "react";
import { roleContext } from "./RoleCOntext";

function RolecontextProvider({ children }) {

  const [Role, setRoleState] = useState(() => {
    return localStorage.getItem("role") || null;
  });

  const setRole = (role) => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
    setRoleState(role);
  };

  return (
    <roleContext.Provider value={{ Role, setRole }}>
      {children}
    </roleContext.Provider>
  );
}

export default RolecontextProvider;