import React, { useEffect, useState } from 'react'
import { NavLink, Link, useNavigate } from "react-router-dom";
import useUser from '../src/context/UserContext';
import { BiError } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import axios from 'axios';

function Profile() {
  const [name,setName]=useState("Rahul HR")
  const [year,setYear]=useState("2026")
  const [mail,setMail]=useState("vikas@gmail.com")
  const  [resolvedIssues,setResolvedIssues] =useState([]);
  const [activeIssues,setActiveIsssues ]=useState([]);
  const {user,isLoading,setUser}= useUser()
  useEffect(()=>
    {
      if(!isLoading){
        setName(user.fullname)
        setMail(user.email)
      }
      
    },[isLoading,user])
    useEffect(()=>{
      async function fetchdata(){
        const res = await axios.get("https://civil-mon.vercel.app/api/v1/users/profile",{withCredentials:true});
       await setUser(res.data.data.user)
        console.log(res)
       const resolvedIssue = user.issues.filter(issue => issue.resolved === true);
        const activeIssue = user.issues.filter(issue => issue.resolved === false);
        setActiveIsssues(activeIssue)
        setResolvedIssues(resolvedIssue)
       }
      fetchdata()
    },[isLoading])
  return (
    <div className='max-w-[1500px] mx-auto font-popp flex flex-col w-full pb=20 mt-5 px-4'>
        <div className='flex flex-col sm:flex-row w-full gap-3'>
          <div className='sm:w-1/2 bg-(--main-light) rounded-lg h-auto p-7 px-12 w-full'>
            <div className='w-14 h-14 rounded-full bg-(--main-accent) justify-center items-center flex'><FaUser size={23} className='text-(--main-color)'/></div>
            <h2 className='font-bold text-lg mt-4'>{name}</h2>
            <p className='text-[0.8em] font-medium'> Member since {year}</p>
            <p className='text-[0.8em] font-medium'> {mail}</p>
            <button className='mt-3 px-5 py-1.5 rounded-lg bg-(--main-accent) text-sm text-(--main-color) font-semibold hover:cursor-pointer'>Edit profile</button>
          </div>
          <div className='sm:w-1/2 bg-(--main-light) rounded-lg h-auto p-7 px-12  w-full'>
            <div className='w-14 h-14 rounded-full bg-(--main-accent) flex justify-center items-center'><BiError size={28} className='text-(--main-color)'/></div>
            <h2 className='font-bold text-lg mt-4'>Active Issues</h2>
            <p className='text-[0.8em] font-medium'>{} pending reports </p>
            <p className='text-[0.8em] font-medium'> {resolvedIssues} resolved reports</p>
            <Link to={"/ReportIssue"}>
            <button className='mt-3 px-5 py-1.5 rounded-lg text-white text-sm bg-(--main-color) font-semibold hover:cursor-pointer'>Report new</button>
            </Link>
          </div>
        </div>
        <div>
            <h2 className='font-semibold text-lg mt-4'>Resolved Issues</h2>

            {resolvedIssues.length === 0 ? (
              <p className='font-normal text-md text-center mx-auto mt-3'>
                No Resolved Reports
              </p>
            ) : (
              resolvedIssues.map((issue) => (
                <div key={issue._id} className="p-2 border mt-2 rounded">
                  <p>{issue.description}</p>
                  <p>Status: Resolved ✅</p>
                </div>
              ))
            )}
        </div>

        <div>
            <h2 className='font-semibold text-lg mt-4'>Active Issues</h2>

            {activeIssues.length === 0 ? (
              <p className='font-normal text-md text-center mx-auto mt-3'>
                No Active Issues Currently
              </p>
            ) : (
              activeIssues.map((issue) => (
                <div key={issue._id} className=" bg-(--main-accent) mt-2 rounded-lg flex items-center px-3 h-auto">
                  <div>
                    <img className=" w-16 h-16 rounded-lg"  src={issue.images[0]} alt="" />
                  </div>
                  <div className='mx-3 my-2'>
                  <p>{issue.issueType}</p>
                  <p>{issue.description}</p>
                  <p>{issue.location.area}</p>
                  </div>
                </div>
              ))
            )}
        </div>
    </div>
  )
}

export default Profile