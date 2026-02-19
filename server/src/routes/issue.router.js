import { Router } from "express";
import { reportIssue } from "../controllers/issue.controller.js";
import { upload } from "../middleware/multer.middleware.js";
const router = Router();
router.route("/report").post(upload.array("images"), reportIssue);

export default router;