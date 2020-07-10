const Class = require('../../models/Class')
const User = require('../../models/User')
const Student = require('../../models/Student')
const Result = require('../../models/Result')
const WebModel = require('../../models/WebModel')
const Examination = require('../../models/Examination')
const Request = require('../../models/Request')
const { all } = require('../../routes/user/authRoute')
const { has } = require('config')

async function renderPageHandler(req,res,pagename,msgOpt,msg,singleClass,subjectFieldError,fieldError,id,subjectFieldValue,result,results,selectedExam,searchValue){
    try{
        let classes = await Class.find({user:req.user._id})
        let webModel = await WebModel.findOne()
        let examination =  await Examination.find({classid:singleClass._id})
    
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
            examination:examination?examination:{},
            selectedExam:selectedExam?selectedExam:{},
            students,
            webModel,
            totalStudents,
            totalPage,
            correntPage,
            singleClass:singleClass?singleClass:{},
            flashMessage: req.flash(),
            subjectFieldError:subjectFieldError?subjectFieldError:{},
            id:id?id:'',
            subjectFieldValue:subjectFieldValue?subjectFieldValue:{},
            result:result?result:'',
            results:results?results:'',
            searchValue:searchValue?searchValue:{}
        })
    }catch(e){
        console.log(e)
    }
}

function resultDiviededHandler(queryname,results){

    let finalResult = []

    if(queryname==='passedresults'){
        for(let result of results){
            if(result.passedOrFailed){
                finalResult.push(result)
            }
        }
    }
    if(queryname==='failedresults'){
        for(let result of results){
            if(!result.passedOrFailed){
                finalResult.push(result)
            }
        }
    }

    return finalResult

}

