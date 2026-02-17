import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { Issue } from "../models/issue.model.js";
import ApiResponse from "../utils/ApiResponse.js";

const ReportIssue = asyncHandler( async (req,res)=>{
    //get data from front end
    //validate data 
    //check for images 
    //upload images on cloudinary
    // create issue object
    // return res
    const{issueType,images,description,location,severity,resolved}= req.body;
    
})