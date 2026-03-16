import {createFolderqury,getAllFolders} from "../modles/folderModels.js"

export const createFolder=async (req,res)=>{
    const {userid}=req.user
    const{foldername,parent_folder_id }=req.body
    console.log(userid,foldername,parent_folder_id)

    const result=await createFolderqury(userid,foldername,parent_folder_id)
    
    res.status(201).json({message:"Folder Created",Folder_id:result.insertId})
}
export const getRootFolders=async(req,res)=>{ //gets the all roots folders according to user id
    const{userid}=req.user
    const result=await getAllFolders(userid)
    res.status(201).json({message:"got all folders",usersFolders:result})
}