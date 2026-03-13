import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import  jwt  from "jsonwebtoken";
import { Issue } from "../models/issue.model.js";
import {Representative} from "../models/representative.modele.js"

const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshtoken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
const registerRep = asyncHandler(async (req,res)=>{
    const {fullName,email,password,aadharnumber,state,district,wardnumber}=req.body;
    if(
        [fullName,email,password,aadharnumber,state,district,wardnumber].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    const existedRep = await Representative.findOne({email})
    if(existedRep){
        throw new ApiError(409,"User with email already exists")
    }
    const user= await Representative.create({
        fullname:  fullName,
        email,
        password,
        aadharnumber,
        state,
        district,
        wardnumber
    })
    const createdRep = await Representative.findById(user._id).select("-password -refreshtoken")
    if(!createdRep){
        throw new ApiError(500,"Something went wrong while regestering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdRep,"User REgistered Successfully")
    )
})
const loginRep = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"email and passwod are required")
    }
    const rep = await Representative.findOne({
        $or:[{email}]
    })
    if(!rep){
        throw new ApiError(404,"user does not exist");
    }
    const isParrwordValid= await rep.isPasswordCorrect(password);
    if(!isParrwordValid){
        throw new ApiError(401,"invalid user credentials")
    }
    const {accessToken,refreshToken}= await generateAccessAndRefereshTokens(rep._id);
    const loggedInRep = await Representative.findById(rep._id).select("-password -refreshToken")
    const options ={
        httpOnly :true,
        secure :false,
        sameSite: "lax" 
    }
    console.log("logged in")
    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInRep, accessToken, refreshToken
            },
            "Rep logged In Successfully"
        )
    )
})
const authorize = asyncHandler(async ( req,res)=>{
   let rep;
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
      if(!token){
          throw new ApiError(401,"Unauthorized req")
      }
      const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      console.log(decodedToken._id)
      rep = await Representative.findById(decodedToken?._id).select("-password -refreshToken");
      if(!rep){
          throw new ApiError(401 , "Invalid access Token")
      }
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid acss Token") 
   }

   return res.status(200).json(
    new ApiResponse(200,{
        user : rep
    },"rep logged in successfully")
   )
})
const logoutRep = asyncHandler(async(req,res)=>{
    await Representative.findByIdAndUpdate(req.user._id,{
        $unset:{
            refreshtoken:1,
        }
    },
    {
        new:true
    }
    )
    const options = {
        httpOnly:true,
        secure:true
    }
    return res
    .status(200)
    .clearCookie("accessToken",options)
    .clearCookie("refreshToken",options)
    .json(new ApiResponse(200,{},"user logged out"))
})
const getResPenIssues = async(user)=>{ 
    if(!user){
        throw new ApiError(404,"user is not provided")
    }
    const resolvednum = await Issue.countDocuments({
        _id: { $in: user.issues },
        resolved: true
      });

      const unresolvednum = await Issue.countDocuments({
        _id: { $in: user.issues },
        resolved: false
      });
     return {resolvednum,unresolvednum}
}
const getRepProfile = asyncHandler(async(req,res)=>{
    const rep = await Representative.findById(req.user._id).populate("issues");
    if(!rep){
        throw new ApiError(404,"User not found")
    }
    const{resolvednum,unresolvednum}= await getResPenIssues(rep)
    if(resolvednum===undefined||unresolvednum===undefined){
        throw new ApiError(404,"No resolved num or unresolved num")
    }
    return res.status(200)
    .json(new ApiResponse(200,{rep,issues:rep.issues,resolvednum,unresolvednum},"issues sent successfully"))
})
export {
    registerRep,loginRep,authorize,logoutRep,getRepProfile
}