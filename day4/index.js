const express = require('express')
const dotenv= require('dotenv')
dotenv.config()
const app = express()
const db= require('./db')
const bodyParser= require('body-parser')
app.use(bodyParser.json());

 app.get('/',(req,res)=>{
    res.send(' welcom to Hygen Hotel')
 })


// import router

const PersonRoutes=require('./routes/PersonRoutes')
const menuItemsRoutes=require('./routes/menuItemsRoutes')
const loginRoutes=require('./routes/loginRoutes')
// use the routes
app.use('/person',PersonRoutes)
 app.use('/menu',menuItemsRoutes)
 app.use('/login',loginRoutes)
app.listen(process.env.PORT || 3030 , ()=>{
    console.log(`db connected on ${process.env.PORT}`)
})