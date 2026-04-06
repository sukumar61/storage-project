import express from "express"
import fs from "fs"
import multer from "multer"
import verifytoken from "../middleware/authMiddleware.js"
import {uploadFile,getFiles,getStorageUsage,downloadFile} from "../controllers/fileController.js"

const storage=multer.diskStorage(
    {
       destination:(req,file,callBack)=>{
        const folder=`uploads/${req.user.userid}` //creating folder destination
        fs.mkdirSync(folder,{recursive:true}) 
        callBack(null,folder) //if no errors then uploading the file

       },
       filename:(req,file,callback)=>{
        const unqiueName=`${Date.now()}-${file.originalname}`
        callback(null,unqiueName)
       }
    }
)
const upload=multer({storage}) //passing the storagedisk obj to the multer function
const fileRouter=express.Router()
fileRouter.post("/upload",verifytoken,upload.single("file"),uploadFile)
fileRouter.get("/",verifytoken,getFiles)
fileRouter.get("/storage",verifytoken,getStorageUsage)
fileRouter.get("/:id/download",verifytoken,downloadFile)

export default fileRouter