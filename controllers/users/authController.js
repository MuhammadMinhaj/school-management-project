const bcrypt = require('bcrypt')

const User = require('../../models/User')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const { validationResult } = require('express-validator')
// Render Handler
async function renderPageHandler(req,res,pagename,msgOpt,msg,error){
    try{    
        let menu = await Menu.find()
        let webModel = await WebModel.findOne()

        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/user/${pagename}`, {
            title: 'User Login',
			style: 'bg-dark',
			error: error?error:{},
			menu,
			flashMessage: req.flash(),
			webModel
        })
    }catch(e){
        console.log(e)
    }
}

exports.userLoginGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'login')
    }catch(e){
        next(e)
    }
}
exports.userLoginPostController = async(req,res,next)=>{
    try{
        let { email,username,password } = req.body
        
        
        let userInfo = email||username 
        if(!userInfo||password.length===0){
            return renderPageHandler(req,res,'login','fail','Invalid Creadentials')
        }
    
        let hasUser;

        if(email){
            let user = await User.findOne({email:email})
            if(!user){
                return renderPageHandler(req,res,'login','fail','Email Not Founded')
            }
            hasUser = user
        }else{
            let user  =  await User.findOne({username:username})
            if(!user){
                return renderPageHandler(req,res,'login','fail','Username Not Founded')
            }
            hasUser = user
        }

        let matchedPassword = await bcrypt.compare(password,hasUser.password)
        if(!matchedPassword){
            return renderPageHandler(req,res,'login','fail','Password Dosn\'t Matched')
        }
        

       req.flash('success','Successfully You re Login Your Dashboard')
        req.session.userIsLoggedIn = true
        req.session.user = hasUser
        req.session.save(error=>{
            if(error){
                return next(error)
            }
        })
        res.redirect('/user/dashboard')
        // renderPageHandler(req,res,'dashboard','success','Successfully Login')

    }catch(e){
        next(e)
    }
}