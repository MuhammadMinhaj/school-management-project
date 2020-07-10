const { Schema,model } = require('mongoose')


const schema = new Schema({
    username:{
        type:String,
    },
    classname:{
        type:String
    },
    classSection:{
        type:String
    },
    classgroup:{
        type:String
    },
    status:{
        type:String
    },
    examTitle:{
        type:String
    },
    reject:Boolean,
    approved:Boolean,
    published:Boolean,
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    examination:{
        type:Schema.Types.ObjectId,
        ref:'Examination'
    },
    classes:{
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

const Request = new model('Request',schema) 

module.exports = Request 