import {Router} from "express"
import { registerRep,loginRep,authorize,logoutRep,getRepProfile } from "../controllers/rep.controller.js"
import { verifyJWT } from "../middleware/auth.middleware.js"
const router = Router();

router.route("/registerRep").post(registerRep);
router.route("/login").post(loginRep);
router.route("/me").get(authorize);
router.route("/Logout").get(verifyJWT,logoutRep)
router.route("/profile").get(verifyJWT,getRepProfile)
export default router;