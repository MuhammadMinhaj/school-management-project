const WebModel = require('../../models/WebModel')
const Page = require('../../models/Page')
const Request = require('../../models/Request')
const Result = require('../../models/Result')
const Student = require('../../models/Student')
const Examination = require('../../models/Examination')
const ExaminationType = require('../../models/ExaminationType')
const Class = require('../../models/Class')



async function renderPageHandler(req,res,pagename,msgOpt,msg,modelOfWeb,requestModel,results,examinationType){
    try{    
        let pages = await Page.find()
        let webModel = await WebModel.findOne()
        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/administrator/${pagename}`, {
                title: 'Links',
                style: 'bg-light',
                error: {},
                data: req.admin,
                pages,
                createdPage:{},
                flashMessage: req.flash(),
                webModel:modelOfWeb?modelOfWeb:webModel,
                department:null,
                requestModel:requestModel?requestModel:{},
                results:results?results:{},
                examinationType:examinationType?examinationType:{}
        })
    }catch(e){
        console.log(e)
    }
}

exports.createResultsExaminationTypeGetController = async(req,res,next)=>{
    try{
        let examinationType = await ExaminationType.find()
        renderPageHandler(req,res,'examinationType',null,null,null,null,null,examinationType)
    }catch(e){
        next(e)
    }
}
exports.createResultsExaminationTypePostController = async(req,res,next)=>{
    try{
        let { name } = req.body

        if(name.length===0){
            req.flash('fail','Please Provied Examination Name')
            return res.redirect('back')
        }

        let hasExaminationType = await ExaminationType.find()

        if(hasExaminationType){
            if(hasExaminationType.length>0){
                for(let type of hasExaminationType){
                    if(type.name.toString().toLowerCase()===name.toString().toLowerCase()){
                        req.flash('fail','Already Created This Examination Type')
                        return res.redirect('back')
                    }
                }
            }
        }

        let createExaminationType = new ExaminationType({
            name
        })
        let createdExaminationType = createExaminationType.save()
        if(!createdExaminationType){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Created Examination Type')
        return res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.updateResultsExaminationTypePostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { name } = req.body

        if(name.length===0){
            req.flash('fail','Please Provied Examination Name')
            return res.redirect('back')
        }

        let hasExaminationType = await ExaminationType.find()

        for(let type of hasExaminationType){
            if(type.name.toString().toLowerCase()===name.toString().toLowerCase()){
                req.flash('fail','Already Created This Examination Type')
                return res.redirect('back')
            }
        }
            
        let updatedExaminationType = await ExaminationType.findOneAndUpdate({_id:id},{name},{new:true})
        if(!updatedExaminationType){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Created Examination Type')
        return res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.deleteResultsExaminationTypePostController = async(req,res,next)=>{
    try{    
        let { id } = req.params

        let deletedExaminationType = await ExaminationType.findOneAndDelete({_id:id})
        if(!deletedExaminationType){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Deleted Examination Type')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}



exports.resultsManagementGetController = async(req,res,next)=>{
    try{
        let request = await Request.find()
        console.log(request)
        renderPageHandler(req,res,'resultsManagement',null,null,null,request)
    }catch(e){
        next(e)
    }
}

exports.showAllResultsGetController = async(req,res,next)=>{
    try{    
        let { id } = req.params
        
        let request = await Request.findOne({_id:id})


        let results = await Result.find({classid:request.classes,examination:request.examination,request:request._id})

      
        let exam = await Examination.findOne({_id:request.examination})
        let classes = await Class.findOne({_id:request.classes})

        console.log(classes)
        console.log('Test')

        for(let result of results){
            let student = await Student.findOne({_id:result.student})
            result.studentInfo = student
            result.exam = exam
            result.classes = classes
        }
       
       

        renderPageHandler(req,res,'allResults',null,null,null,request,results)
    }catch(e){
        next(e)
    }
}

exports.resultsPublishedReqApproveGetController = async(req,res,next)=>{
    try{

        let { id } = req.params

        let request =await Request.findOne({_id:id})

        if(request.published){
            req.flash('fail','Results Already Published')
            return res.redirect('back')
        }
        let approvedReq = await Request.findOneAndUpdate({_id:id},{
            reject:false,
            approved:true,
            status:'Approved'
        },{new:true})
        if(!approvedReq){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Approved Request')
        res.redirect('back')

    }catch(e){
        next(e)
    }
}

exports.resultsPublishedReqRejectGetController = async(req,res,next)=>{
    try{

        let { id } = req.params

        let request =await Request.findOne({_id:id})

        if(request.published){
            req.flash('fail','Results Already Published')
            return res.redirect('back')
        }
        let approvedReq = await Request.findOneAndUpdate({_id:id},{
            reject:true,
            approved:false,
            status:'Rejected'
        },{new:true})
        if(!approvedReq){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Rejected Request')
        res.redirect('back')

    }catch(e){
        next(e)
    }
}

exports.resultPublishedReqDeleteGetController = async(req,res,next)=>{
    try{
     
        let { id } = req.params

        let request =await Request.findOne({_id:id})

        if(request.published){
            req.flash('fail','Results Already Published')
            return res.redirect('back')
        }
        if(request.approved){
            req.flash('fail','Cannot Delete Approved Request,Please Reject To Delete Request')
            return res.redirect('back')
        }
        let deletedResultPublishedReq = await Request.findOneAndDelete({_id:id})

        if(!deletedResultPublishedReq){
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
        req.flash('success','Successfully Deleted Request')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}

exports.resultsPublishedAndUnPublishedPostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { option } = req.body

        if(!option){
            req.flash('fail','Please Select Option')
            return res.redirect('back')
        }

        let request = await Request.findOne({_id:id})
        
        let { approved,classes,examination,_id } = request

        if(!approved){
            req.flash('fail','Please Approved To Published Results')
            return res.redirect('back')
        }

        let results = await Result.find({classid:classes,examination:examination,request:_id})
        
        for(let result of results){
            let hasResult
            if(option.toLowerCase()==='published'){
                 hasResult = await Result.findOneAndUpdate({_id:result._id},{
                    published:true
                },{new:true})
            }
            if(option.toLowerCase()==='unpublished'){
                hasResult = await Result.findOneAndUpdate({_id:result._id},{
                    published:false
                },{new:true})
            }
            if(!hasResult){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }
        }

        let msg = option==='published'?'Successfully Results Has Been Published On Website':option==='unpublished'?'Successfully  UnPublished Results From Website':'Some Went To Wrong'
        req.flash('success',msg)
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
