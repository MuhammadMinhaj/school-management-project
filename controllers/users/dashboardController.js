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

exports.userDashboardGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'dashboard')
    }catch(e){
        next(e)
    }
}