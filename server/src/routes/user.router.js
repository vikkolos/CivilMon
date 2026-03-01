import { Router } from "express";
import { authorize, loginUser,registerUser,logoutUser,getUserProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/registerUser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/me").get(authorize);
router.route("/Logout").get(verifyJWT,logoutUser)
router.route("/profile").get(verifyJWT,getUserProfile)
export default router;