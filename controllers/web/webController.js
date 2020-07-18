const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const ExaminationType = require('../../models/ExaminationType')
const Teacher = require('../../models/Teacher')
const Page = require('../../models/Page')


async function renderPageHandler(req,res,pagename,title,page){
    let menu  = await Menu.find()
    let webModel = await WebModel.findOne()
    let examinationType = await ExaminationType.find()
    let teachers = await Teacher.find()
    res.render(`pages/${pagename}`,{
        title,
        menu,
        webModel,
        examinationType:examinationType?examinationType:[],
        group:teachers?teachers:[],
        page
    })
}
exports.indexPageGetController = async(req,res,next)=>{
    try{
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
