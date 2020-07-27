const { Schema,model } = require('mongoose')

const schema = new Schema({
    // counter:String,
    device:String,
    os:String,
    ip:String,
    browser:String,
    date:String,
    month:String,
    year:String 
})

const Visitor = new model('Visitor',schema)

module.exports = Visitor 