const express= require('express')

const router=express.Router()

const login=require('./../models/Login')
const { route } = require('./menuItemsRoutes')

// get user

router.get('/',(req,res)=>{
    try {
        res.send('welcome login page')
    } catch (error) {
        res.send('somethin wrong')
    }
})

//post method

router.post('/',async(req,res)=>{
    const data= req.body
    try {
        const newlogin=new login(data)
        const response= await newlogin.save()
        console.log("data saved");
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "internal server error" });
    }
})
//parameter 

router.get('/:usertype',async(req,res)=>{
    try {
        const usertype= req.params.usertype;
        if(usertype=='admin'|| usertype=='agent'||usertype=='client'){
            const response= await login.find({user_type:usertype})
            res.status(200).json(response);
        }else{
            res.status(400).json({ error: "invalid usertype" });
        }
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
})

module.exports=router