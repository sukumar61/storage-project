import e from "express";
import pool  from "../config/db.js";
import fs from "fs"


export const uploadFile=async (req,res)=>{
    try{
        const {originalname,path,size,mimetype}=req.file
        const {userid}=req.user
        const folder_id=req.body.folder_id || null
        const [usage]=await pool.query(
            'select  sum(filesize) as used from files where user_id=?',[userid]
        )
        const usedbytes=usage[0].used||0

        const [plan]=await pool.query(`
            select storage_limit from plans where id=(select plan_id from users where id=?)
            `,[userid])
        const storage_limit=plan[0].storage_limit

        if (usedbytes+size >storage_limit){
            fs.unlinkSync(path)
            return res.status(403).json({message:"storage limit as exceeded"})
        }

        await pool.query(
            `insert into files (user_id,folder_id,filename,filepath,filesize,mimetype)
            values(?,?,?,?,?,?)`,
            [userid,folder_id,originalname,path,size,mimetype]
        )

        return res.status(200).json({message:"file uploaded succesfulgily"})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

export const getFiles=async(req,res)=>{
    try{
        const {userid}=req.user
        const folder_id=req.query.folder_id || null
        const [files]=await pool.query(`
            select * from files where user_id=? and folder_id <=>?`,[userid,folder_id])
        console.log(files)
        res.status(200).json({message:files})

    }
    catch(error){
        console.log(error.message)
        res.status(500).json({message:"internal Server Error"})
    }
}

export const getStorageUsage=async (req,res)=>{
    try{
        const {userid}=req.user

        const [usage]=await pool.query('select sum(filesize) as used from files where user_id=?',[userid])
        const [plan]=await pool.query("select storage_limit from plans where id= (select plan_id from users where id=?)",[userid])
        const usedBytes=usage[0].usage || 0
        const storage_limit=plan[0].storage_limit 
        const percentage=Math.round((usedBytes/storage_limit)*100)
        res.status(200).json({usedBytes,storage_limit,percentage})
        console.log(userid)

    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const downloadFile=async (req,res)=>{
    try{
        const {id}=req.params
        const {userid}=req.user
        const [files]=await pool.query(`select * from files where id=? and user_id=?`,[id,userid])
        if (files.length===0){
            return res.status(404).json({message:"File Not Found"})
        }
        const file=files[0]
        return res.download(file.filepath,file.filename)


    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const deleteFile=async (req,res)=>{
    try{
        const {id}=req.params
        const {userid}=req.user
        console.log(userid)
        const [files]=await pool.query(`select * from files where user_id=? and id=?`,[userid,id])
        if(files.length===0){
            return es.status(403).json({message:"File Not Found"})
        }
        const file=files[0]

        fs.unlinkSync(file.filepath)
        await pool.query(`delete from files where id =?`,[id])

        res.status(200).json({message:"File deleted successfully"})

    }
    catch(err){
        console.log(err.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}