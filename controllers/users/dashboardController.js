const User = require('../../models/User')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const Class  = require('../../models/Class')

// Render Handler
async function renderPageHandler(req,res,pagename,msgOpt,msg,error){
    try{    
        let classes = await Class.find()
        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/user/${pagename}`, {
            title: 'User Login',
			error: error?error:{},
            user:req.user?req.user:{},
			flashMessage: req.flash(),
			classes
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