const { Schema,model } = require('mongoose')

const schema = new Schema({
    title:{
        type:String,
        trim:true
    },
    text:{
        type:String,
        trim:true 
    },
    date:{
        type:String,
        trim:true 
    },
    status:Boolean,
    file:String,
    id:{
        type:Number,
        default:0,
        unique:true
    },
    category:{
        type:Schema.Types.ObjectId,
        ref:'Category'
    }

})

const Notice = new model('Notice',schema)

module.exports = Notice 