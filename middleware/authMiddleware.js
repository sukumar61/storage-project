import jwt from"jsonwebtoken"



const verifytoken=(req,res,next)=>{

    if (!req.headers["authorization"]){
        return res.status(401).json({message:"authorization not found"})

    }
    const token=req.headers["authorization"].split(" ")[1]
    if(token===""){
        return res.status(401).json({message:"no token sent"})
    }
    jwt.verify(token,process.env.JWT_SECRET,(err,decode)=>{
        if(err){
            return res.status(403).json({message:"unauthorized user"})
        }
        else{
            req.user=decode
            next()
        }
    })

}

export default verifytoken