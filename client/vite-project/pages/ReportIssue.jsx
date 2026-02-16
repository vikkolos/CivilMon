import React from 'react'
import { useReducer } from 'react';
import { useState,useRef } from 'react'
function ReportIssue() {
  const [IssueType,setIssueType] = useState();
  const [Location,setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [Images,setImages] = useState([]);
  const [address,setAddress] = useState({});
  const inputFileref=useRef();
  
  const [formData,setFormData]=useState({
    description:"",
    issueType: IssueType,
    coords: {},
    address:"",
    severity:"",



  })
const getLoc =()=>{
  if(!navigator.geolocation){
    setError("Geolocation not supported");
    return;
  }
  navigator.geolocation.getCurrentPosition((position)=>{
    setLocation({
      lat:position.coords.latitude,
      long:position.coords.longitude,
    })
    console.log("lat :"+ position.coords.latitude);
  },
  (err)=>{
    setError("error getting location or permission denied ")
  }
  )

}

  const HandleIssueType =(e)=>{
    setIssueType(e.target.value);
  }
  const openfilepicker =()=>{
    inputFileref.current.click();
  }
  const pushImage= (e)=>{
    setImages([...e.target.files])
  }
  const handlechange =(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }
  return (
    <div className='max-w-[1500px] md:mx-auto font-popp flex flex-col w-full pb=20'>
      <h1 className='text-[1.38rem] font-semibold md:mx-35 mt-8 mx-4'>Report An Issue</h1>
      <form action="submit " className='max-w-[1400px] md:mx-35 md:mt-10 mx-4 mt-3'>
          <div>
          <h1 className='font-semibold text-md'>Issue Category</h1>
          <select  value={IssueType} onChange={HandleIssueType} className='w-full border-black bg-[#F2F1F1] px-3 outline-black py-2 rounded-lg mt-2 focus:outline-none '>
            <option value="" defaultChecked>Select Issue Type </option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Waste">Waste </option>
            <option value="Sanitation">Sanitation</option>
            <option value="">Other</option>
          </select>
          </div>
          <div>
           <input name='images' type="file" ref={inputFileref} onChange={pushImage} accept='image/*' multiple style={{display:'none'}}>
             
           </input>
           <div>
            <button onClick={openfilepicker}  className='p-2 px-3 bg-(--main-light) rounded-lg mt-3 text-sm font-medium hover:cursor-pointer' type='button'>Choose Images</button>
           </div>
            <div style={{ marginTop: "10px" , display:'inline-block' }}>
              {Images.map((img, i) => (
                <img
                key={i}
                src={URL.createObjectURL(img)}
                alt="preview"
                width="120"
                style={{ marginRight: "10px",display:'inline-block' }}
                />
                ))}
             </div>
                  <div>
                        <h1 className='text-lg font-medium  '>Description</h1>
                        <textarea
                          name='description'
                          placeholder="Describe the issue..."
                          className="w-full h-24 px-3 py-2 rounded-lg  bg-[#F2F1F1] resize-none mt-2 focus:outline-none"
                        />
                  </div>
                  <div>
                        <h1 className='text-lg font-medium inline-block mt-4'>Location</h1>
                        <button type='button' onClick={getLoc} className=' m-2 px-3 py-2 rounded-lg bg-(--main-light) text-sm hover:cursor-pointer'>Get current Location</button>
                        <input type="text" className='w-full bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none' placeholder='Enter Location' />
                        <div className='mt-4 flex gap-2  lg:flex-row flex-col mx-auto items-center justify-center w-full '>
                          <div className='w-full lg:w-auto flex items-center' >
                            <span  className='w-[10%] lg:w-auto  inline-block min-w-12 '>
                            State 
                            </span>
                            <input type="text" placeholder='Enter State' className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%]'/>
                          </div>
                          <div className='w-full lg:w-auto flex items-center' >
                            <span className='w-[10%] lg:w-auto inline-block  min-w-12'>
                              District 
                            </span> 
                            <input type="text" placeholder='Enter District' className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%] '/>
                          </div>
                          <div className='w-full lg:w-auto flex items-center'>
                            <span  className='w-[10%] lg:w-auto  inline-block  min-w-12 '>
                          Ward no.
                            </span>
                            <input type="text" placeholder='Enter Ward No.' className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%]'/>
                          </div>
                          <div className='w-full lg:w-auto flex items-center'>
                            <span  className='w-[10%] lg:w-auto  inline-block  min-w-12'>
                            Area 
                            </span>
                            <input type="text" placeholder='Enter Ward No.' className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%]'/>
                          </div>
                        </div>
                  </div>
                  <div className=''>
                        <h1 className='text-lg font-medium inline-block mt-4'>Severity</h1>
                        
                  </div>
                  <div className='bg-(--main-light) p-7 rounded-lg mt-4 '>
                        <h1 className='text-lg font-medium inline-block '>Preview</h1>
                        <p className='text-[0.8em] '>Review your report before submission</p>
                        <div className='flex mt-4 gap-5'>
                            <button type='button ' className='bg-(--main-color) py-2 px-4 rounded-lg text-white text-sm'>Get problems in this area</button>
                            <button type='button ' className='bg-(--main-color) py-2 px-4 rounded-lg text-white text-sm'>Submit Report</button>                           
                        </div>
                  </div>
              </div>
         
      </form>
    
    </div>
  )
}

export default ReportIssue