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
    phone:{
        type:String,
        trim:true,
        required:true
    },
    roll:{
        type:String,
        trim:true,
        required:true 
    },
    result:{
        type:Schema.Types.ObjectId,
        ref:'Result'
    },
    classId:{
        type:Schema.Types.ObjectId,
        ref:'Class'
    }

})

const Student = new model('Student',schema)
module.exports = Student