exports.createResultGetController = async (req,res,next)=>{
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
        let { workingdays,presentdays,session,type,examination,...others } = req.body 
        
        if(!examination){
            req.flash('fail','Please Create Examination')
            return res.redirect('back')
        }

        let subjectFieldError = {}
        let fieldError = {}
        let hasClass = await Class.findOne({_id:classid})
    
        
        
        
      
        if(!hasClass){
            return res.redirect('back')
        }
       
        Object.entries(others).forEach((fields,ind)=>{
            if(!fields[1]){
                subjectFieldError[fields[0]] = `Please Provied Obtained Marks Of ${fields[0]}`
            }
        })
        workingdays.length===0?fieldError.workingdays='Please Provied Working Days':''
        presentdays.length===0?fieldError.presentdays='Please Provied Present Days':''
        session.length===0?fieldError.session='Please Provied Session':''
        type.length===0?fieldError.type='Please Provied Type':''
        examination==='...'||examination.length===0?fieldError.examination = 'Please Select Examination':''

        let valueOfField = {
            workingdays,
            presentdays,
            session,
            type,
            ...others
        }
        
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
       
       let exam = await Examination.findOne({_id:examination})

       if(!exam){
            req.flash('fail','Please Create Examination')
            return res.redirect('back')
       }

       let createdResult = await createResult.save()

       if(!createdResult){
           req.flash('fail','Internal Server Error')
        return res.redirect('back')
       }

        await Student.findOneAndUpdate({_id:studentid},{
        $push:{
            result:createdResult._id,
        },  
        hasResult:true,
       },{new:true})

       

        await Result.findOneAndUpdate({_id:createdResult._id},{
        student:studentid,
        classid:hasClass._id,
        examination:exam._id
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

    }catch(e){
        next(e)
    }
}

exports.getAllResultsOfOneStudentGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let classes = await Class.find({user:req.user._id})
        let hasStudent = await Student.findOne({_id:id})
       
        let classOfStudent = await Class.findOne({_id:hasStudent.classId})
        hasStudent.classed = classOfStudent
        let results = await Result.find({student:hasStudent._id})
       
        for(let result of results){
            let examination = await Examination.findOne({_id:result.examination})
            result.examInfo = examination
        }
      console.log(results)
        res.render('pages/user/resultsOfStudent.ejs',{
            title:'All Results Of One Student',
            user:req.user,
            classes:classes?classes:{},
            student:hasStudent,
            flashMessage:req.flash(),
            results
        })
    }catch(e){
        next(e)
    }
}
exports.editResultGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let result = await Result.findOne({_id:id})
        // console.log(result)
        if(!result){
            return res.redirect('back')
        }
        let hasClass = await Class.findOne({_id:result.classid})
        
        let examination = await Examination.findOne({_id:result.examination})
        renderPageHandler(req,res,'editResult',null,null,hasClass,null,null,null,null,result,null,examination)
    }catch(e){
        next(e)
    }
}
exports.editResultPostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { workingdays,presentdays,session,type,examination,...others } = req.body 
        
        
       
        
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
        examination==='...'||examination.length===0?fieldError.examination = 'Please Select Examination':''

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

        let exam = await Examination.findOne({_id:examination})
        if(!exam){
            req.flash('fail','Please Create Examination')
            return res.redirect('back')
        }
       
        let updatedResults = await Result.findOneAndUpdate({_id:id},{
            workingDays:workingdays,
            presentDays:presentdays,
            session:session,
            types:type,

        },{new:true})
        console.log('Test',exam)


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

        await Result.findOneAndUpdate({_id:updatedResults._id},{
            examination:exam._id
           },{new:true})
    
        req.flash('success','Successfully Updated Result')
        res.redirect('back')
        
    }catch(e){
        next(e)
    }
}
exports.deleteResultGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        
        let result = await Result.findOneAndDelete({_id:id})
        
        console.log(result)

        let hasStudent = await Student.findOne({_id:result.student})

        let student

        if(hasStudent.result.length===1){
            student = await Student.findOneAndUpdate({_id:result.student},{
                $pull:{
                    result:result._id
                },
                hasResult:false
            },{new:true})
        }else{
            student = await Student.findOneAndUpdate({_id:result.student},{
                $pull:{
                    result:result._id
                },
            },{new:true})
        }
        
        console.log('Break')
        console.log(student)

        if(!result||!student){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Deleted Student Result')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}

// Passed Result And Failed Result Divid Controller 
exports.dividedPassedAndFailedResultController = async(req,res,next)=>{
    try{
        let { id } = req.params
    
        let { option } = req.query

      
        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            return res,redirect('back')
        }
        
        if(!option){
            req.flash('fail','Please Select Examination')
            return res.redirect('back')
        }

        let results = await Result.find({classid:hasClass._id})
        
        for(let result of results){
            if(result.examination.toString()===option.toString()){
                console.log('Massed')
            let failedSubject = false
            let combinationFailedSubject = false
            for(let subject of result.subjects){
                if(Number(subject.obtainedMarks)<Number(subject.passedMarks)){
                    failedSubject = true
                }                
            }
            for(let subject of result.subjectAandSubjectB){
                if(Number(subject.combinationObtainedMarks)<Number(subject.passedMarks)){
                    combinationFailedSubject = true
                }
            }

            if(failedSubject||combinationFailedSubject){
                let updatedResult = await Result.findOneAndUpdate({_id:result._id},{
                    passedOrFailed:false,
                    gradePoint:00,
                    grade:'F',
                    rank:null
                },{new:true})
                if(!updatedResult){
                    req.flash('fail','Internal Server Error')
                    return res.redirect('back')
                }
            }else{
                let updatedResult = await Result.findOneAndUpdate({_id:result._id},{
                    passedOrFailed:true
                },{new:true})
                if(!updatedResult){
                    req.flash('fail','Internal Server Error')
                    return res.redirect('back')
                }
            }
        }    
    }

        req.flash('success','Successfully Divieded All Results')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.allCreateResultsController = async(req,res,next)=>{
    try{    
        let { id } = req.params
        let { option,typeOfcalculate } = req.query
        console.log(req.params)
        console.log(req.query)
       
        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            return res.redirect('back')
        }
        if(!option){
            req.flash('fail','Please Select Examination')
            return res.redirect('back')
        }
        if(!typeOfcalculate||typeOfcalculate!=='gpa'&&typeOfcalculate!=='cgpa'){
            req.flash('fail','Please Select Result Calculation Method')
            return res.redirect('back')
        }
        let results = await Result.find({classid:hasClass._id})
     
         // GPA Calculate
        let gpaResultsHandler = (gradePoint,result)=>{
            let gradepoint = Number(gradePoint)
            
            switch (true){
                case gradepoint===5:
                    result.grade='A+'
                    break;
                case gradepoint>=4&&gradepoint<=4.99:
                    result.grade = 'A'
                    break;
                case gradepoint>=3.5&&gradepoint<=3.99:
                    result.grade = 'A-'
                    break;
                case gradepoint>=3&&gradepoint<=3.49:
                    result.grade = 'B'
                    break;
                case gradepoint>=2&&gradepoint<=2.99:
                    result.grade = 'C'
                    break;
                case gradepoint>=1&&gradepoint<=1.99:
                    result.grade = 'D'
                    break;
                case gradepoint<1:
                    result.grade = 'F'
                    break;
                default :
                    result.grade = null
            }
        }
        
        let gpaSubjectHandler = (obtainedMarks,subject)=>{
            switch (true){
                case obtainedMarks>=80&&obtainedMarks<=100:
                    subject.grade = 'A+'
                    subject.gradePoint = 5
                break
                case obtainedMarks>=70&&obtainedMarks<=79:
                    subject.grade = 'A'
                    subject.gradePoint = 4
                break
                case obtainedMarks>=60&&obtainedMarks<=69:
                    subject.grade = 'A-'
                    subject.gradePoint = 3.5
                break
                case obtainedMarks>=50&&obtainedMarks<=59:
                    subject.grade = 'B'
                    subject.gradePoint = 3
                break
                case obtainedMarks>=40&&obtainedMarks<=49:
                    subject.grade = 'C'
                    subject.gradePoint = 2
                break
                case obtainedMarks>=33&&obtainedMarks<=39:
                    subject.grade = 'D'
                    subject.gradePoint = 1
                break
                case obtainedMarks>=0&&obtainedMarks<=32:
                    subject.grade = 'F'
                    subject.gradePoint = 0
                break
                default:
                    subject.grade = null
                    subject.gradePoint = null
            }
            return true
        }
        let gpaHalfMarksSubjectHandler = (obtainedMarks,subject)=>{
            switch (true){
                case obtainedMarks>=40&&obtainedMarks<=50:
                    subject.grade = 'A+'
                    subject.gradePoint = 5
                break
                case obtainedMarks>=35&&obtainedMarks<=39:
                    subject.grade = 'A'
                    subject.gradePoint = 4
                break
                case obtainedMarks>=30&&obtainedMarks<=34:
                    subject.grade = 'A-'
                    subject.gradePoint = 3.5
                break
                case obtainedMarks>=25&&obtainedMarks<=29:
                    subject.grade = 'B'
                    subject.gradePoint = 3
                break
                case obtainedMarks>=20&&obtainedMarks<=24:
                    subject.grade = 'C'
                    subject.gradePoint = 2
                break
                case obtainedMarks>=17&&obtainedMarks<=19:
                    subject.grade = 'D'
                    subject.gradePoint = 1
                break
                case obtainedMarks>=0&&obtainedMarks<=16:
                    subject.grade = 'F'
                    subject.gradePoint = 0
                break
                default:
                    subject.grade = null
                    subject.gradePoint = null
            }
            return true
        }

        // CGPA CALCULATION HANDLER
        let cGpaResultsHandler = (gradePoint,result)=>{
            let gradepoint = Number(gradePoint)
            switch (true){
                case gradepoint===4:
                    result.grade='A+'
                    break;
                case gradepoint>=3.75&&gradepoint<=3.99:
                    result.grade = 'A'
                    break;
                case gradepoint>=3.50&&gradepoint<=3.74:
                    result.grade = 'A-'
                    break;
                case gradepoint>=3.25&&gradepoint<=3.49:
                    result.grade = 'B+'
                    break;
                case gradepoint>=3&&gradepoint<=3.24:
                    result.grade = 'B'
                    break;
                case gradepoint>=2.75&&gradepoint<=2.99:
                    result.grade = 'B-'
                    break;
                case gradepoint>=2.50&&gradepoint<=2.74:
                    result.grade = 'C+'
                    break;
                case gradepoint>=2.25&&gradepoint<=2.49:
                    result.grade = 'C'
                    break;
                case gradepoint>=2&&gradepoint<=2.24:
                    result.grade = 'D'
                    break;
                case gradepoint<2:
                    result.grade = 'F'
                    break;
                default :
                    result.grade = null
            }
        }
        let cGpaSubjectHandler = (obtainedMarks,subject)=>{
            switch (true){
                case obtainedMarks>=80&&obtainedMarks<=100:
                    subject.grade = 'A+'
                    subject.gradePoint = 4.00
                break
                case obtainedMarks>=75&&obtainedMarks<=79:
                    subject.grade = 'A'
                    subject.gradePoint = 3.75
                break
                case obtainedMarks>=70&&obtainedMarks<=74:
                    subject.grade = 'A-'
                    subject.gradePoint = 3.50
                break
                case obtainedMarks>=65&&obtainedMarks<=69:
                    subject.grade = 'B+'
                    subject.gradePoint = 3.25
                break
                case obtainedMarks>=60&&obtainedMarks<=64:
                    subject.grade = 'B'
                    subject.gradePoint = 3.00
                break
                case obtainedMarks>=55&&obtainedMarks<=59:
                    subject.grade = 'B-'
                    subject.gradePoint = 2.75
                break
                case obtainedMarks>=50&&obtainedMarks<=54:
                    subject.grade = 'C+'
                    subject.gradePoint = 2.50
                break
                case obtainedMarks>=45&&obtainedMarks<=49:
                    subject.grade = 'C'
                    subject.gradePoint = 2.25
                break
                case obtainedMarks>=40&&obtainedMarks<=44:
                    subject.grade = 'D'
                    subject.gradePoint = 2.00
                break
                case obtainedMarks>=0&&obtainedMarks<=39:
                    subject.grade = 'F'
                    subject.gradePoint = 0
                break
                default:
                    subject.grade = null
                    subject.gradePoint = null
            }
            return true
        }
        let cGpaHalfMarksSubjectHandler = (obtainedMarks,subject)=>{
            console.log(obtainedMarks)
            console.log(typeof obtainedMarks)
            switch (true){
                case obtainedMarks>=40&&obtainedMarks<=50:
                    subject.grade = 'A+'
                    subject.gradePoint = 4.00
                break
                case obtainedMarks>=37&&obtainedMarks<=39:
                    subject.grade = 'A'
                    subject.gradePoint = 3.75
                break
                case obtainedMarks>=34&&obtainedMarks<=36:
                    subject.grade = 'A-'
                    subject.gradePoint = 3.50
                break
                case obtainedMarks>=31&&obtainedMarks<=33:
                    subject.grade = 'B+'
                    subject.gradePoint = 3.25
                break
                case obtainedMarks>=28&&obtainedMarks<=30:
                    subject.grade = 'B'
                    subject.gradePoint = 3.00
                break
                case obtainedMarks>=25&&obtainedMarks<=27:
                    subject.grade = 'B-'
                    subject.gradePoint = 2.75
                break
                case obtainedMarks>=22&&obtainedMarks<=24:
                    subject.grade = 'C+'
                    subject.gradePoint = 2.50
                break
                case obtainedMarks>=19&&obtainedMarks<=21:
                    subject.grade = 'C'
                    subject.gradePoint = 2.25
                break
                case obtainedMarks>=17&&obtainedMarks<=18:
                    subject.grade = 'D'
                    subject.gradePoint = 2.00
                break
                case obtainedMarks>=0&&obtainedMarks<=16:
                    subject.grade = 'F'
                    subject.gradePoint = 0
                break
                default:
                    subject.grade = null
                    subject.gradePoint = null
            }
            return true
        }

        for(let result of results){
           if(result.examination.toString()===option.toString()){
            let targetTotalNumberOfPerSubject = 0
            let totalSubjectGreadPoint = 0
            let totalNumberOfPerSubject = 0
            let totalSubject = result.subjects.length+(result.subjectAandSubjectB.length/2);
            // Subject Gread And Gread Point Set With Subject
            for(let subject of result.subjects){
                let obtainedMarks = Number(subject.obtainedMarks)
                
                if(Number(subject.fullMarks)<=50){
                    if(typeOfcalculate==='gpa'){
                        gpaHalfMarksSubjectHandler(obtainedMarks,subject)
                    }   
                    if(typeOfcalculate==='cgpa'){
                        cGpaHalfMarksSubjectHandler(obtainedMarks,subject)
                    }
                   
                }else{
                    if(typeOfcalculate==='gpa'){
                        gpaSubjectHandler(obtainedMarks,subject)
                    }
                    if(typeOfcalculate==='cgpa'){
                        cGpaSubjectHandler(obtainedMarks,subject)
                    }
                }
                totalSubjectGreadPoint+=Number(subject.gradePoint)
                totalNumberOfPerSubject+=Number(subject.obtainedMarks)
                targetTotalNumberOfPerSubject+=Number(subject.fullMarks)
            }
            
            // Combination Subject Dividing From One Array For Addition Tow Subject Obtained Marks
            let subjectsOne = []
            let subjectsTow = []
            for(let i = 0;i<result.subjectAandSubjectB.length/2;i++){

                subjectsOne.push(result.subjectAandSubjectB[i*2])
                
            }
            for(let i = 1;i<result.subjectAandSubjectB.length/2+1;i++){

                subjectsTow.push(result.subjectAandSubjectB[i*2-1])
                
            }
            subjectsOne.forEach((subjectOne,indOne)=>{
                subjectsTow.forEach((subjectTow,indTow)=>{
                    if(indOne===indTow){
                        let additionTowSubject =  Number(subjectOne.obtainedMarks)+Number(subjectTow.obtainedMarks)
                        subjectOne.combinationObtainedMarks =additionTowSubject/2
                        subjectTow.combinationObtainedMarks =additionTowSubject/2   
                        // totalNumberOfPerSubject+=additionTowSubject/2 
                    }
                })
            })
            // Subject Dividing Ended

           for(let combinationSubject of result.subjectAandSubjectB){
                let obtainedMarks = Number(combinationSubject.combinationObtainedMarks)
                if(Number(combinationSubject.fullMarks)<=50){
                   

                    if(typeOfcalculate==='gpa'){
                        gpaHalfMarksSubjectHandler(obtainedMarks,combinationSubject)
                    }
                    if(typeOfcalculate==='cgpa'){
                        cGpaHalfMarksSubjectHandler(obtainedMarks,combinationSubject)
                    }

                }else{
                    if(typeOfcalculate==='gpa'){
                        gpaSubjectHandler(obtainedMarks,combinationSubject)
                    }
                    if(typeOfcalculate==='cgpa'){
                        cGpaSubjectHandler(obtainedMarks,combinationSubject)
                    }
                   
                }
                
            }

            for(let optionalSubject of result.optionalSubject){
                let obtainedMarks = Number(optionalSubject.obtainedMarks)
                if(Number(optionalSubject.fullMarks)<=50){
                    if(typeOfcalculate==='gpa'){
                        gpaHalfMarksSubjectHandler(obtainedMarks,optionalSubject)
                    }   
                    if(typeOfcalculate==='cgpa'){
                        cGpaHalfMarksSubjectHandler(obtainedMarks,optionalSubject)
                    }
                }else{
                    if(typeOfcalculate==='gpa'){
                        gpaSubjectHandler(obtainedMarks,optionalSubject)
                    }
                    if(typeOfcalculate==='cgpa'){
                        cGpaSubjectHandler(obtainedMarks,optionalSubject)
                    }
                    
                }
            }

            for(let i = 0;i<=result.subjectAandSubjectB.length/2-1;i++){
                totalSubjectGreadPoint+=Number(result.subjectAandSubjectB[i*2].gradePoint)
                totalNumberOfPerSubject+=Number(result.subjectAandSubjectB[i*2].combinationObtainedMarks)
                
                targetTotalNumberOfPerSubject+=Number(result.subjectAandSubjectB[i*2].fullMarks)
            }

            
            result.gpa = Number(totalSubjectGreadPoint/totalSubject).toFixed(2)

            // Subject Gread And Gread Point Set With Subject Ended

           


            let resultGradePoint = (totalSubjectGreadPoint/totalSubject).toFixed(2)
            result.totalSubject = totalSubject
            result.targetTotalSubjectNumber = targetTotalNumberOfPerSubject
            result.totalSubjectObtainedNumber = totalNumberOfPerSubject
            result.totalGradePoint = totalSubjectGreadPoint
            result.gradePoint = resultGradePoint


            
            if(typeOfcalculate==='gpa'){
                gpaResultsHandler(resultGradePoint,result)
            }
            
            if(typeOfcalculate==='cgpa'){
                cGpaResultsHandler(resultGradePoint,result)
            }
            

            // for(let subject of result.subjects){
            //     let gradePoint = Number(subject.gradePoint)
            //     if(gradePoint===0){
                     // Null For Use That
            //     }
            // }
            let makingResults = await Result.findOneAndUpdate({_id:result._id},result,{new:true})
            
            if(!makingResults){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }
            console.log(makingResults)
            console.log('Test')
           }
        }
        req.flash('success','Successfully Created All Result')
        return res.redirect('back')
        
    }catch(e){
        next(e)
    }
}
exports.updateAllResultsGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        
        let hasClass = await Class.findOne({_id:id})
        
        if(!hasClass){
            req.flash('fail','Please Create Class')
            return res.redirect('back')
        }
        
        let results = await Result.find({classid:hasClass._id})
  
        for(let result of results){
      
                // Main Subject Update Passed Marks
       
            for(let subjectOfResult of result.subjects){
                for(let subjectOfClass of hasClass.subject){
                    if(subjectOfResult.name.toString().toLowerCase().trim()===subjectOfClass.name.toString().toLowerCase().trim()){
                        subjectOfResult.passedMarks = subjectOfClass.passedMarks
                    }
                }
            }
            
            // Combination Subject Marks Update
            for(let subjectOfResult of result.subjectAandSubjectB){
                for(let subjectOfClass of hasClass.subject){
                    if(subjectOfResult.name.toString().toLowerCase().trim()===subjectOfClass.name.toString().toLowerCase().trim()){
                        subjectOfResult.passedMarks = subjectOfClass.passedMarks
                    }
                }
            }
            // Optional Subject Marks Update
            for(let optionalSubjectOfResult of result.optionalSubject){
                for(let optionalSubjectOfClass of hasClass.optionalSubject){
                    if(optionalSubjectOfResult.name.toString().toLowerCase().trim()===optionalSubjectOfClass.name.toString().toLowerCase().trim()){
                        optionalSubjectOfResult.passedMarks=optionalSubjectOfClass.passedMarks
                    }
                }
            }
            
            let updatedResult = await Result.findOneAndUpdate({_id:result._id},result,{new:true})
            if(!updatedResult){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }
            console.log(updatedResult)
            
        }
        req.flash('success','Successfully Updated Result Passed Marks')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.resultsRankController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { option } = req.query
     
        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            return res.redirect('back')
        }

        let results = await Result.find({classid:hasClass._id})

        if(!results){
            req.flash('fail','Please At First Create To Result')
            return res.redirect('back')
        }

      
        if(!option){
            req.flash('fail','Please Select Examination')
            return res.redirect('back')
        }
        
       

        let allPassedResults = resultDiviededHandler('passedresults',results)

        console.log(allPassedResults)
        console.log(allPassedResults.length)
        
        allPassedResults.sort((a,b)=>{
            if(a.gradePoint===b.gradePoint){
                return Number(b.totalSubjectObtainedNumber)-Number(a.totalSubjectObtainedNumber)
            }else{
                return Number(b.gradePoint)-Number(a.gradePoint)
            }
        })
        let rankOfResult = 0;
        for(result of allPassedResults){
            if(result.examination.toString()===option.toString()){
                if(result.passedOrFailed){
                    rankOfResult++
                    let updatedRankOfResult = await Result.findOneAndUpdate({_id:result._id},{
                        rank:rankOfResult
                    },{new:true})
                    if(!updatedRankOfResult){
                        req.flash('fail','Internal Server Error')
                        return res.redirect('back')
                    }
                }
            }
        }
        req.flash('success','Successfully Added Rank On Result')
        res.redirect('back')
            console.log(allPassedResults)
        
        
        // totalSubjectObtainedNumber
    }catch(e){
        next(e)
    }
}

