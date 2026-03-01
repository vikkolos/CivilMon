import React from 'react'
import { IoSearch } from "react-icons/io5";
import { BiError } from "react-icons/bi";
import ReportIssuescroll from '../components/ReportIssuescroll';
import HowItWorks from '../components/HowItWorks';
import { FaAnglesRight } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import useUser from '../src/context/UserContext';
function Home() {
  const cards = [
    { title: "Road" },
    { title: "Waste" },
    { title: "Electricity" },
    { title: "Sewage" },
    { title: "Others"},
  ];
  const{isLoading}=useUser();
  
  if (isLoading) {
    return (
      <div className="h-16 flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-gray-300 border-t-black rounded-full animate-spin"></div>
      </div>
    );
  }
  
  
  return (
    <div className='p-5 pb-20 max-w-[1550px] mx-auto'>
      <div className='w-full text-center '>
        <h1 className='font-bold text-4xl mt-8 font-quant scale-y-120'>Empower Your Community</h1>
        <p className='mt-3 font-[350]'>Report Local Issues, Track Solutions, And Rate Representative Performance</p>
      </div>
      <div className='w-full  mt-7'>
        <div className='w-full relative'>

        <input type="text" placeholder='Search Representative by Name , Location' className='w-full  rounded-md bg-gray-100 px-7 py-2.5 font-popp font-light text-sm focus:outline-none' >
        </input>
        <IoSearch className='absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-900 ' size={20} />
        </div>
      </div>
      <div className='sm:flex'>
          <div className=' w-full sm:w-[60%] flex gap-4'>
            <div className='w-[50%] bg-(--main-light) mt-4 h-55 rounded-lg flex items-center justify-center flex-col' >
              <div className='bg-[#D2C5E8] rounded-3xl p-2 w-12 h-12 flex items-center justify-center'>
                <BiError size={35} className='text-(--main-color)'/>
              </div>
              <span className='text-2xl mt-2 font-semibold'>186</span>
              <p className='mt-2 font-medium font-popp'>Total Issues</p>

            </div>
            <div className='w-[50%] bg-(--main-light) mt-4 h-55 rounded-lg flex items-center justify-center flex-col' >
              <div className='bg-[#D2C5E8] rounded-3xl p-2 w-12 h-12 flex items-center justify-center'>
                <TiTick size={35} className='text-(--main-color)'/>
              </div>
              <span className='text-2xl mt-2 font-semibold'>150</span>
              <p className='mt-2 font-medium font-popp'>Resolved Issues</p>

            </div>   
          </div>
            <div className='sm:w-[40%]'></div>
      </div>
      <div className=''>
      <ReportIssuescroll cards={cards} />
      </div>
      <div className=''>
      <HowItWorks />
      </div>
      <div>
        <h1 className='font-semibold text-2xl ml-3 mt-4'>Recent Succes Stories</h1>
        <div className='my-5 flex flex-col gap-6 '>
          <div className='w-full  rounded-xl h-10 items-center flex p-2'>
            <div  className='bg-[#D2C5E8] p-3 rounded-xl mt-1' >
            <FaAnglesRight size={20} className='text-(--main-color)' />
            </div>
            <div className='px-4'>
                <h3 className='text-md font-medium'> Park Cleanup Complete</h3>
                <p className='text-sm'> Resolved by John Smith </p>
            </div>
          </div>
          <div className='w-full  rounded-xl h-10 items-center flex p-2'>
            <div  className='bg-[#D2C5E8] p-3 rounded-xl mt-1' >
            <FaAnglesRight size={20} className='text-(--main-color)' />
            </div>
            <div className='px-4'>
                <h3 className='text-md font-medium'> Park Cleanup Complete</h3>
                <p className='text-sm'> Resolved by John Smith </p>
            </div>
          </div>
          <div className='w-full  rounded-xl h-10 items-center flex p-2'>
            <div  className='bg-[#D2C5E8] p-3 rounded-xl mt-1' >
            <FaAnglesRight size={20} className='text-(--main-color)' />
            </div>
            <div className='px-4'>
                <h3 className='text-md font-medium'> Park Cleanup Complete</h3>
                <p className='text-sm'> Resolved by John Smith </p>
            </div>
          </div>
          <div className='w-full  rounded-xl h-10 items-center flex p-2'>
            <div  className='bg-[#D2C5E8] p-3 rounded-xl mt-1' >
            <FaAnglesRight size={20} className='text-(--main-color)' />
            </div>
            <div className='px-4'>
                <h3 className='text-md font-medium'> Park Cleanup Complete</h3>
                <p className='text-sm'> Resolved by John Smith </p>
            </div>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Home