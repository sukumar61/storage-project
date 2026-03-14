
import express from "express"
import cors from 'cors'
import router from "./routes/authRoutes.js"




const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{

    res.status(200).json({name:"hello user"})

})

app.use("/api/auth",router)

app.listen(3000,()=>{
    console.log("server started")
})
