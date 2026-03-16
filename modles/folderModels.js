import pool from "../config/db.js"

export const createFolderqury=async (user_id,folder_name,parent_folder_id)=>{
    const [result]=await pool.query(`insert into folders(user_id,folder_name,parent_folder_id)
        values(?,?,?);`,[user_id,folder_name,parent_folder_id])
    return result

}