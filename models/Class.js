const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        unique:false
    },
    nameOfNumeric:{
        type:String,
        trim:true,
        requred:true,
        unique:false
    },
    group:{
        type:String,
        trim:true
    },
    section:{
        type:String,
        trim:true,
        required:true 
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
            code:String
        }
    ]
})

const Class = new model('Class',schema)
module.exports = Class