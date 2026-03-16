import express from "express"
import verifytoken from "../middleware/authMiddleware.js"
import {createFolder,getRootFolders,getFolderById,deleteFolder} from "../controllers/foldercontrollers.js"
const folderRouter=express.Router()

folderRouter.post("/",verifytoken,createFolder)
folderRouter.get("/",verifytoken,getRootFolders) //gets all root folders accordingly to specific users
folderRouter.get("/:id",verifytoken,getFolderById) //id of parent folders goes into  route parameter 
folderRouter.delete("/:id",verifytoken,deleteFolder) //deleting the folder based on user id and folder id

export default folderRouter