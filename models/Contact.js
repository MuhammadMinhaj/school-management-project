const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:String,
    email:String,
    phone:String,
    subject:String,
    message:String,
    date:String,
    status:Boolean,
    history:[
        {
            name:String,
            to:String,
            subject:String,
            message:String,
            date:String
        }
    ]
})

const Contact = new model('Contact',schema)
module.exports = Contact

