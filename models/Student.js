const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true 
    },
    fatherName:{
        type:String,
        trim:true,
        required:true,
    },
    motherName:{
        type:String,
        trim:true,
        required:true,
    },
    dateOfBirthday:{
        type:String,
        trim:true,
        required:true
    },
    class:{
        type:String,
        trim:true,
        required:true,
    },
    group:{
        type:String,
        trim:true,
        required:true 
    },
    id:{
        type:String,
        trim:true,
        required:true 
    },
    result:{
        type:Schema.Types.ObjectId,
        ref:'Result'
    }

})

const Student = new model('Student',schema)
module.exports = Student