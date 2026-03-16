import {createFolderqury,getAllFolders,getFoldersByParentId,deleteFolderFromDB} from "../modles/folderModels.js"

export const createFolder=async (req,res)=>{
    try{
        const {userid}=req.user
        const{foldername,parent_folder_id }=req.body
        console.log(userid,foldername,parent_folder_id)
        const result=await createFolderqury(userid,foldername,parent_folder_id)
        res.status(201).json({message:"Folder Created",Folder_id:result.insertId})

    }
    catch(err){
        res.status(500).json({ error: err.message })
    }

}
export const getRootFolders=async(req,res)=>{ //gets the all roots folders according to user id
    try{
        const{userid}=req.user
        const result=await getAllFolders(userid)
        res.status(200).json({message:"got all folders",usersFolders:result})

    }
    catch(err){
        res.status(500).json({ error: err.message })

    }

}

export const getFolderById=async(req,res)=>{
    try{
        const {userid}=req.user
        const{id}=req.params //gets the id from params from pathparameters
        const result=await getFoldersByParentId(userid,id)
        res.status(200).json({message:"got all folders from parent_folder",childFolders:result})
    }
    catch(err){
        res.status(500).json({ error: err.message })
    }
    
}

export const deleteFolder=async(req,res)=>{
    try{

        const {userid}=req.user
        const{id}=req.params //gets id from pathparameters
        const result=await deleteFolderFromDB(userid,id) 
        res.status(200).json({message:"Folder deleted",})

    }
    catch(err){
        res.status(500).json({ error: err.message })

    }
}
