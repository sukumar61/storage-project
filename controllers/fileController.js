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