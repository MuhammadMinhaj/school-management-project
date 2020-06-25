const Class = require('../../models/Class')
const User = require('../../models/User')
const Student = require('../../models/Student')
const Result = require('../../models/Result')

async function renderPageHandler(req,res,pagename,msgOpt,msg,singleClass,subjectFieldError,fieldError,id,subjectFieldValue,result){
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
        subjectFieldValue:subjectFieldValue?subjectFieldValue:{},
        result:result?result:''
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
        // console.log(Object.keys(subjectFieldError))
        // console.log(Object.keys(fieldError))
        if(Object.keys(subjectFieldError).length!==0||Object.keys(fieldError).length!==0){

           return renderPageHandler(req,res,'createResults','fail','Please Provied Full Info About Student For Make A Result',hasClass,subjectFieldError,fieldError,studentid,valueOfField)
        }

         let createResult = new Result({
            totalStudents:hasClass.student.length,
            workingDays:workingdays,
            presentDays:presentdays,
            session:session,
            types:type,
            submited:false
        })

        let valueOfSubjectFields = Object.entries(others)
       
        let subjectOfAstValue = []
        let subjectOfBndValue = []

        let mainSubjectOfValue = []
        let subjectAandSubjectBFields = []
        let valueOfOptionalSubject = []

     
        // Difference Subject For Get Value
        let subjects = []

        // Added Full Marks And PassedMarks And Subject Code From Class in Subjects Array
        for(let fieldOfValue of valueOfSubjectFields){
            for(let classOfSubject of hasClass.subject){
                if(fieldOfValue[0].toLowerCase().toString()===classOfSubject.name.toLowerCase().toString()){
                    fieldOfValue.push(classOfSubject.fullMarks)
                    fieldOfValue.push(classOfSubject.passedMarks)
                    fieldOfValue.push(classOfSubject.code)
                    subjects.push(fieldOfValue)
                }
            }
            for(let optSubjectOfClass of hasClass.optionalSubject){
                if(fieldOfValue[0].slice(3).toLowerCase().toString()===optSubjectOfClass.name.toLowerCase().toString()){
                    fieldOfValue.push(optSubjectOfClass.fullMarks)
                    fieldOfValue.push(optSubjectOfClass.passedMarks)
                    fieldOfValue.push(optSubjectOfClass.code)
                    subjects.push(fieldOfValue)
                }
            }
        }
        

        for(let fields of subjects){

            if(fields[0].includes('opt')){
                valueOfOptionalSubject.push(fields)
            }else{
                if(fields[0].toLowerCase().includes('1st paper')){
                    subjectOfAstValue.push(fields)
                }
                if(fields[0].toLowerCase().includes('2nd paper')){
                    subjectOfBndValue.push(fields)
                }
                if(!fields[0].toLowerCase().includes('1st paper')&&!fields[0].toLowerCase().includes('2nd paper')){
                    mainSubjectOfValue.push(fields)
                }
            }
        }
        // Subject 1s paper and Subject 2nd Paper marge in array (subjectAandSubjectBFields)
       for(let fieldOfA of subjectOfAstValue){
           for(let fieldOfB of subjectOfBndValue){
               if(fieldOfA[0].toLowerCase().slice(0,-9)===fieldOfB[0].toLowerCase().slice(0,-9)){
                subjectAandSubjectBFields.push(fieldOfA)
                subjectAandSubjectBFields.push(fieldOfB)
               }
           }
       }
       
    //    console.log('Start')
    //    console.log(mainSubjectOfValue)
    //    console.log('Break1')
    //    console.log(subjectAandSubjectBFields)
    //    console.log('Break2')
    //    console.log(valueOfOptionalSubject)
   
       let createdResult = await createResult.save()

       if(!createdResult){
           req.flash('fail','Internal Server Error')
        return res.redirect('back')
       }

        await Student.findOneAndUpdate({_id:studentid},{
        result:createdResult._id,
        hasResult:true,
       },{new:true})

        await Result.findOneAndUpdate({_id:createdResult._id},{
        student:studentid
       },{new:true})

       let addedAllSubjectInResult;

       if(mainSubjectOfValue.length!==0){
           for(let subject of mainSubjectOfValue){
            addedAllSubjectInResult = await Result.findOneAndUpdate({_id:createdResult._id},{
                $push:{
                    subjects:{
                        name:subject[0],
                        obtainedMarks:subject[1],
                        fullMarks:subject[2],
                        passedMarks:subject[3],
                        code:subject[4]
                    }
                }
            },{new:true})
           }
       }
       if(subjectAandSubjectBFields.length!==0){
        for(let subject of subjectAandSubjectBFields){
            addedAllSubjectInResult = await Result.findOneAndUpdate({_id:createdResult._id},{
                $push:{
                    subjectAandSubjectB:{
                        name:subject[0],
                        obtainedMarks:subject[1],
                        fullMarks:subject[2],
                        passedMarks:subject[3],
                        code:subject[4]
                    }
                }
            },{new:true})
           }
       }
       if(valueOfOptionalSubject.length!==0){
        for(let subject of valueOfOptionalSubject){
            addedAllSubjectInResult = await Result.findOneAndUpdate({_id:createdResult._id},{
                $push:{
                    optionalSubject:{
                        name:subject[0].slice(3),
                        obtainedMarks:subject[1],
                        fullMarks:subject[2],
                        passedMarks:subject[3],
                        code:subject[4]
                    }
                }
            },{new:true})
           }
       }
       

       if(!addedAllSubjectInResult){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
       }

       req.flash('success','Successfully Created Result')
       res.redirect('back')


    //    console.log(addedAllSubjectInResult)
    //    console.log('Break')
    //    console.log(resultIdStoreInStudent)
    //    console.log('Subject Main')
    //    console.log(mainSubjectOfValue)
    //    console.log('Subject 1st and 2nd papers')
    //     console.log(subjectAandSubjectBFields)
    //     console.log('Subject Optional')
    //     console.log(valueOfOptionalSubject)
       
    }catch(e){
        next(e)
    }
}

