const { Schema,model } = require('mongoose')

const schema = new Schema({
    types:{
        type:String,
        trim:true,
        required:true
    },
    result:{
        type:String,
        trim:true,
        required:true
    },
    gpa:{
        type:String,
        trim:true,
        required:true
    },

    approved:{
        type:Boolean
    },
    pending:{
        type:Boolean
    },
    reject:{
        Boolean
    },
    subject:[
        {
            name:{
                type:String,
                trim:String,
                required:true 
            },
            number:{
                type:String,
                trim:String,
                required:true   
            },
            grade:{
                type:String,
                trim:String,
                required:true 
            }
        }
    ],
    Student:{
        type:Schema.Types.ObjectId,
        ref:'Student'
    }


})

const Result = new model('Result',schema)
module.exports = Result