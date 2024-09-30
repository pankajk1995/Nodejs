const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const NotesModel = require("../models/notesModel");
dotenv.config();
const notesCreateController = async (req, res) => {
  const {title, body} =req.body
  try {
    await NotesModel.create({ title, body, userId:req.user?._id });
    res.status(201).json({ messsage: "Notes created successfully" });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }

 
};

// delete notes if user is login 
const userdeleteController=async(req,res)=>{
  const {notesId}= req.params
  const userid= req.user._id
  try {
    const data= await NotesModel.findOne({userId:userid,_id:notesId})
    if(!data){
      return res.status(400).json({message:"please login"})
    }
    await NotesModel.findByIdAndDelete(notesId)
    res.status(200).json({message:"notes deleted successfully"})
  } catch (error) {
    res.status(400).json({message:"something went wrong"})
  }
}

// update 
const updateuserController=async(req,res)=>{
  const {notesId}= req.params
  const userid= req.user._id
  try {
    const data= await NotesModel.findOne({userId:userid,_id:notesId})
    if(!data){
      return res.status(400).json({message:"please login"})
    }
    await NotesModel.findByIdAndUpdate(notesId,{...req.body})
    res.status(200).json({message:"notes update successfully"})
  } catch (error) {
    res.status(400).json({message:"something went wrong"})
  }
}

const usernotesController=async(req,res)=>{

  const userid= req.user._id
  try {
    const data= await NotesModel.find({userId:userid})
    if(!data){
      return res.status(400).json({message:"data not found"})
    }
    res.status(200).json({message:"notes update successfully",notes:data})
  } catch (error) {
    res.status(400).json({message:"something went wrong"})
  }
}

module.exports = { notesCreateController,userdeleteController,updateuserController ,usernotesController};
