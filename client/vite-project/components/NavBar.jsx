import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { GoHomeFill } from "react-icons/go";
import { MdReportProblem } from "react-icons/md";
function NavBar() {
  // const [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem('token')))
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <nav className="w-screen  h-13 m-auto flex justify-between px-5">
        <div className="w-auto  flex  justify-between gap-10 items-center p-2 ml-2 ">
          <Link to={"/"}>
            <h1 className="text-2xl font-semibold">CivilWatch</h1>
          </Link>
          <NavLink to={"/"} className={({isActive})=>
            isActive
            ? "text-[#541AA3] font-semibold"
            : "text-gray-600 hover:text-gray-900"
          }>
            <span className="flex items-center text-md gap-2 pt-1">
              <GoHomeFill size={13}/>
              Home
            </span>
          </NavLink>
          {isLogin ? (
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
          {!isLogin ? (
            <>
              <NavLink to={"/Login"} className={({isActive})=>
            isActive
            ? "text-[#541AA3] font-extrabold bg-[#c9aff1] p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2"
            : " text-black  hover:text-gray-900 p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2"
            }>
                <span className="flex items-center font-semibold text-md gap-2 ">
                  Login
                </span>
              </NavLink>
              <NavLink to={"/Signup"} className={({isActive})=>
             isActive
             ? "text-[#541AA3] font-extrabold bg-[#d6c0f7] p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2 "
             : " text-black  hover:text-gray-900 p-1 px-3.5 rounded-lg pb-[0.4rem] mt-2 "
            } >
                <span className="flex items-center font-semibold text-md gap-2 ">
                  Sign up
                </span>
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
