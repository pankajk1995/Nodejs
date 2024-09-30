const mongoose=require('mongoose')
//define the user 
 const loginSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    user_type:{
        type:String,
        enum:['admin','agent','client'],
        required:true
    },
    password:{
        type:String,
        required:true
    }
 })

 const login= mongoose.model('login',loginSchema)

 module.exports=login