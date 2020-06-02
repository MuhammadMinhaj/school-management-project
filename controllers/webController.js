let Menu = require('../models/Menu')
let WebModel = require('../models/WebModel')
exports.webGetController = async(req,res,next)=>{
    try{
        let menu  = await Menu.find()
        let webModel = await WebModel.findOne()
        res.render('pages/index.ejs',{
            title:'Web Explorer',
            menu,
            webModel
        })
    }catch(e){
        next(e)
    }
}