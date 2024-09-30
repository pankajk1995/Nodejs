const express = require('express');

const router = express.Router();

const MenuItem=require('../models/Menu')
// Menu item post method
router.post('/',async(req,res)=>{
    const data= req.body

    try {
        const newMenu = new MenuItem(data)
        const response = await newMenu.save()
        console.log('data saved')
        res.status(200).json(response)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
})

// get all menu item list
router.get('/',async(req,res)=>{
    try {
        const data=await MenuItem.find()
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({error:'internal server erros'})
    } 
 })

 // get parmeterised in taste

 router.get('/:tastetype',async(req,res)=>{
    try {
        const tastetype= req.params.tastetype
        if(tastetype=='sweet' || tastetype=='spicy'|| tastetype=='sour')
        {
            const response = await MenuItem.find({taste:tastetype})
            res.status(200).json(response);
        }else{
            res.status(400).json({ error: "invalid worktype" });
        }
    } catch (error) {
        res.status(500).json({ error: "internal server error" });
    }
 })

 module.exports=router