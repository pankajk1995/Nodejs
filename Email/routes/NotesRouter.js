const express= require('express')

const {notesCreateController, userdeleteController,updateuserController,usernotesController} = require('../controller/notes.controller')
const AuthMiddleware = require('../middleware/Auth')

const NotesRouter= express.Router()

NotesRouter.use(AuthMiddleware)

NotesRouter.post("/create",notesCreateController)

NotesRouter.delete("/delete/:notesId",userdeleteController)
NotesRouter.patch("/update/:notesId",updateuserController)
NotesRouter.get("/usernotes",usernotesController)


module.exports= NotesRouter