exports.allPassedResultsGetController = async(req,res,next)=>{
    try{    
        let { id } = req.params

        let { option,roll } = req.query 
        console.log(req.query)

        let hasClass = await Class.findOne({_id:id})

        if(!hasClass){
            return res.redirect('back')
        }

        let results = await Result.find({classid:hasClass._id})

        if(!results){
            req.flash('fail','Please At First Create To Result')
            return res.redirect('back')
        }
        
        // Bind Student With His Result
        for(let result of results){
            let student = await Student.findOne({_id:result.student})
            let classes = await Class.findOne({_id:result.classid})
            result.studentInfo = student 
            result.classes = classes
            
        }

        let allPassedResults = resultDiviededHandler('passedresults',results)

        let allExamBasedPassedResults = []

        if(!roll){
            if(option){
                for(let passedresults of allPassedResults){
                    if( passedresults.examination.toString()===option.toString()){
                     allExamBasedPassedResults.push(passedresults)
                    }
                 }
            }
        }else{
            if(option){
                for(let passedresults of allPassedResults){
                    if( passedresults.examination.toString()===option.toString()&&passedresults.studentInfo.roll.toString()===roll.toString()){
                     allExamBasedPassedResults.push(passedresults)
                    }
                 }
            }
        }

        allExamBasedPassedResults.forEach(async(result,ind)=>{
            let findExamination = await Examination.findOne({_id:result.examination})
            result.exam = findExamination

        })
        console.log(allExamBasedPassedResults)

        let searchValue = {
            option,
            roll
        }
        // console.log(hasClass)
        renderPageHandler(req,res,'passedResult',null,null,hasClass,null,null,null,null,null,allExamBasedPassedResults,null,searchValue)

    }catch(e){
        next(e)
    }
}

