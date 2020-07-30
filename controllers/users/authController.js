const bcrypt = require('bcrypt')

const User = require('../../models/User')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')

exports.userLoginGetController = async(req,res,next)=>{
    try{
        let menu = await Menu.find()
        let webModel = await WebModel.findOne()
        return res.render(`pages/user/login`, {
            title: 'LOGIN',
            style: 'bg-dark',
            menu,
            flashMessage: req.flash(),
            webModel
        })
    }catch(e){
        next(e)
    }
}
exports.userLoginPostController = async(req,res,next)=>{
    try{
        let { email,username,password } = req.body
        
        
        let userInfo = email||username 
        if(!userInfo||password.length===0){
            req.flash('fail','Invalid Creadentials')
            return res.redirect('back')
        }
    
        let hasUser;

        if(email){
            let user = await User.findOne({email:email})
            if(!user){
                req.flash('fail','Unregistered User')
                return res.redirect('back')
            }
            hasUser = user
        }else{
            let user  =  await User.findOne({username:username})
            if(!user){
                req.flash('fail','Unregistered User')
                return res.redirect('back')
            }
            hasUser = user
        }

        let matchedPassword = await bcrypt.compare(password,hasUser.password)
        if(!matchedPassword){
            req.flash('fail','Invalid Password')
            return res.redirect('back')
        }
        

       req.flash('success','Successfully Login')
        req.session.userIsLoggedIn = true
        req.session.user = hasUser
        req.session.save(error=>{
            next(error)
        })
        
        res.redirect('/user/dashboard')
        res.end()
    }catch(e){
        next(e)
    }
}
exports.userLogoutGetController = (req,res,next)=>{
    delete req.session.userIsLoggedIn 
    delete req.session.user
    req.session.save(error=>{
        if(error){
            next(error)
        }
        res.redirect('/user/auth/login')
    }) 
}       