import { v2 as cloudinary } from 'cloudinary';
import fs from "fs"


    // Configuration
    
    // Upload an image
    const uploadOnCloudinary = async (localfilepath)=>{
        try{
            cloudinary.config({ 
                    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
                    api_key:  process.env.CLOUDINARY_API_KEY, 
                    api_secret: process.env.CLOUDINARY_API_SECRET,
                });
            if(!localfilepath)return null;
            const response = await cloudinary.uploader.upload(localfilepath,{resource_type:"auto"})
            fs.unlinkSync(localfilepath)
            return response;
        }catch(err){
            console.log(err)
            fs.unlinkSync(localfilepath)
            return null
        }
    }

    export default uploadOnCloudinary