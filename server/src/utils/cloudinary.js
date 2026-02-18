import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    // Configuration
    cloudinary.config({ 
            cloud_name: 'dqrrlqsun', 
            api_key: '485181157413637', 
            api_secret:process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
        });
        
    // Upload an image
    const uploadOnCloudinary = async (localfilepath)=>{
        try{
            if(!localfilepath)return null;
            const response = await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
            fs.unlinkSync(localfilepath)
            return response;
        }catch(err){
            fs.unlinkSync(localfilepath)
            return null
        }
    }

    export default uploadOnCloudinary