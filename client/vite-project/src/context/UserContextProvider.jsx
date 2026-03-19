import React, { useState, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

function UserContextProvider({ children }) {

  const [user, setUser] = useState(null);

  // ✅ read role from localStorage
  const [role, setRole] = useState(localStorage.getItem("role"));

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    if (!role) {
      setIsLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {

        if (role === "citizen") {

          const res = await axios.get(
            "https://civil-mon.vercel.app/api/v1/users/me",
            { withCredentials: true }
          );

          setUser(res.data.data.user);

        } else {

          const res = await axios.get(
            "https://civil-mon.vercel.app/api/v1/rep/me",
            { withCredentials: true }
          );
          console.log(res)
          setUser(res.data.data.user);

        }

      } catch (error) {

        setUser(null);

      } finally {

        setIsLoading(false);

      }
    };

    fetchUser();

  }, [role]);

  return (
    <UserContext.Provider
      value={{ user, setUser, role, setRole, isLoading, setIsLoading }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;