exports.editResultGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let result = await Result.findOne({_id:id})
        console.log(result)
        if(!result){
            return res.redirect('back')
        }
        renderPageHandler(req,res,'editResult',null,null,null,null,null,null,null,result)
    }catch(e){
        next(e)
    }
}
exports.editResultPostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { workingdays,presentdays,session,type,...others } = req.body 
        
        let result = await Result.findOne({_id:id})

        if(!result){
            return res.redirect('back')
        }

        let subjectFieldError = {}
        let fieldError = {}
       
        Object.entries(others).forEach((fields,ind)=>{
            if(!fields[1]){
                subjectFieldError[fields[0]] = `Please Provied Obtained Marks Of ${fields[0]}`
            }
        })
        workingdays.length===0?fieldError.workingdays='Please Provied Working Days':''
        presentdays.length===0?fieldError.presentdays='Please Provied Present Days':''
        session.length===0?fieldError.session='Please Provied Session':''
        type.length===0?fieldError.type='Please Provied Type':''

        if(Object.keys(subjectFieldError).length!==0||Object.keys(fieldError).length!==0){
            req.flash('fail','Cannot Empty Subject Field')
            return res.redirect('back')
        }


        let subjects = []
        let combinationSubjects = []
        let optionalSubjects = []


        Object.entries(others).forEach((fields,ind)=>{
            if(fields[0].includes('subject')){
                subjects.push(fields)
            }            
        })

        Object.entries(others).forEach((fields,ind)=>{
            if(fields[0].includes('combsub')){
                combinationSubjects.push(fields)
            }
        })
        Object.entries(others).forEach((fields,ind)=>{
            if(fields[0].includes('opt')){
                optionalSubjects.push(fields)
            }
        })

       
       
        let updatedResults = await Result.findOneAndUpdate({_id:id},{
            workingDays:workingdays,
            presentDays:presentdays,
            session:session,
            types:type,

        },{new:true})

        if(!updatedResults){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }

        if(subjects.length!==0){
            updatedResults.subjects.forEach(subjectA=>{
                subjects.forEach(subjectB=>{
                    if(subjectA.name.toString().toLowerCase()===subjectB[0].toString().toLowerCase().slice(7)){
                        subjectA.obtainedMarks = subjectB[1]
                    }
                })
            })    
        }
        
        if(combinationSubjects.length!==0){
            updatedResults.subjectAandSubjectB.forEach(subjectA=>{
                combinationSubjects.forEach(subjectB=>{
                    if(subjectA.name.toString().toLowerCase()===subjectB[0].toString().toLowerCase().slice(7)){
                        subjectA.obtainedMarks = subjectB[1] 
                    }
                })
            })
        }
      
        if(optionalSubjects.length!==0){
            updatedResults.optionalSubject.forEach(subjectA=>{
                optionalSubjects.forEach(subjectB=>{
                    if(subjectA.name.toString().toLowerCase()===subjectB[0].toString().toLowerCase().slice(3)){
                        subjectA.obtainedMarks = subjectB[1]
                    }
                })
            })
        }
        
        let updatedSubjectOfResult = await Result.findOneAndUpdate({_id:updatedResults._id},updatedResults,{new:true})

        if(!updatedSubjectOfResult){
            req.flash('fail','Internal Server Error')
        }
        req.flash('success','Successfully Updated Result')
        res.redirect('back')
        
    }catch(e){
        next(e)
    }
}