import React from 'react'
import { useReducer } from 'react';
import { useState,useRef } from 'react'
import axios from "axios"
function ReportIssue() {
  const [IssueType,setIssueType] = useState();
  const [Location,setLocation] = useState({
    address:"",
    state:"",
    district:"",
    wardNumber:"",
    area:"",
  });
  const [error, setError] = useState(null);
  const [images,setImages] = useState([]);
  const [address,setAddress] = useState({});
  const inputFileref=useRef();
  
  const [formData,setFormData]=useState({
    issueType:"",
    images:[],
    description:"",
    location:{
      address:"",
      state:"",
      district:"",
      wardNumber:"",
      area:"",
    },
    severity:"low",

  })
  const getCurr = async (lat,lon)=>{
    try{
     const res = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${import.meta.env.VITE_GEOAPI_KEY}`);
     console.log(res.data.features[0].properties);
      setFormData(prev=>({
      ...prev,
      location:{
        ...prev.location,
        address:res.data.features[0].properties.address_line1+","+res.data.features[0].properties.address_line2,
        state:res.data.features[0].properties.state,
        district:res.data.features[0].properties.district,
        area:res.data.features[0].properties.suburb
      }
     }))

     console.log(formData);
      
    }
    catch(err){
      console.log(err)
    }
  }
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
    getCurr(position.coords.latitude,position.coords.longitude);
  },
  (err)=>{
    setError("error getting location or permission denied ")
  }
  )
  
}
const handleSubmit = async (e) => {
  e.preventDefault();
  if (images.length === 0) {
    alert("Please select at least one image");
    return;
  }
  const data = new FormData();
  try{ 

    
    // Normal fields
    data.append("issueType", formData.issueType);
    data.append("description", formData.description);
    data.append("severity", formData.severity);
    
    // Nested object (convert to string)
    data.append("location", JSON.stringify(formData.location));
    
    // Images
    formData.images.forEach(file => {
      data.append("images", file);
    });
    
    const res = await axios.post("http://localhost:3002/api/v1/issues/report",data);
    console.log(res.data)
  }
  catch(err){
    console.error(err)
  }
} 

  const HandleIssueType =(e)=>{
    setIssueType(e.target.value);
  }
  const openfilepicker =()=>{
    inputFileref.current.click();
  }
  const pushImage= (e)=>{
    const files = Array.from(e.target.files)
    setFormData(prev=>({
      ...prev,
      images:[...files],

    }))
    setImages([...files]);
  }
  const handlechange =(e)=>{
    const {name,value} = e.target;
    setFormData(prev=>({
      ...prev,
      location:{
        ...prev.location,
        [name]: value,
      },
     
    }))
    
  }
  return (
    <div className='max-w-[1500px] md:mx-auto font-popp flex flex-col w-full pb=20'>
      <h1 className='text-[1.38rem] font-semibold md:mx-35 mt-8 mx-4'>Report An Issue</h1>
      <form action="submit " className='max-w-[1400px] md:mx-35 md:mt-10 mx-4 mt-3'>
          <div>
          <h1 className='font-semibold text-md'>Issue Category</h1>
          <select required value={IssueType} onChange={HandleIssueType} className='w-full border-black bg-[#F2F1F1] px-3 outline-black py-2 rounded-lg mt-2 focus:outline-none '>
            <option value="" defaultChecked>Select Issue Type </option>
            <option value="Road">Road</option>
            <option value="Electricity">Electricity</option>
            <option value="Waste">Waste </option>
            <option value="Sanitation">Sanitation</option>
            <option value="">Other</option>
          </select>
          </div>
          <div>
           <input  type="file" ref={inputFileref} onChange={pushImage} accept='image/*' multiple style={{display:'none'}}>
             
           </input>
           <div>
            <button onClick={openfilepicker}  className='p-2 px-3 bg-(--main-light) rounded-lg mt-3 text-sm font-medium hover:cursor-pointer' type='button'>Choose Images</button>
           </div>
            <div style={{ marginTop: "10px" , display:'inline-block' }}>
              {images.map((img, i) => (
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
                          required
                          name='description'
                          placeholder="Describe the issue..."
                          className="w-full h-24 px-3 py-2 rounded-lg  bg-[#F2F1F1] resize-none mt-2 focus:outline-none"
                        />
                  </div>
                  <div>
                        <h1 className='text-lg font-medium inline-block mt-4'>Location</h1>
                        <button type='button' onClick={getLoc} className=' m-2 px-3 py-2 rounded-lg bg-(--main-light) text-sm hover:cursor-pointer'>Get current Location</button>
                        <input required type="text"  onChange={handlechange} value={formData.location.address} name='address' className='w-full bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none' placeholder='Enter Location' />
                        <div className='mt-4 flex gap-2  lg:flex-row flex-col mx-auto items-center justify-center w-full '>
                          <div className='w-full lg:w-auto flex items-center' >
                            <span  className='w-[10%] lg:w-auto  inline-block min-w-12 '>
                            State 
                            </span>
                            <input type="text" required value={formData.location.state} placeholder='Enter State' name='state' onChange={handlechange} className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%]'/>
                          </div>
                          <div className='w-full lg:w-auto flex items-center' >
                            <span className='w-[10%] lg:w-auto inline-block  min-w-12'>
                              District 
                            </span> 
                            <input type="text" required onChange={handlechange}  value={formData.location.district}  name='district' placeholder='Enter District' className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%] '/>
                          </div>
                          <div className='w-full lg:w-auto flex items-center'>
                            <span  className='w-[10%] lg:w-auto  inline-block  min-w-12 '>
                          Ward no.
                            </span>
                            <input type="text" required onChange={handlechange} name='wardNumber' value={formData.location.wardNumber} placeholder='Enter Ward No.' className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%]'/>
                          </div>
                          <div className='w-full lg:w-auto flex items-center'>
                            <span  className='w-[10%] lg:w-auto  inline-block  min-w-12'>
                            Area 
                            </span>
                            <input type="text" required onChange={handlechange} value={formData.location.area} name='area' placeholder='Enter Ward No.' className=' mx-2 bg-[#F2F1F1] py-2 px-3 rounded-lg focus:outline-none w-[90%] lg:w-[60%]'/>
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
                            <button type='button' onSubmit={handleSubmit} className='bg-(--main-color) py-2 px-4 rounded-lg text-white text-sm'>Submit Report</button>                           
                        </div>
                  </div>
                  
              </div>
         
      </form>
    
    </div>
  )
}

export default ReportIssue