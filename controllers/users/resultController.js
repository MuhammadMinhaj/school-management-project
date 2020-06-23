const Class = require('../../models/Class')
const User = require('../../models/User')
const Student = require('../../models/Student')




async function renderPageHandler(req,res,pagename,msgOpt,msg,singleClass,subjectFieldError,fieldError,id,subjectFieldValue){
    let classes = await Class.find({user:req.user._id})
    let correntPage  = parseInt(req.query.page)||1
   
    let itemPerPage = 5
    let students;
    let totalStudents;
    let totalPage;

    if(singleClass){    
        totalStudents = await Student.find({classId:singleClass._id}).countDocuments()
        totalPage = parseInt(totalStudents/itemPerPage)
        students = await Student.find({classId:singleClass._id}).skip((itemPerPage*correntPage)-itemPerPage).limit(itemPerPage)
    }

    if(msg) req.flash(msgOpt,msg)
    return res.render(`pages/user/${pagename}`,{
        title: 'Notice',
        fieldError: fieldError?fieldError:{},
        user:req.user,
        classes,
        students,
        totalStudents,
        totalPage,
        correntPage,
        singleClass:singleClass?singleClass:{},
        flashMessage: req.flash(),
        subjectFieldError:subjectFieldError?subjectFieldError:{},
        id:id?id:'',
        subjectFieldValue:subjectFieldValue?subjectFieldValue:{}
    })
}


exports.resultGetController = async (req,res,next)=>{
    try{

        let { classid } = req.params

        let hasClass = await Class.findOne({_id:classid})

        if(!hasClass){
            return res.redirect('back')
        }
        renderPageHandler(req,res,'createResults',null,null,hasClass)
    }catch(e){
        next(e)
    }
}
exports.createResultPostController = async(req,res,next)=>{
    try{
        let { classid,studentid } = req.params
        let { workingdays,presentdays,session,type,...others } = req.body 

        let subjectFieldError = {}
        let fieldError = {}
        let hasClass = await Class.findOne({_id:classid})

        if(!hasClass){
            return res.redirect('back')
        }

        Object.entries(others).forEach((fields,ind)=>{
            if(!fields[1]){
                // subjectFieldError[fields[0].toString().trim().toLowerCase().slice(0,3)+ind] = 's'
                subjectFieldError[fields[0]] = `Please Provied Obtained Marks Of ${fields[0]}`
            }
        })
        workingdays.length===0?fieldError.workingdays='Please Provied Working Days':''
        presentdays.length===0?fieldError.presentdays='Please Provied Present Days':''
        session.length===0?fieldError.session='Please Provied Session':''
        type.length===0?fieldError.type='Please Provied Type':''


        let valueOfField = {
            workingdays,
            presentdays,
            session,
            type,
            ...others
        }
        console.log(Object.keys(subjectFieldError))
        console.log(Object.keys(fieldError))
        if(Object.keys(subjectFieldError).length!==0||Object.keys(fieldError).length!==0){
           return renderPageHandler(req,res,'createResults',null,null,hasClass,subjectFieldError,fieldError,studentid,valueOfField)
        }
        console.log('Passed')
    }catch(e){
        next(e)
    }
}

