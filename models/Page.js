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
        required:true
    },
    menu:String,
    image:String
})

const Page = new model('Page',schema)
module.exports = Page