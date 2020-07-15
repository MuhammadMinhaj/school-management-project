const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:String,
    teachers:[
        {
            image:String,
            name:String,
            qualifications:String,
            bio:String,
            socialLinks:{
                email:String,
                phone:String,
                website:String
            }
        }
    ]
})

const Teacher = new model('Teacher',schema)

module.exports = Teacher