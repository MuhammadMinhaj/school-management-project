const { Schema,model } = require('mongoose')

const schema = new Schema({
    image:{
        type:String,
        required:true
    }        
})

const Gallery = new model('Gallery',schema)
module.exports = Gallery