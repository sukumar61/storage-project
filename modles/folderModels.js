import pool from "../config/db.js"

export const createFolderqury=async (user_id,folder_name,parent_folder_id)=>{
    const [result]=await pool.query(`insert into folders(user_id,folder_name,parent_folder_id)
        values(?,?,?);`,[user_id,folder_name,parent_folder_id])
    return result

}
export const getAllFolders=async(user_id)=>{
    const [result]=await pool.query(`select * from folders where user_id=? AND parent_folder_id IS NULL;`,[user_id]) 
    return result
}

export const getFoldersByParentId=async(user_id,parent_folder_id)=>{
    const [result]=await pool.query(`select * from folders where user_id=? and parent_folder_id=?;`,[user_id,parent_folder_id])
    return result
}

export const deleteFolderFromDB=async(user_id,id)=>{
    const [result]=await pool.query(`delete from folders where id=? and user_id=?`,[id,user_id])
    return result
}