exports.allFailedResultsGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { option,roll } = req.query 
        console.log(req.query)

        let hasClass = await Class.findOne({_id:id})

        if(!hasClass){
            return res.redirect('back')
        }

        let results = await Result.find({classid:hasClass._id})

        if(!results){
            req.flash('fail','Please At First Create To Result')
            return res.redirect('back')
        }
        
        // Bind Student With His Result
        for(let result of results){
            let student = await Student.findOne({_id:result.student})
            result.studentInfo = student 
            
        }
    
        let allFailedResults = resultDiviededHandler('failedresults',results)

        let allExamBasedFailedResults = []

        if(!roll){
            if(option){
                for(let failedResults of allFailedResults){
                    if( failedResults.examination.toString()===option.toString()){
                     allExamBasedFailedResults.push(failedResults)
                    }
                 }
            }
        }else{
            if(option){
                for(let failedResults of allFailedResults){
                    if( failedResults.examination.toString()===option.toString()&&failedResults.studentInfo.roll.toString()===roll.toString()){
                     allExamBasedFailedResults.push(failedResults)
                    }
                 }
            }
        }

        allExamBasedFailedResults.forEach(async(result,ind)=>{
            let findExamination = await Examination.findOne({_id:result.examination})
            result.exam = findExamination

        })
        console.log(allExamBasedFailedResults)

        let searchValue = {
            option,
            roll
        }
        renderPageHandler(req,res,'failedResults',null,null,hasClass,null,null,null,null,null,allExamBasedFailedResults,null,searchValue)

    }catch(e){
        next(e)
    }
}

