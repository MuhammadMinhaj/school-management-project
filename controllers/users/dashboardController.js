const bcrypt = require('bcrypt')

const User = require('../../models/User')
const WebModel = require('../../models/WebModel')
const Class  = require('../../models/Class')
const ExaminationType = require('../../models/ExaminationType')
const Student  = require('../../models/Student')

let searchForItems = [
    {
		name:'Create Class',
		url:'/user/class/create',
		search:'create class'
    },
    {
        name:'Status',
        url:'/user/results/published/status',
        search:'status results published'
    },
    {
        name:'Profile',
        url:'/user/profile',
        search:'change password profile'
    },
    {
        name:'Logout',
        url:'/user/auth/logout',
        search:'logout singout'
    },
    {
        name:'Website',
        url:'/',
        search:'website home'
    },
    {
        name:'Dashboard',
        url:'/user/dashboard',
        search:'dashboard home'
    },
]
// Render Handler
async function renderPageHandler(req,res,pagename,searchItems){
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
            let hasClass = false
            for(let s of searchForItems){
                if(c._id.toString()===s.id){
                    hasClass = true 
                }
            } 
            // Start
            if(!hasClass){

                searchForItems.push({
                name:`Class ${c.name}`,
                id:c._id.toString(),
                uniq:c.name,
                url:`/user/class/update/${c._id}`,
                search:`class ${c.name.toLowerCase()} ${c.nameOfNumeric}`
                })  

                searchForItems.push({
                name:`Add Student In Class ${c.name}`,
                id:c._id.toString(),
                url:`/user/student/create/${c._id}`,
                search:`add student class ${c.name.toLowerCase()} ${c.nameOfNumeric}`
                })

                searchForItems.push({
                    name:`Create Exam In Class ${c.name}`,
                    id:c._id.toString(),
                    url:`/user/class/exam/create/${c._id}`,
                    search:`create exam in class ${c.name.toLowerCase()} ${c.nameOfNumeric}`
                })

                searchForItems.push({
                    name:`Create Results In Class ${c.name}`,
                    id:c._id.toString(),
                    url:`/user/results/create/${c._id}`,
                    search:`create results in class ${c.name.toLowerCase()} ${c.nameOfNumeric}`
                })

                searchForItems.push({
                    name:`Passed Result In Class ${c.name}`,
                    id:c._id.toString(),
                    url:`/user/results/all/passed/${c._id}`,
                    search:`passed results in class ${c.name.toLowerCase()} ${c.nameOfNumeric}`
                })      
                searchForItems.push({
                    name:`Failed Result In Class ${c.name}`,
                    id:c._id.toString(),
                    url:`/user/results/all/failed/${c._id}`,
                    search:`failed results in class ${c.name.toLowerCase()} ${c.nameOfNumeric}`
                })
            }
            // End
        }

        return res.render(`pages/user/${pagename}`, {
            title: 'User Login',
			error:{},
            user:req.user?req.user:{},
			flashMessage: req.flash(),
            classes,
            webModel,
            ExaminationCount,
            totalStudents,
            totalResults,
            searchItems
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
    let { search } = req.query
    let searchItems = []
    if(search){
        for(let s of searchForItems){
            if(s.search.includes(search.toString().toLowerCase())){
                searchItems.push(s)
            }
        }
    }
    renderPageHandler(req,res,'dashboard',searchItems)  
  
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