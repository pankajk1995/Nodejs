const jwt = require("jsonwebtoken");
const dotenv= require('dotenv');
dotenv.config()
const UserModel = require("../models/userModel");
const AuthMiddleware= async(req,res,next)=>{

    const token = req?.cookies?.accessToken
  try {
    const {email}= jwt.verify(token,process.env.privateKey)
    const user= await UserModel.findOne({email})
    console.log(user)
    if(!user) {
        return res.status(404).json({messsage:"user not found"});
    }else{
        req.user=user
    next()
    }
    
    
  } catch (error) {
    return res.status(401).json({messsage:"invalid token"})
  }
}

module.exports=AuthMiddleware