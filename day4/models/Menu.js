const mongoose = require('mongoose')


const menuSchema= new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','sour'],
        require:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
        default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }
})

const Menu= mongoose.model('Menu',menuSchema)

module.exports=Menu