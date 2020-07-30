const bcrypt = require('bcrypt')

const User = require('../../models/User')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const Class  = require('../../models/Class')
const ExaminationType = require('../../models/ExaminationType')
const Student  = require('../../models/Student')
// Render Handler
async function renderPageHandler(req,res,pagename,msgOpt,msg,error){
    try{    
        let classes = await Class.find({user:req.user._id})
        let webModel = await WebModel.findOne()
        let ExaminationCount = await ExaminationType.countDocuments()

        let totalStudents = 0
        let totalResults = 0
        for(let c of classes){
            let students = await Student.find({classId:c._id})
            totalStudents += students.length 
            for(let s of students){
                totalResults += s.result.length
            }
        }

        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/user/${pagename}`, {
            title: 'User Login',
			error: error?error:{},
            user:req.user?req.user:{},
			flashMessage: req.flash(),
            classes,
            webModel,
            ExaminationCount,
            totalStudents,
            totalResults
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
exports.userDashboardGetController = (req,res,next)=>{
    renderPageHandler(req,res,'dashboard')
}
exports.userProfileGetController = (req,res,next)=>{ 
    renderPageHandler(req,res,'profile')
}

exports.userProfileUpdatePostController = async(req,res,next)=>{
    try{
        let { name,username,email,phone,radio } = req.body 
        let { id } = req.params
        let file = req.file 

        let user = await User.findOne({_id:id})
        let path = user.picture

        if(name.length===0||username.length===0||email.length===0||phone.length===0||radio.length===0){
            if(file){
                removeFilePath(file.filename,next)
            }
            req.flash('fail','Please Provied Full Info,Cannot Empty Fields')
            return res.redirect('back')
        }

        let updatedProfile = await User.findOneAndUpdate({_id:id},{
            name,
            username,
            email,
            phone,
            gender:radio,
            picture:file?file.filename:path
        },{new:true})

        if(!updatedProfile){
            if(file){
                removeFilePath(file.filename,next)
            }
            
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        if(file){
            removeFilePath(path,next)
        }
        req.flash('success','Successfully Updated Profile')
        res.redirect('back')

    }catch(e){
        next(e)
    }
}

exports.userChangePasswordPostController = async(req,res,next)=>{
    try{
        let { oldPassword,password,confirmPassword } = req.body 
        let { id } = req.params
        let user = await User.findOne({_id:id})

        if(oldPassword.length===0||password.length===0||confirmPassword.length===0){
            req.flash('fail','Please Provied Details,Cannot Empty Failed!')
            return res.redirect('back')
        }
        
        let matchedPassword = await bcrypt.compare(oldPassword,user.password)
        if(!matchedPassword){
            req.flash('fail','Old Password Dosen\'t Macthed, Please Provied Valid Old Password.')
            return res.redirect('back')
        }
        if(password!==confirmPassword){
            req.flash('fail','Confirm Password Dosen\'t Macthed.')
            return res.redirect('back')
        }
        if(password.length<6){
            req.flash('fail','Password Must Be Greater Then 5 Character')
            return res.redirect('back')
        }

        let hashedPassword = await bcrypt.hash(password,11)

        let updatedPassword = await User.findOneAndUpdate({_id:id},{
            password:hashedPassword
        },{new:true})
        if(!updatedPassword){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Updated Passowrd')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}