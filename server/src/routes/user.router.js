import { Router } from "express";
import { loginUser,registerUser } from "../controllers/user.controller.js";

const router = Router();

router.route("/retgisterUser").post(registerUser);
router.route("/login").post(loginUser);

export default router;