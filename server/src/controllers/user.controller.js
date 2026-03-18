import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import  jwt  from "jsonwebtoken";
import { Issue } from "../models/issue.model.js";
import { Representative } from "../models/representative.modele.js";
const generateAccessAndRefereshTokens = async(userId) =>{
    try {
        let user = await User.findById(userId)
        if(!user){
            user = await Representative.findById(userId)
        }
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshtoken = refreshToken
        await user.save({ validateBeforeSave: false })

        return {accessToken, refreshToken}


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}
const registerUser = asyncHandler(async (req,res)=>{
    const {fullName,email,password,aadharnumber}=req.body;
    console.log(email)
    console.log(fullName)
    console.log(password)
    console.log(aadharnumber)
    if(
        [fullName,email,password,aadharnumber].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are required")
    }
    const existedUser = await User.findOne({email})
    if(existedUser){
        throw new ApiError(409,"User with email already exists")
    }
    const user= await User.create({
        fullname:  fullName,
        email,
        password,
        aadharnumber,

    })
    const createdUser = await User.findById(user._id).select("-password -refreshtoken")
    if(!createdUser){
        throw new ApiError(500,"Something went wrong while regestering the user")
    }
    return res.status(201).json(
        new ApiResponse(200,createdUser,"User REgistered Successfully")
    )
})
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new ApiError(400,"email and passwod are required")
    }
    let user = await User.findOne({
        $or:[{email}]
    })
    if(!user){
        throw new ApiError(404,"user does not exist");
    }
    const isParrwordValid= await user.isPasswordCorrect(password);
    if(!isParrwordValid){
        throw new ApiError(401,"invalid user credentials")
    }
    const {accessToken,refreshToken}= await generateAccessAndRefereshTokens(user._id);
    let loggedInUser = await User.findById(user._id).select("-password -refreshToken")
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
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged In Successfully"
        )
    )
})
const authorize = asyncHandler(async ( req,res)=>{
    let user;
   try {
    
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
      if(!token){
          throw new ApiError(401,"Unauthorized req")
      }
      const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
      console.log(decodedToken._id)
      user = await User.findById(decodedToken?._id).select("-password -refreshToken");
  
      if(!user){
          throw new ApiError(401 , "Invalid access Token")
      }
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid acss Token") 
   }

   return res.status(200).json(
    new ApiResponse(200,{
        user : user
    },"User logged in successfully")
   )
})
const logoutUser = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
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
const getUserProfile = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user._id).populate("issues");
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const{resolvednum,unresolvednum}= await getResPenIssues(user)
    if(resolvednum===undefined||unresolvednum===undefined){
        throw new ApiError(404,"No resolved num or unresolved num")
    }
    return res.status(200)
    .json(new ApiResponse(200,{user,issues:user.issues,resolvednum,unresolvednum},"issues sent successfully"))
})
export{loginUser,registerUser,authorize,logoutUser,getUserProfile};