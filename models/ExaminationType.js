const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:String,
})

const ExaminationType = new model('ExaminationType',schema)

module.exports = ExaminationType