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
    const{issueType,description,location,severity}= req.body;
    if(
        [issueType,description,location,severity].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    console.log( issueType,description,location,severity);
    
})
export {reportIssue }