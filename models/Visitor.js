const { Schema,model } = require('mongoose')

const schema = new Schema({
    // counter:String,
    device:String,
    date:String,
    ip:String
})

const Visitor = new model('Visitor',schema)

module.exports = Visitor 