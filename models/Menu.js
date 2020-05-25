const { Schema,model } = require('mongoose')
const schema = new Schema({
    name:String,
    href:String,
    pages:{
        type:Schema.Types.ObjectId,
        ref:'Page'
    },
    dropDown:[
        {   
            name:String,
            href:String,
            pages:{
                type:Schema.Types.ObjectId,
                ref:'Page'
            },
            _id:false
        }
    ]
        
    
    ,
    createdAt:{
        type:Date,
        default:Date.now
    }
  
    
})

const Menu = new model('Menu',schema)
module.exports = Menu;