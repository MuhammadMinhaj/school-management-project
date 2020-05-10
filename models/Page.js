const { Schema,model } = require('mongoose')

const schema = new Schema({
    title:{
        type:String,
        trim:true,
        maxlength:100,
        required:true
    },
    body:{
        type:String,
        trim:true,
        maxlength:true,
        required:true
    },
    picture:String
})

const Page = new model('Page',schema)
module.exports = Page