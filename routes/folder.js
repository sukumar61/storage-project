import express from "express"
import verifytoken from "../middleware/authMiddleware.js"
import createFolder from "../controllers/foldercontrollers.js"
const folderRouter=express.Router()

folderRouter.post("/",verifytoken,createFolder)

export default folderRouter