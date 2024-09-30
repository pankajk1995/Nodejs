const mongoose =require('mongoose')


// define the mongo connection URL
const mongoURL= 'mongodb://127.0.0.1:27017/hotel'
//Setup MongoDB Connection 
mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

// Get the default connection 
const db= mongoose.connection;

// define event listener
db.on('connected',()=>{
    console.log('db connected')
})

db.on('error',()=>{
    console.log('getting error')
})
db.on('disconnected',()=>{
    console.log('db disconnected')
})


// export database connection 

module.exports= db