import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import axios from "axios";
function Signup() {
  const navigate = useNavigate()
  const [userType,setUserType] = useState("citizen");
  const [UserData,setUserData] = useState({
    fullName:"",
    email:"",
    password:"",
    aadharnumber:"",
  })
  const [RepData,setRepData] = useState({
    fullName:"",
    email:"",
    password:"",
    aadharnumber:"",
    state:"",
    district:"",
    wardnumber:"",
  })

  const handleSubmit = async (e)=>{
    e.preventDefault(); 
   try {
     let data = userType==="citizen"?UserData:RepData; 
     const res = await axios.post("http://localhost:3002/api/v1/users/registerUser",UserData);
     console.log(res);
     navigate("/Login")

   } catch (error) {
      console.log(error)
   }
    userType ==="citizen"?setUserData({
      fullName:"",
      email:"",
      password:"",
      aadharnumber:"",
    }):setUserData({
      fullName:"",
      email:"",
      password:"",
      aadharnumber:"",
      state:"",
      district:"",
      wardnumber:"",
    });

  }
 const handleChange =(e)=>{
  const {name, value} = e.target
  if(userType=="citizen"){
    setUserData(prev =>({
      ...prev,
      [name]:value
    }))
  }
  else{
    setRepData(prev=>({
      ...prev,
      [name]:value
    }))
  }
 }

  return (
    <>
    <div className=" mx-auto no-scrollbar flex justify-center items-center p-5 ">
        <form action="  " onSubmit={handleSubmit} className="sm:w-[400px] w-[80%] mx-auto">
          <h2 className="text-2xl font-semibold my-3 md:text-3xl">Create Account</h2>
          <span className="mt-2 text-md inline-block my-3">
            Join our community to report and track local issues
          </span>
          <div className="flex gap-5">
            <button type="button" className={`m-1 px-4 py-0.5 text-center rounded-lg  font-medium pb-1 ${userType=="citizen"?"bg-(--main-color) text-white":"bg-(--but-bg-na)"}`}  onClick={() => setUserType("citizen")}>Citizen</button>
            <button type="button" className={`m-1 px-4 py-0.5 text-center rounded-lg  font-medium pb-1 ${userType=="representative"?"bg-(--main-color) text-white":"bg-(--but-bg-na)"}`}  onClick={() => setUserType("representative")}>Representative</button>           
          </div>
          <label htmlFor="nameman" className="block text-md font-medium mt-3">
            Full name
          </label>
          <input
            type="String"
            id="nameman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
            placeholder="Enter your Fullname"
            name="fullName"
            onChange={handleChange}
            required
            value={UserData.fullName}
          />
          <label htmlFor="mailman" className="block text-md font-medium mt-3 ">
            Email
          </label>
          <input
            type="email"
            id="mailman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md placeholder:font-bold placeholder:text-sm focus:outline-none focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
            placeholder="Enter your Email"
            name="email"
            onChange={handleChange}
            required
            value={UserData.email}
          />
          <label htmlFor="passman" className="block text-md font-medium mt-3">
            Password
          </label>
          <input
            type="password"
            id="passman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
            placeholder="Create Password"
            name="password"
            onChange={handleChange}
            required
            value={UserData.password}
          />
          <label htmlFor="aadharman" className="block text-md font-medium mt-3">
            Aadhar-Number
          </label>
          <input
            type="password"
            id="aadharman"
            className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)
            placeholder:tracking-widest"
            placeholder="xxxx-xxxx-xxxx"
            name="aadharnumber"
            onChange={handleChange}
            required
            value={UserData.aadharnumber}
          />
          {(userType=="representative")&&(
          <>
            <label htmlFor="aadharman" className="block text-md font-medium mt-3">
            State
            </label>
            <input
              type="password"
              id="aadharman"
              className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
              placeholder="Enter State"
            />
            <label htmlFor="aadharman" className="block text-md font-medium mt-3">
            District
            </label>
            <input
              type="password"
              id="aadharman"
              className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
              placeholder="Enter District"
            />
            <label htmlFor="aadharman" className="block text-md font-medium mt-3">
            Ward-Number
            </label>
            <input
              type="password"
              id="aadharman"
              className="w-full border-none rounded px-3 py-2 transition duration-300 max-w-md focus:outline-none placeholder:font-bold placeholder:text-sm focus:ring mt-1.5 bg-[#F1F1F1] focus:ring-(--main-color)"
              placeholder="Enter Ward-Number"
            />
          </> 
          )

          }
          <button
            type="Submit"
            className="max-w-md w-full rounded-md bg-(--main-color) h-auto py-2 text-white  mt-7 text-center hover:cursor-pointer"
          >
            Create Account
          </button>
          <div className="flex gap-0.5 items-center mx-auto mt-1 justify-center mb-30">
            <p className="text-center font-normal text-sm inline-block  ">
              Already have an account?
            </p>
            <Link
              to="/Login"
              className="inline-block hover:text-(--main-color) transition duration-200 hover:underline "
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default Signup