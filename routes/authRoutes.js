import express from "express"
import {register,login,userprofile} from "../controllers/authController.js"
import verifytoken from "../middleware/authMiddleware.js"

const router=express.Router()

router.post("/register",register)
router.post("/login-user",login)
router.get("/profile",verifytoken,userprofile)

export default router