import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdReportProblem } from "react-icons/md";
import useUser from "../src/context/UserContext";
import { FaUser } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function NavBar() {
  // const [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem('token')))
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(false);
  const {user,isLoading}=useUser()
  if (isLoading) {
    return (
      <div className="h-16 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }
  const handleLogout =async()=>{
    const res = await axios.get("http://localhost:3002/api/v1/users/Logout",{withCredentials:true});
    // navigate("/Login")
    window.location.reload();
  }
  
  return (
    <>
      <nav className="w-screen  h-13 m-auto flex justify-between px-5 max-w-[1600px]">
        <div className="w-auto  flex  justify-between gap-10 items-center md:p-2 md:ml-2 mt-6 md:mt-0">
          <Link to={"/"}>
            <h1 className=" md:text-2xl text-[1.5em] font-semibold ">CivilWatch</h1>
            
          </Link>
          {/* <hr className="md:hidden w-full" /> */}
          <NavLink to={"/"} className={({isActive})=>
            isActive
            ? "text-[#541AA3] hidden md:flex font-semibold"
            : "text-gray-600 hidden md:flex hover:text-gray-900"
          }>
            <span className="flex items-center text-md gap-2 pt-1">
              <GoHomeFill size={13}/>
              Home
            </span>
          </NavLink>
          {user ? (
            <NavLink to={"/ReportIssue"} className={({isActive})=>
            isActive 
            ? "text-[#541AA3] font-bold"
            : "text-black hover:text-gray-900"
            } >
              <span className="flex items-center font-semibold text-md gap-2 pt-1">
              <MdReportProblem size={13} />
                
                Report Issue
              </span>
            </NavLink>
          ) : (
            <div />
          )}
        </div>
        <div className="w-auto flex p-2 items-center mr-2">
          {!user ? (
            <>
              <NavLink to={"/Login"} className={({isActive})=>
            isActive
            ? "text-[#541AA3] hidden md:flex font-extrabold bg-[#c9aff1] p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2"
            : " text-black hidden md:flex hover:text-gray-900 p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2"
            }>
                <span className="flex items-center font-semibold text-md gap-2 ">
                  Login
                </span>
              </NavLink>

              <NavLink to={"/Signup"} className={({isActive})=>
             isActive
             ? "text-[#541AA3] hidden md:flex font-extrabold bg-[#d6c0f7] p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2 "
             : " text-black hidden md:flex hover:text-gray-900 p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2 "
            } >
                <span className="flex items-center font-semibold text-md gap-2 ">
                  Sign up
                </span>
              </NavLink>

            </>
          ) : (
            <>
            
              <NavLink to={"/Profile"}>
              <div className='bg-[#D2C5E8] rounded-3xl p-2 w-10 h-10 flex items-center justify-center mx-3'>
                <button >
                <FaUser />
                </button>
              </div>
              </NavLink>
              <div className="flex justify-center items-center bg-(--main-light) rounded-lg font-semibold text-(--main-color) hover:cursor-pointer">
              <button className="px-5 py-2 " onClick={handleLogout}>
                  Log Out
              </button>
              </div>
            
            </>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
