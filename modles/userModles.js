const db=require("../config/db")

async function createuser(name,email,passwordhash) {
    
    const qury="insert into users (username,email,password) values(?,?,?)"
    const [result]=db.execute(qury,[name,email,passwordhash])
    return result
}

module.exports={createuser}