import React from 'react'
import { BiError } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { NavLink, Link, useNavigate } from "react-router-dom";
function RepProfile() {
  return (
    
        <div className='max-w-[1300px] mx-auto font-popp flex flex-col w-full pb=40 mt-5 px-4'>
            <div className='flex flex-col w w-full gap-3'>
              <div className=' bg-(--main-light) rounded-lg h-auto p-14 px-12 w-full'>
                <div className='w-14 h-14 rounded-full bg-(--main-accent) justify-center items-center flex'><FaUser size={23} className='text-(--main-color)'/></div>
                <h2 className='font-bold text-lg mt-4'>Vikram Kumar</h2>
                <p className='text-[0.8em] font-medium'> Member since </p>
                <p className='text-[0.8em] font-medium'> State : Bihar </p>
                <p className='text-[0.8em] font-medium'> District : Kaimur  <br /> WardNumber:144 </p>
                <button className='mt-3 px-4 py-1.5 rounded-lg bg-(--main-accent) text-sm text-(--main-color) font-semibold hover:cursor-pointer'>Contact Representative</button>
              </div>
              <div className=' bg-(--main-light) rounded-lg h-auto p-7 px-12  w-full'>
                <div className='w-14 h-14 rounded-full bg-(--main-accent) flex justify-center items-center'><BiError size={28} className='text-(--main-color)'/></div>
                <h2 className='font-bold text-lg mt-4'>Public Trust Score : 0</h2>
                <p className='text-[0.8em] font-medium'> </p>
                <p className='text-[0.8em] font-medium'> 143 resolved reports</p>
                <Link to={"/ReportIssue"}>
                <button className='mt-3 px-5 py-1.5 rounded-lg text-sm bg-(--main-accent) text-(--main-color) font-semibold hover:cursor-pointer'>View History</button>
                </Link>
              </div>
            </div>
            <div className='pb-40'>

            <div className='w-full flex flex-col'>
                <h2 className='font-semibold text-lg mt-5'>Recent Reviews</h2>
                <p className='mx-auto w-full text-center mt-3'>No reviews</p>
            </div>
            <div className='w-full flex flex-col'>
                <h2 className='font-semibold text-lg mt-5'>Resolved Issues</h2>
                <p className='mx-auto w-full text-center mt-3'>No reviews</p>
            </div>
            <div className='w-full flex flex-col'>
                <h2 className='font-semibold text-lg mt-5'>Active Issues Reviews</h2>
                <p className='mx-auto w-full text-center mt-3'>No reviews</p>
            </div>
            </div>
        </div>
   
  )
}

export default RepProfile