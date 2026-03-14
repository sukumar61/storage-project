import bcrypt from "bcrypt"
import {createUser,findUserByEmail} from "../modles/userModles.js"



export const register=async (req,res)=>{
    try{
        const{email,name,password}=req.body
        const hashedpassword=await bcrypt.hash(password,10)
        await createUser(name,email,hashedpassword)
        res.status(201).json({message:"user created added"})
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
            res.status(200).json({message:"login succesful"})
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