import React from 'react'
import { BiError } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa6";
import { GoChecklist } from "react-icons/go";
import { IoMdArrowRoundForward } from "react-icons/io";
function HowItWorks() {
  return (
   <>
   <h1 className="text-[1.4em] font-semibold mx-3 mt-2">
        How It Works
    </h1>
    <div className='w-[99%] h-auto  flex  flex-col lg:flex-row  gap-6 sm:gap-8 md:gap-12mx-auto mt-2 relative mx-auto '>
     <div className='lg:w-1/3  lg:h-60 bg-(--main-light) rounded-xl flex cursor-pointer p-8 z-2'>
        <div className='flex justify-center items-center pl-1 '>
            <div className='bg-[#D2C5E8]  p-2 w-24 rounded-2xl h-34 flex items-center justify-center'>
            <BiError size={35} className='text-(--main-color)'/>
            </div>
        </div>
        <div className='flex justify-center flex-col pl-8'>
            <h1 className='text-xl font-semibold'> 1.Report Issues</h1>
            <p className='mt-3 h-19 overflow-clip'> Submit the details of the problem with details such as photo and description</p>
        </div>
     </div>
     
     <div className='lg:w-1/3 lg:h-60 bg-(--main-light) rounded-xl flex cursor-pointer p-8 z-2'>
        <div className='flex justify-center items-center pl-1 '>
            <div className='bg-[#D2C5E8]  p-2 w-24 rounded-2xl h-34 flex items-center justify-center'>
            
            <GoChecklist size={35} className='text-(--main-color)'/>
            </div>
        </div>
        <div className='flex justify-center flex-col pl-8'>
            <h1 className='text-xl font-semibold'>2.Track Progress</h1>
            <p className='mt-3 h-19 overflow-clip'>Monitor the status of the Reported problem </p>
        </div>
     </div>
     
     <div className='lg:w-1/3 lg:h-60 bg-(--main-light) rounded-xl flex cursor-pointer p-8 z-2 '>
        <div className='flex justify-center items-center pl-1 '>
            <div className='bg-[#D2C5E8]  p-2 w-24 rounded-2xl h-34 flex items-center justify-center'>
            <FaRegStar size={35} className='text-(--main-color)'/>
            </div>
        </div>
        <div className='flex justify-center flex-col pl-8'>
            <h1 className='text-xl font-semibold'>3.Rate Work</h1>
            <p className='mt-3 h-19 overflow-clip'> Submit the details of the problem with details such as photo and description</p>
        </div>
     </div>
     
     
    </div>
   </>
  )
}

export default HowItWorks