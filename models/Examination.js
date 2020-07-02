const { Schema,model } = require('mongoose')

const schema = new Schema({
    title:{
        type:String,
        trim:true
    },
    name:{
        type:String,
        trim:true
    },
    year:{
        type:String,
        trim:true
    },
    classid:{
        type:Schema.Types.ObjectId,
        ref:'Class'
    },
    results:[
        {
            type:Schema.Types.ObjectId,
            ref:'Result'
        }
    ]
})
const Examination = new model('Examination',schema)

module.exports = Examination 