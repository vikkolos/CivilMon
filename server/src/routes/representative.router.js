import {Router} from "express"
import { registerRep,loginRep,authorize,logoutRep,getRepProfile } from "../controllers/rep.controller.js"
import { verifyJWTRep } from "../middleware/auth.middleware.js"
const router = Router();

router.route("/registerRep").post(registerRep);
router.route("/login").post(loginRep);
router.route("/me").get(authorize);
router.route("/Logout").get(verifyJWTRep,logoutRep)
router.route("/profile").get(verifyJWTRep,getRepProfile)
export default router;