exports.resultsSubmitToAdminGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { option } = req.query

        let hasClass = await Class.findOne({_id:id})
        if(!hasClass){
            return res.redirect('back')
        }
        let user = req.user

        let results = await Result.find({classid:id,examination:option})
        
        let exam = await Examination.findOne({_id:option})

        let hasRequest = await Request.find()
        
        for(let hasReq of hasRequest){
            if(hasClass.classGroup){
                if(hasReq.username===user.name&&hasReq.classname===hasClass.name&&hasReq.classSection===hasClass.section&&hasReq.examination.toString()===option.toString()&&hasReq.examTitle===exam.title&&hasReq.classes.toString()===hasClass._id.toString()&&hasReq.classGroup===hasClass.group){
                    req.flash('fail','Already Submited The Request')
                    return res.redirect('back')
                }
            }
            if(hasReq.username===user.name&&hasReq.classname===hasClass.name&&hasReq.classSection===hasClass.section&&hasReq.examination.toString()===option.toString()&&hasReq.examTitle===exam.title&&hasReq.classes.toString()===hasClass._id.toString()){
                req.flash('fail','Already Submited The Request')
                return res.redirect('back')
            }
            
        }
          
        let createSubmitReq = new Request({
            username:user.name,
            classname:hasClass.name,
            classSection:hasClass.section,
            classGroup:hasClass.group,
            status:'Pending',
            user:user._id,
            examination:option,
            
            examTitle:exam.title,
            classes:hasClass._id
        })

        let createdSubmitReq = await createSubmitReq.save()
        
        if(!createdSubmitReq){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        for(let result of results){
            let updatedRequest = await Request.findOneAndUpdate({_id:createdSubmitReq._id},{
                $push:{
                    results:result._id
                }
            },{new:true})

            if(!updatedRequest){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }
            let requestIdSetInresult = await Result.findOneAndUpdate({_id:result._id},{
                request:createdSubmitReq._id,
                submited:true
            },{new:true})

            if(!requestIdSetInresult){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }

        }

        console.log(createdSubmitReq)
        
        req.flash('success','Successfully Submited Results')
        res.redirect('back')
        console.log('Done')

    }catch(e){
        next(e)
    }
}

exports.resultsPublishedStatusGetController = async(req,res,next)=>{
    try{
        let user = req.user

        let classes = await Class.find({user:req.user._id})

        let getAllSubmitedRequest = await Request.find({user:user._id})
        

        res.render('pages/user/publishedResult',{
            title:'Submited Status',
            flashMessage:req.flash(),
            getAllSubmitedRequest,
            user,
            classes
        })
        // console.log(getAllRequest)
    }catch(e){
        next(e)
    }
}

exports.resultSPublishedRequestDelete = async(req,res,next)=>{
    try{
        let { id } = req.params
        
        let hasSubmit = await Request.findOne({_id:id})

        if(hasSubmit.status.toLowerCase()==='pending'||hasSubmit.status.toLowerCase()==='rejected'){
       
            let deletedSubmitReq = await Request.findOneAndDelete({_id:id})

            if(!deletedSubmitReq){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }
            
            let results = await Result.find({request:id})
            
            for(let result of results){
                let updatedResult = await Result.findOneAndUpdate({_id:result._id},{
                    request:null,
                    submited:false
                },{new:true})

                if(!updatedResult){
                    req.flash('fail','Internal Server Error')
                    return res.redirect('back')
                }
            }

        }
        req.flash('success','Successfully Deleted Request')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}