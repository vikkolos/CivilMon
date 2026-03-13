
import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Representative } from "../models/representative.modele.js";
import  jwt  from "jsonwebtoken";

export const verifyJWT = asyncHandler( async(req,res,next)=>{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     if(!token){
         throw new ApiError(401,"Unauthorized req")
     }
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     console.log(decodedToken._id)
     const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
 
     if(!user){
         throw new ApiError(401 , "Invalid access Token")
     }
 
     req.user=user;
     next()
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid acss Token")
   }
})
export const verifyJWTRep = asyncHandler( async(req,res,next)=>{
   try {
     const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
     if(!token){
         throw new ApiError(401,"Unauthorized req")
     }
     const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
     console.log(decodedToken._id)
     const user = await Representative.findById(decodedToken?._id).select("-password -refreshToken");
 
     if(!user){
         throw new ApiError(401 , "Invalid access Token")
     }
     req.user=user;
     next();
   } catch (error) {
        throw new ApiError(401, error?.message || "Invalid acss Token")
   }
})