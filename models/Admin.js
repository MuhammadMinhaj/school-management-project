const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        trim:true,
       
    },
    username:{
        type:String,
        trim:true,
        minlength:6,
        maxlength:30,
        default:'admin',
       
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        trim:true
    },
    password:{
        type:String,
        minlength:5
    },
    dateOfBirthday:{
        type:String,
        trim:true
    },
    securityPassword:{
        type:String,
        minlength:6,
        maxlength:16,
    },
    gender:{
        type:String,
        
    }
})

const Admin = new model('Admin',schema)
module.exports = Admin