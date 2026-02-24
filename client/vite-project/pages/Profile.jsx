import React, { useEffect, useState } from 'react'
import { NavLink, Link } from "react-router-dom";
import useUser from '../src/context/UserContext';
import { BiError } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
function Profile() {
  const [name,setName]=useState("Rahul HR")
  const [year,setYear]=useState("2026")
  const [mail,setMail]=useState("vikas@gmail.com")
  const [pendingIssue,setPendingIssue]=useState(0)
  const [resolvedIssue,setResolvedIssue]=useState(0)
  const {user,isLoading}= useUser()
  useEffect(()=>
    {
      if(!isLoading){
        setName(user.fullname)
        setMail(user.email)
      }
    },[isLoading,user])

  


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
            <p className='text-[0.8em] font-medium'>{pendingIssue} pending reports </p>
            <p className='text-[0.8em] font-medium'> {resolvedIssue} resolved reports</p>
            <Link to={"/ReportIssue"}>
            <button className='mt-3 px-5 py-1.5 rounded-lg text-white text-sm bg-(--main-color) font-semibold hover:cursor-pointer'>Report new</button>
            </Link>
          </div>
        </div>
        <div>
        <h2 className='font-semibold text-lg mt-4'>Resolved issues</h2>
        {resolvedIssue ===0?<p className='font-normal text-md text-center mx-auto mt-3'>No Resolved Report</p>:null}
        {resolvedIssue !=0?<p> theres no resolved issue</p>:null}
        </div>
        <div>
        <h2 className='font-semibold text-lg mt-4'>Active Issues</h2>
        {resolvedIssue ===0?<p className='font-normal text-md text-center mx-auto mt-3'>No Active Issues Currently</p>:null}
        {resolvedIssue !=0?<p> theres no resolved issue</p>:null}
        </div>
    </div>
  )
}

export default Profile