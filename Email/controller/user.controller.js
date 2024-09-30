const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const dotenv=require('dotenv')
dotenv.config()
const bcrypt= require('bcrypt')
const Sendmail = require("../utils/SendOtp");
const UserModel = require("../models/userModel");
const userregistercontroller= async (req, res) => {
    const { name, email, password } = req.body;
    
    try {
      // Generate OTP
      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
        lowerCaseAlphabets: false,
      });
  
      // Create JWT token for verification
      const verificationToken = jwt.sign(
        { name, email, password,otpGenerator:otp },
        process.env.privateKey
      );
  
      console.log("Generated OTP:", otp);
      console.log("Verification Token:", verificationToken);
  
      // Render the OTP email template using EJS
      const htmlTemplate = await ejs.renderFile(
        __dirname + "/../views/email.ejs",
        { otp, name }
      );
  
      // Send the email
      await Sendmail(email, htmlTemplate );
  
      // Respond with success message
      res.cookie("verificationToken",verificationToken).json({ message: "OTP sent successfully", verificationToken });
      
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "An error occurred during registration" });
    }
  }
  
const verificationcontroller=(req,res)=>{
    const {otp}=req.body
    const {verificationToken}= req.cookies
    
    var {name,email,password,otpGenerator}=jwt.verify(verificationToken,process.env.privateKey)
   if(!otp){
    return res.status(400).json({message:"please enter otp"})
   }
   if(otpGenerator!==otp){
    return res.status(400).json({message:"invalid otp"})
   }
   bcrypt.hash(password,5 , async function(err,hash){
    if(err){
      return res.status(400).jsom({message:err.message})
    }else{
      await UserModel.create({name,email,password:hash})
      res.json({message:"user created successfully"})
    }
   })
    res.send('ok')
}

const logincontroller=async (req,res)=>{
  const {email,password}=req.body;
  const user= await UserModel.findOne({email})

  if(!user){
    return res.status(400).json({message:"user not found"})
  }
  bcrypt.compare(password,user.password, function(err,result){
    if(err){
      return res.status(400).json({message:"passworn not match"})
    }if(result){
      const token= jwt.sign({email},process.env.privateKey)
      res.cookie("accessToken",token).json({message:"Login successfully"})
    }
    else{
      res.json({message:"user is login"})
    }
  })

}

  module.exports={userregistercontroller,verificationcontroller,logincontroller}