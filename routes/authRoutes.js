import express from "express"
import {register,login,userprofile,validateRegister,validateLogin} from "../controllers/authController.js"
import verifytoken from "../middleware/authMiddleware.js"

const router=express.Router()

router.post("/register",validateRegister,register)
router.post("/login-user",validateLogin,login)
router.get("/profile",verifytoken,userprofile)

export default router