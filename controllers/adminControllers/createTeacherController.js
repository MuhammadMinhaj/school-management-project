const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const fs = require('fs')


const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const User = require('../../models/User')
const Admin = require('../../models/Admin')
const Category = require('../../models/Category')
async function renderPageHandler(req,res,pagename,msgOpt,msg,Usermodel,error,errorData){
    try{    
        let pages = await Page.find()
        let webModel = await WebModel.findOne()
        let users = await User.find()
        let category = await Category.find()
        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/administrator/${pagename}`, {
                title: 'Notice',
                style: 'bg-light',
                error: error?error:{},
                data: req.admin,
                pages,
                users:Usermodel?Usermodel:users,
                createdPage:{},
                flashMessage: req.flash(),
                webModel,
                errorData:errorData?errorData:{}
                ,
                contacts:[],
                category
        })
    }catch(e){
        console.log(e)
    }
}
function removeFilePath(path,next){
    fs.unlink(`public/uploads/images/${path}`,error=>{
        if(error){
            return next(error)
        }
    })
}
function makeDateHandler(){
    let date = new Date()
    let willConvertTextMonth = date.getMonth()
    let month;
    switch(parseInt(willConvertTextMonth)){
        case 1 :
            month = 'January'
            break;
        case 2 :
            month = 'February'
            break;
        case 3 :
            month = 'March' 
            break;
        case 4 :
            month = 'April'
            break;
        case 5 :
            month = 'May'
            break;
        case 6 :
            month = 'June'
            break;
        case 7 :
            month = 'July'
            break;
        case 8 :
            month = 'August'
            break 
        case 9 : 
            month = 'September'
            break;
        case 10 :
            month = 'October'
            break;
        case 11 :
            month = 'November'
            break;
        case 12:
            month = 'December'
    }
    let correctDate = {
        date:date.getDate(),
        month,
        year:date.getFullYear()
    }
    return correctDate
}

exports.createUserGetController = async (req,res,next)=>{
    try{
        renderPageHandler(req,res,'createTeacher')
    }catch(e){
        next(e)
    }
}

exports.createUserPostController = async(req,res,next)=>{
    try{
        let { name,username,email,phone,password,gender } = req.body
        let error = validationResult(req).formatWith(err=>err.msg)

   
        if(!error.isEmpty()){
            let errorData = {
                name,
                username,
                email,
                phone,
                gender
            }
            if(req.file){
                removeFilePath(req.file.filename,next)
            }
           return renderPageHandler(req,res,'createTeacher','fail','Invalid Creadentials',null,error.mapped(),errorData)
        }

        let hasPassword  = await bcrypt.hash(password,11)
        
        let user = new User({
            name,
            username,
            email,
            phone,
            password:hasPassword,
            gender,
            picture:req.file?req.file.filename:'',
            createdAt:makeDateHandler().date+' '+makeDateHandler().month+' '+makeDateHandler().year
        })

        let createdUser = await user.save()
        if(!createdUser){
            req.flash('fail','Internal Server Error')
            res.redirect('back')
        }

        req.flash('success','Successfully Created User')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}

exports.updateUserPostController = async(req,res,next)=>{
    try{    

        let { name,username,email,phone,password,gender,securityPassword } = req.body
        let file = req.file 

        let error = validationResult(req).formatWith(err=>err.msg)
        if(!error.isEmpty()){
            if(file){
                removeFilePath(file.filename,next)
            }
           return renderPageHandler(req,res,'createTeacher','fail','Invalid Creadentials',null,error.mapped())
        }

        if(password.length!==0){

        let admin = await Admin.findOne({_id:req.admin._id})
            if(securityPassword.length!==0){
                let securityPasswordCheck = await bcrypt.compare(securityPassword,admin.securityPassword)
                if(!securityPasswordCheck){
                    if(file){
                        removeFilePath(file.filename,next)
                    }
                    return renderPageHandler(req,res,'createTeacher','fail','Security Password Dosen\'t Matched',null,error.mapped())
                }
            }else{
                if(file){
                    removeFilePath(file.filename,next)
                }
                req.flash('fail','Please provied security password if you want to change user password')
                return res.redirect('back')
            }
        
        }

        let previousPassword;
        let previousImage;
        let user = await User.findOne({_id:req.params.id})
        if(user){
            previousPassword = user.password
            previousImage = user.picture?user.picture:undefined
        }
        let hashedPassword; 
        if(password){
            hashedPassword =  await bcrypt.hash(password,11)
        }
        let updatedUser = await User.findOneAndUpdate({_id:req.params.id},{
            name,
            username,
            email,
            phone,
            gender,
            password:password?hashedPassword:previousPassword,
            picture:file?file.filename:previousImage
        },{new:true})

        if(!updatedUser){
            if(file){
                removeFilePath(file.filename,next)
            }
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        if(file){
           if(previousImage) removeFilePath(previousImage,next)
        }
        req.flash('success','Successfully Updated User')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}

exports.deleteUserGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let user = await User.findOneAndRemove({_id:id},{new:true})

        if(!user){
            return res.redirect('/administrator/user/create')
        }
        
        if(user.picture)removeFilePath(user.picture,next)
        
        req.flash('success','Successfully Deleted User')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}