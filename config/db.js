const mysql2=require("mysql2")

const db=mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"6155",
    database:"cloud_storage"
})

db.connect((err)=>{
    if (err){
        console.log(`error accoured ${err}`)
    }
    else{
        console.log("successful connection")
    }
})
module.exports=db
