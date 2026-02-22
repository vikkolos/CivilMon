import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Issue } from "../models/issue.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadOnCloudinary from "../utils/cloudinary.js"

const reportIssue = asyncHandler( async (req,res)=>{
    //get data from front end
    //validate data 
    //check for images 
    //upload images on cloudinary
    // create issue object
    // return res
    // console.log("BODY:", req.body.issueType);
    console.log("FILES:", req.files);   
    const{issueType,description,location,severity}= req.body;
    if(
        [issueType,description,location,severity].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    if(!req.files){
        throw new ApiError(400 ,"images are required")
    }
    let imageLocPath =[];
    for(let i= 0;i<req.files.length;i++){
        imageLocPath[i]=req.files[i].path;
    }
    // console.log(imageLocPath);
    if(!imageLocPath){
        throw new ApiError(500,"could not get image local path")

    }
    let urls =[]
    for(let i= 0;i<imageLocPath.length;i++){ 
        urls[i] = await uploadOnCloudinary(imageLocPath[i])
    }
    console.log(urls)
    const issue = Issue.create({
        issueType,
        description,
        severity
    })

    
})
export {reportIssue}