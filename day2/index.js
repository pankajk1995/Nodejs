// read data


const fs = require("fs")

fs.readFile("./db.json","utf8",(err,data)=>{
    if(err){
        console.log(err)
    }
    else{
        console.log(data)
    }
})