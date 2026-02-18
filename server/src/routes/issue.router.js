import { Router } from "express";
import { reportIssue } from "../controllers/issue.controller.js";
const router = Router();
router.route("/report").post(reportIssue);

export default router;