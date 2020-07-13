const Result = require('../models/Result')
const Student = require('../models/Student')
const Classed = require('../models/Class')
const Examination = require('../models/Examination')
const WebModel = require('../models/WebModel')


exports.resultsFindApiGetController = async(req,res,next)=>{
    try{
        let { Class,section,group,exam,year,roll,id } = req.query
        
        let error = {}

        Class.length===0?error.Class = 'Please Select Class':null
        exam.toString().length===0?error.exam = 'Please Select Examination Type':null
        year.length===0?error.year = 'Please Select Year':null 
        roll.length===0?error.roll = 'Please Provied Roll':null 
        id.length===0?error.id = 'Please Provied Student Id':null

        if(Number(Class)>3){
            section.length===0?error.section = 'Please Select Section':null
        }
        if(Number(Class)>8){
            group.length===0?error.group = 'Please Select Group':null
        }

        if(Object.keys(error).length>0){
            res.json({errormsg:'Validation Failed',error})
            return false
        }
        
        let hasResult = await Result.findOne({examinationType:exam,session:year,studentInformation:{classed:Class,section,group,roll,id}})
        
        if(!hasResult){
            res.json({errormsg:'Result Is Not Available'})
            return false
        }
        
        if(!hasResult.published){
            res.json({errormsg:'Result Is Not Published Right Now'})
            return false
        }

        let student = await Student.findOne({_id:hasResult.student})
        
        let classes = await Classed.findOne({_id:hasResult.classid})
        
        let examination = await Examination.findOne({_id:hasResult.examination})
        
        let webModel = await WebModel.findOne()

        let getUniversityName;

        for(let name of webModel.name){
            if(name.lang.toLowerCase()==='english'){
                getUniversityName = name
            }
        }

        let result = {
            ...hasResult._doc,
            university:getUniversityName,
            logo:webModel.logo,
            name:student.name,
            classsName:classes.name,
            classSection:classes.section,
            examname:examination.name,
            examtitle:examination.title,
            examyear:examination.year
        }
        // console.log(result)
        res.status(200).json({msg:'Congratulations! Result Founded!',result})
    
        console.log('done')
    }catch(e){
       next(e)
    }
}
