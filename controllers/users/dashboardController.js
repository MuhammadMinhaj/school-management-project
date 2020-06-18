const User = require('../../models/User')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')

// Render Handler
async function renderPageHandler(req,res,pagename,msgOpt,msg,error){
    try{    
        let menu = await Menu.find()
        let webModel = await WebModel.findOne()

        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/user/${pagename}`, {
            title: 'User Login',
			error: error?error:{},
			menu,
			flashMessage: req.flash(),
			webModel
        })
    }catch(e){
        console.log(e)
    }
}

exports.userDashboardGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'dashboard')
    }catch(e){
        next(e)
    }
}