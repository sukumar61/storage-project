
import express from "express"
import cors from 'cors'
import router from "./routes/authRoutes.js"
import folderRouter from "./routes/folder.js"
import fileRouter from "./routes/files.js"




const app=express()
app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/", (req,res)=>{

    res.status(200).json({name:"hello user"})

})

app.use("/api/auth",router)
app.use("/folder",folderRouter)
app.use("/files",fileRouter)

app.listen(3000,()=>{
    console.log("server started")
})
