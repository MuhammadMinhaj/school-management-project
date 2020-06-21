const Class = require('../../models/Class')
const User = require('../../models/User')
const Student = require('../../models/Student')


async function renderPageHandler(req,res,pagename,msgOpt,msg,singleClass,errorData){
    try{    
        let classes = await Class.find({user:req.user._id})
        let correntPage = parseInt(req.query.page||1)
        let itemPerPage = 5
        let totalStudent = await Student.find({classId:singleClass._id}).countDocuments()

        let students = await Student.find({classId:singleClass._id}).skip((itemPerPage*correntPage)-itemPerPage).limit(itemPerPage)
        
        let totalPage = parseInt(totalStudent/itemPerPage)
        
        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/user/${pagename}`,{
            title: 'Notice',
            error: {},
            user:req.user,
            classes,
            students,
            totalPage,
            correntPage,
            singleClass:singleClass?singleClass:{},
            flashMessage: req.flash(),
            errorData
        })
    
    }catch(e){
        console.log(e)
    }
}

exports.createClassGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'createClass')
    }catch(e){
        next(e)
    } 
}
exports.createClassPostController = async(req,res,next)=>{
    try{
 
        let { name,numeric,section,group } = req.body

        if(name.length===0||numeric.length===0||section.length===0){
            return renderPageHandler(req,res,'createClass','fail','Invalid Creadentials')
        }
        if(numeric>=9){
            if(!group){
                return renderPageHandler(req,res,'createClass','fail','Please Select Group For Grater Then Or Equal Class 9')
            }
        }
        // Check Unique

        let hasClass;
        let classes = await Class.find()
        if(classes.length!==0){
            classes.forEach(c=>{
                if(numeric>=9){
                    if(c.name===name||c.nameOfNumeric===numeric){
                        if(c.section===section&&c.group===group){
                  
                            hasClass = ` Group ${group} Of Section ${section} Of Class ${name} Already Exist`
            
                            return false
                        }
                    }
                }else{
                    if(c.name===name&&c.nameOfNumeric===numeric&&c.section===section){
                        hasClass = ` Section ${section} Of Class ${name} Already Exist`
                        return false
                    }
                }
                
            })
        }
        if(hasClass){
            return renderPageHandler(req,res,'createClass','fail',hasClass)
        }
        
        let createClass = new Class({
            name,
            nameOfNumeric:numeric,
            section,
            group,
            user:req.user._id
        })
        let createdClass = await createClass.save()
        if(!createdClass){
            return renderPageHandler(req,res,'createClass','fail','Internal Server Error')
        }
        await User.findOneAndUpdate({_id:req.user._id},{
            $push:{
                classes:createdClass._id
            }
        })
        renderPageHandler(req,res,'createClass','success','Successfully Created Class')

    }catch(e){
        next(e)
    }
}
exports.updateClassGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            res.redirect('/user/class/create')
        }
        renderPageHandler(req,res,'updateClass',null,null,hasClass)
    }catch(e){
        next(e)
    }
}
exports.updateClassPostController = async(req,res,next)=>{
    try{
        let { name,numeric,section,group } = req.body
        let { id } = req.params 
        console.log(req.body)
        console.log(req.params)   

        // Check Unique
        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            return res.redirect('/user/class/create')
        }

        if(name.length===0||numeric.length===0||section.length===0){
            return renderPageHandler(req,res,'updateClass','fail','Invalid Creadentials',hasClass)
        }
        if(numeric>=9){
            if(!group){
                return renderPageHandler(req,res,'updateClass','fail','Please Select Group For Grater Then Or Equal Class 9',hasClass)
            }
        }
        
        let hasClassError;
        let classes = await Class.find()
        if(classes.length!==0){
            classes.forEach(c=>{
               if(c._id.toString()!==id.toString()){
                if(numeric>=9){
                    if(c.name===name||c.nameOfNumeric===numeric){
                        if(c.section===section&&c.group===group){
                  
                            hasClassError = ` Group ${group} Of Section ${section} Of Class ${name} Already Exist`
            
                            return false
                        }
                    }
                }else{
                    if(c.name===name&&c.nameOfNumeric===numeric&&c.section===section){
                        hasClassError = ` Section ${section} Of Class ${name} Already Exist`
                        return false
                    }
                }
               }
                
            })
        }
        if(hasClassError){
            return renderPageHandler(req,res,'updateClass','fail',hasClassError,hasClass)
        }
        
        let updatedClass = await Class.findOneAndUpdate({_id:id},{
            name,
            nameOfNumeric:numeric,
            section,
            group
        },{
            new:true
        })

        if(!updatedClass){
            return renderPageHandler(req,res,'updateClass','fail','Internal Server Error',hasClass)
        }

        renderPageHandler(req,res,'updateClass','success','Successfully Updated Class',updatedClass)


    }catch(e){
        next(e)
    }
}
exports.deleteClassGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        
        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            return res.redirect('/user/class/create')
        }

        let deletedClass = await Class.findOneAndDelete({_id:id})
        if(!deletedClass){
            renderPageHandler(req,res,'createClass','fail','Internal Server Error')
        }
        await User.findOneAndUpdate({_id:req.user._id},{
            $pull:{
                classes:id
            } 
        },{
            new:true
        })
        req.flash('success','Successfully Deleted Class')
        res.redirect('back')

    }catch(e){
        next(e)
    }
}
exports.classSubjectAddPostController = async (req,res,next)=>{
    try{
        let { id } = req.params
        let { name,code } = req.body

        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            res.redirect('/user/class/create')
        }
        if(name.length===0){
            return renderPageHandler(req,res,'updateClass','fail','Please Subject Name',hasClass)
        }
        
        let hasError;

        if(hasClass.subject.length!==0){
            hasClass.subject.forEach(s=>{
                if(s.name.toLowerCase()===name.toLowerCase()||s.code===code){
                    hasError = `${name} Already Exist`
                }
            })
        }
        if(hasError){
            return renderPageHandler(req,res,'updateClass','fail',hasError,hasClass)
        }
        
        let addedSubjectOnClass = await Class.findOneAndUpdate({_id:id},{
            $push:{
                subject:{
                    name,
                    code:code?code:''
                }
            }
        },{new:true})

        if(!addedSubjectOnClass){
            return renderPageHandler(req,res,'updateClass','fail','Internal Server Error',hasClass)
        }
        
        req.flash('success','Successfully Added Subject')
        res.redirect('back')

    }catch(e){
        next(e)
    }
}
exports.classSubjectUpdatePostController = async (req,res,next)=>{
    try{

        let { classId,subjectId } = req.params
        let { name,code } = req.body

        let hasClass = await Class.findOne({_id:classId})
        if(!hasClass){
            res.redirect('/user/class/create')
        }
        if(name.length===0){

            req.flash('fail','Please Enter Subject Name')
            return res.redirect('back')
        }
        
        let hasError;

 
        hasClass.subject.forEach(s=>{
           if(s._id.toString()!==subjectId.toString()){
            if(s.name.toLowerCase()===name.toLowerCase()||s.code===code){
                hasError = `${name} Already Exist`
            }
           }
        })
        
        if(hasError){
            req.flash('fail',hasError)
            return res.redirect('back')
        }
        
        hasClass.subject.forEach(s=>{
            if(s._id.toString()===subjectId.toString()){
                s.name = name 
                s.code = code?code:''
                return false
            }
        })

        let updatedSubject = await Class.findOneAndUpdate({_id:classId},hasClass,{new:true})
        if(!updatedSubject){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        
        req.flash('success','Successfully Updated Subject')
        res.redirect('back')

    }catch(e){
        next(e)
    }
}
exports.classSubjectRemoveGetController = async(req,res,next)=>{
    try{
        let { classId,subjectId } = req.params 
        
        let hasClass = await Class.findOne({_id:classId})
        if(!hasClass){
            req.flash('fail','Please Create Class')
            return res.redirect('/user/class/create')
        }
        let deletedSubject = await Class.findOneAndUpdate({_id:classId},{
            $pull:{
                subject:{
                    _id:subjectId
                }
            }
        },{new:true})
        if(!deletedSubject){
            return renderPageHandler(req,res,'updateClass','fail','Internal Server Error',hasClass)
        }
        req.flash('success','Successfully Deleted Subject')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.createStudentGetController = async(req,res,next)=>{
    try{
        let { id } = req.params 
        let hasSingleClass = await Class.findOne({_id:id})
        if(!hasSingleClass){
            return res.redirect('back')
        }
        renderPageHandler(req,res,'studentClass',null,null,hasSingleClass)
    }catch(e){
        next(e)
    }
}
exports.createStudentPostController = async(req,res,next)=>{
    try{
        let { classid } = req.params
        let { name,fathername,mothername,guardianphone,dateofbirthday,roll } = req.body 
        
        let hasSingleClass = await Class.findOne({_id:classid})
        if(!hasSingleClass){
            return res.redirect('back')
        } 
        
        if(name.length===0||fathername.length===0||mothername.length===0||guardianphone.length===0||dateofbirthday.length===0||roll.length===0){
            return renderPageHandler(req,res,'studentClass','fail','Please Fill Up Full Form',hasSingleClass,req.body)
        }

        let getAllStudents = await Student.find({classId:classid})
        let alreadyCreatedStudent = false;
        if(getAllStudents){
            getAllStudents.forEach((s)=>{
                if(s.name===name&&s.fatherName===fathername&&s.motherName===mothername&&s.dateOfBirthday===dateofbirthday&&s.phone===guardianphone&&s.roll===roll){
                    alreadyCreatedStudent = true 
                    return false
                }
            })
        }
        if(alreadyCreatedStudent){
            req.flash('fail','Already Existing This Student')
            return res.redirect('back')
        }

        let createStudent = new Student({
            name:name,
            fatherName:fathername,
            motherName:mothername,
            dateOfBirthday:dateofbirthday,
            phone:guardianphone,
            roll:roll,
            classId:hasSingleClass._id
        })
      
        let createdStudent = await createStudent.save()
        if(!createdStudent){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        let addStudentIdInClass = await Class.findOneAndUpdate({_id:hasSingleClass._id},{
            $push:{
                student:createdStudent._id
            }
        })
        if(!addStudentIdInClass){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Created Student')
        res.redirect('back')

    }catch(e){
        next(e)
    }
}
exports.updateStudentPostController = async(req,res,next)=>{
    try{
        let { id } =  req.params
        let { name,fathername,mothername,guardianphone,dateofbirthday,roll } = req.body 
        if(name.length===0||fathername.length===0||mothername.length===0||guardianphone.length===0||dateofbirthday.length===0||roll.length===0){
            req.flash('fail','Invalid Creadentials')
            return res.redirect('back')
        }

        let hasStudent = await Student.findOne({_id:id})
        if(!hasStudent){
            return res.redirect('back')
        }

        let getAllStudents = await Student.find({classId:hasStudent.classId})
    
        let alreadyCreatedStudent = false;
        getAllStudents.forEach((s)=>{
            if(s.name===name&&s.fatherName===fathername&&s.motherName===mothername&&s.dateOfBirthday===dateofbirthday&&s.phone===guardianphone&&s.roll===roll){
                alreadyCreatedStudent = true 
                return false
            }
        })

        if(alreadyCreatedStudent){
            req.flash('fail','Already Existing This Student')
                return res.redirect('back')
        }

        let updatedStudent = await Student.findOneAndUpdate({_id:id},{
            name:name,
            fatherName:fathername,
            motherName:mothername,
            dateOfBirthday:dateofbirthday,
            phone:guardianphone,
            roll:roll,
        },{new:true})
        if(!updatedStudent){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Updated Student')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.studentDeleteGetController = async(req,res,next)=>{
    try{
        let { stuid,classid } = req.params   
        
        let hasSingleClass = await Class.findOne({_id:classid})
        let hasStudent = await Student.findOne({_id:stuid})
        if(!hasStudent||!hasSingleClass){
            return res.redirect('back')
        }      
        let deletedStudent = await Student.findOneAndDelete({_id:stuid})
        if(!deletedStudent){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        let deletedStudentIdFromClass = await Class.findOneAndUpdate({_id:classid},{
            $pull:{
                student:deletedStudent._id
            }
        },{new:true})
        if(!deletedStudentIdFromClass){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Deleted Student')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}