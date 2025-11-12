import React from "react";
import { Link,NavLink } from "react-router-dom";
function Login() {
  return (
    <>
      <div className="w-xl mx-auto p-5 translate-x-10">
        <form action="">
          <h2 className="text-3xl font-semibold my-3">Welcome Back</h2>
          <span className="mt-2 text-md inline-block my-3">
            Login to continue reporting and tracking community issues
          </span>
          <label htmlFor="mailman" className="block text-md font-medium mt-3 ">
            Email
          </label>
          <input
            type="email"
            id="mailman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md placeholder:font-bold placeholder:text-sm focus:outline-none focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
            placeholder="Enter your Email"
          />
          <label htmlFor="passman" className="block text-md font-medium mt-3">
            Password
          </label>
          <input
            type="password"
            id="passman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
            placeholder="Enter your Password"
          />
          <button
            type="Submit"
            className="max-w-md w-full rounded-md bg-(--main-color) h-auto py-2 text-white  mt-7 text-center hover:cursor-pointer"
          >
            Log in
          </button>
          <div className="flex gap-0.5 items-center mx-auto mt-1">
            <p className="text-center font-normal text-sm inline-block pl-30 ">
              Dont have an account?
            </p>
            <Link
              to="/Signup"
              className="inline-block hover:text-(--main-color) transition duration-200 "
            >
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
