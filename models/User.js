const { Schema,model } = require('mongoose')


const schema = new Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    username:{
        type:String,
        trim:true,
        requried:true 
    },
    email:{
        type:String,
        trim:true,
        required:true
     },
     phone:{
         type:String,
         trim:true,
         required:true
     },
     password:String,
     gender:{
         type:String,
         trim:true,
         required:true 
     },
     picture:String,
     createdAt:String,
})

const User = new model('User',schema)
module.exports = User