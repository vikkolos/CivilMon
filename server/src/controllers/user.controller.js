import { asyncHandler } from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
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
const registerUser = asyncHandler(async (req,res)=>{
    const {fullName,email,password,aadhar}=req.body;
    console.log(email)
    console.log(fullName)
    console.log(password)
    console.log(aadhar)
    if(
        [fullName,email,password,aadhar].some((field)=>field?.trim()==="")
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
        aadharnumber:aadhar,

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
    const user = await User.findOne({
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
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
    const options ={
        httpOnly :true,
        secure :true,
    }
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
export{loginUser,registerUser};