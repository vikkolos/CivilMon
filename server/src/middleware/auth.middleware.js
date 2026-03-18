import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Representative } from "../models/representative.modele.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {

    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    let user = await User
      .findById(decodedToken._id)
      .select("-password -refreshToken");

    let role = "citizen";

    if (!user) {
      user = await Representative
        .findById(decodedToken._id)
        .select("-password -refreshToken");

      role = "representative";
    }

    if (!user) {
      throw new ApiError(401, "Invalid access token");
    }

    req.user = user;
    req.role = role;

    next();

  } catch (error) {
    throw new ApiError(
      401,
      error?.message || "Invalid access token"
    );
  }
});