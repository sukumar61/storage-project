import dotenv from 'dotenv'
dotenv.config()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {createUser,findUserByEmail} from "../modles/userModles.js"



export const register=async (req,res)=>{
    try{
        const{email,name,password}=req.body
        const hashedpassword=await bcrypt.hash(password,10)
        await createUser(name,email,hashedpassword)
        res.status(201).json({message:"User Created Successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}

export const login=async (req,res)=>{
    try{
        const {email,password}=req.body
        const user=await findUserByEmail(email)

        if(!user){
            return res.status(404).json({message:"user not found"})
        }

        const isPasswordMatching=await bcrypt.compare(password,user.password)
        if (isPasswordMatching){
            const payload={userid:user.id,email:user.email}
            console.log(payload,process.env.JWT_SECRET)
            const token=jwt.sign(payload,process.env.JWT_SECRET)
            res.status(200).json({token:token})
        }
        else{
            res.status(401).json({message:"Unauthorized user"})
        }
    }

    catch(err){
        console.log(err)
        res.status(500).json({message:"something went wrong"})
    }
}