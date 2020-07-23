const { Schema,model } = require('mongoose')

const schema = new Schema({
    name:{
        type:String,
        trim:String,
    },
    // subCategory:[
    //     {
    //         name:{
    //             type:String,
    //             trim:String,
    //         },
    //     }
    // ],
})
const Category = new model('Category',schema)


module.exports = Category 