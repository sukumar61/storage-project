import express from "express"
import {register,login} from "../controllers/authController.js"

const router=express.Router()

router.post("/register",register)
router.post("/login-user",login)

export default router