const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const ExaminationType = require('../../models/ExaminationType')
const Teacher = require('../../models/Teacher')
const Page = require('../../models/Page')
const Contact = require('../../models/Contact')
const Category = require('../../models/Category')
const Notice = require('../../models/Notice')
const Visitor = require('../../models/Visitor')

const OS = require('os')

async function renderPageHandler(req,res,pagename,title,page,department,searchContent,singleNotice){
    let menu  = await Menu.find()
    let webModel = await WebModel.findOne()
    let examinationType = await ExaminationType.find()
    let teachers = await Teacher.find()
    let category = await Category.find()
    let notice = await Notice.find()

    res.render(`pages/${pagename}`,{
        title,
        menu,
        webModel,
        examinationType:examinationType?examinationType:[],
        group:teachers?teachers:[],
        page,
        department,
        category,
        notice,
        searchContent,
        searchValue:req.query,
        singleNotice
    })
}

function deviceDetector(device){
    let d;
    if(device.isMobile){
        d = 'Mobile Phone'
    }else if(device.isTablet){
        d = 'Tablet'
    }else if(device.isiPad){
        d = 'iPad'
    }else if(device.isiPhone){
        d = 'iPhone'
    }else if(device.isAndroid){
        d = 'Android'
    }else if(device.isDesktop){
        d =  'Desktop'
    }else if(device.isMac){
        d = 'Mac'
    }else if(device.isSmartTV){
        d = 'Smart TV'
    }else{
        d = 'Unkown Device'
    }
    return d
}


exports.indexPageGetController = async(req,res,next)=>{
    try{

        let date = new Date()
        let visitor = new Visitor({
            device:deviceDetector(req.useragent),
            os:req.useragent.os,
            ip:req.ip,
            browser:req.useragent.browser,
            date:date.getDate(),
            month:date.getMonth()+1,
            year:date.getMonth()

        })
        await visitor.save()
        renderPageHandler(req,res,'index.ejs','JAMEA AHMADIA SUNNIA ALIA KAMIL MADRASAH')
    }catch(e){
        next(e)
    }
}
exports.resultsPublicationGetController = async(req,res,next)=>{
    try{
   
        renderPageHandler(req,res,'web/resultsPublication.ejs','Results')
    }catch(e){
        next(e)
    }
}
exports.aboutAdministrationInfoGetController = async (req,res,next)=>{
    try{   
        renderPageHandler(req,res,'web/administration.ejs','About Administration')
    }catch(e){
        next(e)        
    }
}
exports.aboutTeachersInfoGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/teachers','Teachers Info')
    }catch(e){
        next(e)
    }
}
exports.aboutPageGetController = async(req,res,next)=>{
	try{
		renderPageHandler(req,res,'web/aboutPage','About JASA')
	}catch(e){
		next(e)
	}
}
exports.librayPageGetController = (req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/libray','Mission & Vission')
    }catch(e){
        next(e)
    }
}
exports.missionAndVissionPageGetController = (req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/missionAndVission','Mission & Vission')
    }catch(e){
        next(e)
    }
}
exports.contactPageGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/contact','Contact Us')
    }catch(e){
        next(e)
    }
} 
exports.contactPagePostController = async(req,res,next)=>{
    try{
        let { name,email,subject,message } = req.body
        let webModel = await WebModel.findOne()

        if(!webModel.contact.status){
            res.json({error:'Contact Has Been Deactivated!'})
            return false
        }

        if(name.length===0||email.length===0||subject.length===0||message.length===0){
            res.json({error:'Invalid Credentials'})
            return false
        }
       


        let d = new Date()
        let correntMonth = d.getMonth()+1
        
        let contactInfo = new Contact({
            name,
            email,
            subject,
            message,
            date:`${d.getDate()+1}/${correntMonth}/${d.getFullYear()}`
        })
        let sendInfo = await contactInfo.save()

        if(!sendInfo){
            res.json({error:'Internal Server Error'})
            return false
        }
        console.log(sendInfo)
        res.json({message:'We Have Received Your Email,Please Wait For Our Feedback.'})
    }catch(e){
        next(e)
    }

}
exports.dynamicPageRenderGetController = async(req,res,next)=>{
    try{
        let { pagename } = req.params

        let pages = await Page.find()
        
        let hasPage;
        for(let page of pages){
            if(page.menu.toString().toLowerCase()===pagename.toString().toLowerCase()){
                hasPage = page
            }
        }
 
       if(!hasPage){
            res.redirect('back')
            return false
       }

       renderPageHandler(req,res,'web/dynamicPage',pagename.toUpperCase()
       ,hasPage)
    
    }catch(e){
        next(e)
    }
}
exports.departmentPageGetController = async(req,res,next)=>{
    try{
        let { name } = req.params
        

        let webModel = await WebModel.findOne()

        let hasDepartment;
        for(let d of webModel.departments){
            if(d.name.toString().toLowerCase().trim()===name.toString().toLowerCase().trim()){
                hasDepartment = d
            }
        }

        if(!hasDepartment){
            return res.redirect('back')
        }
        renderPageHandler(req,res,'web/department',name.toUpperCase(),null,hasDepartment)
    }catch(e){
        next(e)
    }
}
exports.galleryGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'web/gallery.ejs','Gallery')
    }catch(e){
        next(e)
    }
}

exports.noticeCategoryGetController = async(req,res,next)=>{
    try{    
        let { search } = req.query 
        let searchFor;
        if(search){
            let notice = await Notice.find({ "title": { "$regex": search, "$options": "i" }})
            searchFor = notice 
        }
        console.log(searchFor)
        renderPageHandler(req,res,'web/noticeCategory.ejs','Notice',null,null,searchFor)
    }catch(e){
        next(e)
    }
}

exports.noticeGetController = async(req,res,next)=>{
    try{    
        let { id } = req.params
        let notice = await Notice.findOne({id:id})

        renderPageHandler(req,res,'web/notice.ejs','Notice',null,null,null,notice)
    }catch(e){
        next(e)
    }
}
