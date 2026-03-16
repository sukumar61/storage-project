import {createFolderqury} from "../modles/folderModels.js"

const createFolder=async (req,res)=>{
    const {userid}=req.user
    const{foldername,parent_folder_id }=req.body
    console.log(userid,foldername,parent_folder_id)

    const result=await createFolderqury(userid,foldername,parent_folder_id)
    
    res.status(201).json({message:"Folder Created",Folder_id:result.insertId})
}
export default createFolder