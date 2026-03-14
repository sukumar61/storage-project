import pool from "../config/db.js"

export const createUser=async(name,email,hashedpassword)=>{
    const [result]=await pool.query(
        `insert into users(username, email, password)
        values(?,?,?)`,[name,email,hashedpassword]
    )
    return result

}
export const findUserByEmail=async(email)=>{
    const [user]=await pool.query(`select * from users where email=?`,[email])
    return user[0]

}