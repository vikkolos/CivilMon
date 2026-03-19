import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import useUser from "../src/context/UserContext";
import { useNavigate } from "react-router-dom";
import useRole from "../src/context/RoleCOntext";

function Login() {
  const [UserData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { setRole } = useRole();
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res;

      try {
        console.log("Trying citizen login")
        // Try citizen login first
        res = await axios.post(
          "https://civil-mon.vercel.app/api/v1/user/login",
          UserData,
          { withCredentials: true }
        );

        setRole("citizen");
        localStorage.setItem("role", "citizen");

      } catch (err) {
        // If citizen login fails → try representative login
        console.log("calling rep")
        res = await axios.post(
          "https://civil-mon.vercel.app/api/v1/rep/login",
          UserData,
          { withCredentials: true }
        );

        setRole("representative");
        localStorage.setItem("role", "representative");
        // console.log("Role in context:", Role)
        console.log("Role in storage:", localStorage.getItem("role"))
      }

      const loggedUser = res.data.data.user;

      setUser(loggedUser);

      setUserData({
        email: "",
        password: "",
      });

      navigate("/");

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-[1550px] mx-auto">
      <div className="mx-auto p-5 flex justify-center items-center flex-col">
        <form
          className="sm:w-[400px] w-[96%] max-w-[400px] mx-auto"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl sm:text-3xl font-semibold my-3">
            Welcome Back
          </h2>

          <span className="mt-2 text-md inline-block my-3">
            Login to continue reporting and tracking community issues
          </span>

          <label htmlFor="mailman" className="block text-md font-medium mt-3">
            Email
          </label>

          <input
            type="email"
            id="mailman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md placeholder:font-bold placeholder:text-sm focus:outline-none focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
            placeholder="Enter your Email"
            name="email"
            onChange={handleChange}
            value={UserData.email}
            required
          />

          <label htmlFor="passman" className="block text-md font-medium mt-3">
            Password
          </label>

          <input
            type="password"
            id="passman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
            placeholder="Enter your Password"
            name="password"
            onChange={handleChange}
            value={UserData.password}
            required
          />

          <button
            type="submit"
            className="max-w-md w-full rounded-md bg-(--main-color) h-auto py-2 text-white mt-7 text-center hover:cursor-pointer"
          >
            Log in
          </button>

          <p className="text-center text-sm mt-3">
            Don’t have an account?{" "}
            <Link
              to="/Signup"
              className="text-[--main-color] hover:underline inline-block hover:text-(--main-color) duration-200 transition-all"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;