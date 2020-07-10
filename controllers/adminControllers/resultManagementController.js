const WebModel = require('../../models/WebModel')
const Page = require('../../models/Page')
const Request = require('../../models/Request')
const Result = require('../../models/Result')
const Student = require('../../models/Student')
const Examination = require('../../models/Examination')


async function renderPageHandler(req,res,pagename,msgOpt,msg,modelOfWeb,requestModel,results){
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
                results:results?results:{}
        })
    }catch(e){
        console.log(e)
    }
}

exports.resultsManagementGetController = async(req,res,next)=>{
    try{
        let request = await Request.find()
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

        console.log(exam)


        for(let result of results){
            let student = await Student.findOne({_id:result.student})
            result.studentinfo = student
        }
       
        console.log(results)

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

exports.resultsPublishedPostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { option } = req.body

        let request = await Request.findOne({_id:id})
        console.log(request)
        console.log(req.params)
        console.log(req.body)
    }catch(e){
        next(e)
    }
}