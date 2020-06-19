const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:true 
    },
    nameOfNumeric:{
        type:String,
        trim:true,
        unique:true, 
        requred:true
    },
    group:{
        type:String,
        trim:true
    },
    section:{
        type:String,
        trim:true 
    },
    student:[
        {
            type:Schema.Types.ObjectId,
            ref:'Student'
        }
    ],
    subject:[
        {
            name:String,
        }
    ]
})

const Class = new model('Class',schema)
module.exports = Class