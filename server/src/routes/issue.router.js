import { Router } from "express";
import { reportIssue } from "../controllers/issue.controller.js";
import { upload } from "../middleware/multer.middleware.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
const router = Router();
router.route("/report").post(upload.array("images",3),verifyJWT,reportIssue);

export default router;