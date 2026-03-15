import dotenv from 'dotenv'
dotenv.config()
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {createUser,findUserByEmail} from "../modles/userModles.js"

import{body,validationResult} from "express-validator" //used to validate the input from user
export const validateRegister=[
    //body(name)==req.body.name
    body("name").trim().notEmpty().withMessage("Name is required"), //if after triming if there is a  empty input ,then returns false and message sent
    body("email").normalizeEmail().isEmail().withMessage("provide the valid email"),
    body("password").isLength({min:9}).withMessage("provide password +9 letters")
]
 



export const register=async (req,res)=>{
    try{
        const error=validationResult(req) //this will check for any error are there in validationResult by checking each element
        if (!error.isEmpty()){ //if any errors are found it will not be empty so we will just make it as true to start if constion flow
            return res.status(400).json({error:error.array()}) //here a list of errors that are in array are sent as object to client

        }


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

export const validateLogin=[
    body("email").normalizeEmail().isEmail().withMessage("please enter valid email"),
    body("password").isLength({min:9}).withMessage("password length should be 9+ ")
]

export const login=async (req,res)=>{
    try{

        const err=validationResult(req)
        if (!err.isEmpty()){
            return res.status(400).json({error:err.array()})
        }
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

export const userprofile=(req,res)=>{
    res.status(200).json({user:req.user})

}