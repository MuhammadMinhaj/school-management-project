let Menu = require('../models/Menu')
let WebModel = require('../models/WebModel')
exports.webGetController = async(req,res,next)=>{
    try{
        let menu  = await Menu.find()
        let webModel = await WebModel.findOne()
        console.log(webModel)
        // res.send('<h5>Assalamu Alaikum</h5>')
        res.render('pages/index',{
            title:'Web Explorer',
            menu,
            webModel
        })
        // res.json({
        //     message:'Assalamu Aalaikum',
        //     models:webModel,
        //     menus:menu
        // })
    }catch(e){
        next(e)
    }
}