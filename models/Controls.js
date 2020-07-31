const { Schema,model } = require('mongoose')

const schema = new Schema({
    publicMail:{
        email:String,
        password:String
    },
    forgotPassword:{
        type:Boolean,
    },
    userForgotPassword:{
        type:Boolean
    },
    contactSentMail:{
        type:Boolean
    }
})
const Controls = new model('Controls',schema)
module.exports = Controls 