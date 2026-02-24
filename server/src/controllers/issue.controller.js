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
    const{issueType,description,severity}= req.body;
    const location = JSON.parse(req.body.location)
    if(
        [issueType,description,severity].some((field)=>field?.trim()==="")&&location
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
        let resp= await uploadOnCloudinary(imageLocPath[i])
        urls[i] = resp.url
    }
    console.log(urls)
    const user= req.user    
    const issue = Issue.create({
        issueType,
        description,
        severity,
        location,
        owner:user._id,
        images:urls
    })

    return res
    .status(201)
    .json( new ApiResponse(200,issue,"issue reported successfully"))
    
})
const getResPenIssues = asyncHandler(async(req,res)=>{
    const user = req.user;
    let resolved = []
    let unresolved = []

    for(let i = 0 ; i<user.issue.length;i++){
       let resp= await Issue.findById(element)
       if(resp.resolved =="true"){
        resolved.push(resp)
       }
       else{
        unresolved.push(resp)
       }
    }
     return res.status(200)
     .json( new ApiResponse (200,{resolvednum:resolved.length,
    unresolvednum:unresolved.length},"sent the number of  resolved and unresolved"))

})


const handleResolvedRating = asyncHandler(async ( req,res )=>{
    const {id,rating}= req.body;
    if(!id){
        throw new ApiError(400,"cant obtain id")
    }
    if(!rating||rating>10||rating<1){
        throw new ApiError(400,"rating not available or rating is more than 10")
    }
    const issue = await Issue.findById(id)
    if(!issue){
        throw new ApiError(404,"issue is not available")
    }
    issue.resolved = true
    issue.rating = rating
    await issue.save({validateBeforeSave:false})
     return res.status(200)
     .json( new ApiResponse(200,{},"issue set to resolved"))

})



export {reportIssue,getResPenIssues,handleResolvedRating}
