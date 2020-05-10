const { Schema,model } = require('mongoose')

const schema = new Schema({
    menu:[
        {
            name:String,
            href:String
        }
    ],
    Page:[
        {
            type:Schema.Types.ObjectId,
            ref:'Page'
        }
    ]
})

const Menu = new model('Menu',schema)
module.exports = Menu;