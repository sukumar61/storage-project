const express=require("express")
const router=express.Router() //creating a router obj
console.log("route")
const authController=require("../controllers/authController")
router.get("/register",authController.register)
module.exports=routercd