import express from "express"
import cors from 'cors'
import bcrypt from "bcrypt"


const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extension:true}))


app.listen(3000,()=>{
    console.log("server started")
})

app.get("/", (req,res)=>{
    res.status(200).json({name:"ashkulu puli"})
})

app.post("/register",async (req,res)=>{
    const name="aishu"
    const email="aishukasam@gmail.com"
    const password="aishu@puli"
    const hashedpassword= await bcrypt.hash(password,10)
    console.log(hashedpassword)
})