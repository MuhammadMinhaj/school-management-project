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
    resultType:{
        type:String,
        trim:true,
    },
    resultCalculateType:{
        type:String,
        trim:true,
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
            code:String,
            passedMarks:String,
            fullMarks:String,
        }
    ],
    optionalSubject:[
        {
            name:String,
            code:String,
            passedMarks:String,
            fullMarks:String,
        }
    ],
    user:{ 
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    examination:[
        {
            type:Schema.Types.ObjectId,
            ref:'Examination'
        }
    ]
    
})

const Class = new model('Class',schema)
module.exports = Class