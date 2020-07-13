const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const ExaminationType = require('../../models/ExaminationType')

async function renderPageHandler(req,res,pagename,title){
    try{
        let menu  = await Menu.find()
        let webModel = await WebModel.findOne()
        let examinationType = await ExaminationType.find()
        res.render(`pages/web/${pagename}`,{
            title,
            menu,
            webModel,
            examinationType:examinationType?examinationType:[]
        })
    }catch(e){
        console.log(e)
    }
}


exports.resultsPublicationGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'resultsPublication.ejs','Results')
    }catch(e){
        next(e)
    }
}