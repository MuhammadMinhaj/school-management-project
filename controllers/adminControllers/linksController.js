const WebModel = require('../../models/WebModel')
const Page = require('../../models/Page')
const fs = require('fs')

async function renderPageHandler(req,res,pagename,msgOpt,msg,modelOfWeb){
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
                department:null
        })
    }catch(e){
        console.log(e)
    }
}
function removeDocumentPath(path,next){
    fs.unlink(`public/uploads/documents/${path}`,error=>{
        if(error){
            return next(error)
        }
    })
}
function makeDateHandler(d){
    let splitDate = d.slice(8)
    let splitMonth = d.slice(6).slice(0,1)
    let splitYear = d.slice(0,4)
    let month;
    switch(parseInt(splitMonth)){
        case 1 :
            month = 'January'
            break;
        case 2 :
            month = 'February'
            break;
        case 3 :
            month = 'March' 
            break;
        case 4 :
            month = 'April'
            break;
        case 5 :
            month = 'May'
            break;
        case 6 :
            month = 'June'
            break;
        case 7 :
            month = 'July'
            break;
        case 8 :
            month = 'August'
            break 
        case 9 : 
            month = 'September'
            break;
        case 10 :
            month = 'October'
            break;
        case 11 :
            month = 'November'
            break;
        case 12:
            month = 'December'
    }
    let correctDate = {
        date:splitDate,
        month,
        year:splitYear
    }
    return correctDate
}
exports.linksGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'links')
    }catch(e){
        next(e)
    }
}
exports.createReferenceLinksPostController = async(req,res,next)=>{
    try{
        let { name,url } = req.body

        let error;
        name.length===0?error='Please Provied Name':''
        url.length===0?error='Please Provied URL':''
        if(error)return renderPageHandler(req,res,'links','fail',error)
         
        let webModel = await WebModel.findOne()

        let createdRefernceLinks = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $push:{
                referenceLinks:{
                    name,
                    url
                }
            }         
        },{new:true})

        if(!createdRefernceLinks){
            return renderPageHandler(req,res,'links','fail','Internal Server Error')
        }
        renderPageHandler(req,res,'links','success','Successfully Added Reference Link',createdRefernceLinks)
    }catch(e){
        next(e)
    }
}
exports.referenceLinksUpdatePostController = async(req,res,next)=>{
    try{
        let { name,url } = req.body
        let { id } = req.params
        let error;
        name.length===0?error='Please Provied Name':''
        url.length===0?error='Please Provied URL':''
        if(error)return renderPageHandler(req,res,'links','fail',error)
         
        let webModel = await WebModel.findOne()

        webModel.referenceLinks.forEach((link,ind)=>{
            if(link._id.toString()===id.toString()){
                link.name = name 
                link.url = url 
            }
        })
        let updatedRefernceLinks = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})

        if(!updatedRefernceLinks){
            return renderPageHandler(req,res,'links','fail','Internal Server Error')
        }
        renderPageHandler(req,res,'links','success','Successfully Updated Reference Link',updatedRefernceLinks)
    }catch(e){
        next(e)
    }
}
exports.referenceLinksDeleteGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let webModel = await WebModel.findOne()

        let deletedReferenceLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $pull:{
                referenceLinks:{
                    _id:id
                }
            }
        },{new:true})

        if(!deletedReferenceLink){
            return renderPageHandler(req,res,'links','fail','Internal Server Error')
        }
        res.redirect('/administrator/links')
    }catch(e){
        next(e)
    }
}
exports.uploadsDocumentLinksPostController = async(req,res,next)=>{
    try{
        let { name,option } = req.body 
        let file = req.file 
   
       
        if(name.length===0||option.length===0){
            if(!file){
                return renderPageHandler(req,res,'links','fail','Please Include Document')
            }else{
                removeDocumentPath(file.filename,next)
                return renderPageHandler(req,res,'links','fail','Please Provied Name')
            }
        }
        if(!file){
            return renderPageHandler(req,res,'links','fail','Please Include Document')
        }
        
  
        let webModel = await WebModel.findOne()

        let includedDocuments = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $push:{
                documentsLinks:{
                    name,
                    option,
                    document:file.filename
                }
            }
        },{
            new:true
        })

        if(!includedDocuments){
            removeDocumentPath(file.filename,next)
            return renderPageHandler(req,res,'links','fail','Internal Server Error')
        }
        renderPageHandler(req,res,'links','success','Successfully Included Document')

    }catch(e){
        next(e)
    }
}
exports.documentLinksUpdatePostController = async(req,res,next)=>{
    try{
        let { name,option } = req.body 
        let file = req.file 
        let { id } = req.params
        if(name.length===0||option.length===0){
                if(file){
                    removeDocumentPath(file.filename,next)
                }
                return renderPageHandler(req,res,'links','fail','Please Provied Name')
        }

  
        let webModel = await WebModel.findOne()

        let foundedDocument;
        let previousDocumentPath;
        webModel.documentsLinks.forEach(document=>{
            if(document._id.toString()===id.toString()){
                foundedDocument = document
                previousDocumentPath = document.document
            }
        })
        if(!foundedDocument){
            removeDocumentPath(file.filename,next)
            return res.redirect('/administrator/links')
        }
        foundedDocument.name = name 
        foundedDocument.option = option 
        foundedDocument.document = file?file.filename:previousDocumentPath

        let updatedDocument = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
        if(!updatedDocument){
            removeDocumentPath(file.filename,next)
            return renderPageHandler(req,res,'links','fail','Internal Server Error')
        }

        if(file){
            removeDocumentPath(previousDocumentPath,next) 
        }
        renderPageHandler(req,res,'links','success','Successfully Updated Document')

    }catch(e){
        next(e)
    }
}
exports.documentsLinksDeleteGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let webModel = await WebModel.findOne()

        let willDeletedDocPath;
        webModel.documentsLinks.forEach(document=>{
            if(document._id.toString()===id.toString()){
                willDeletedDocPath = document.document
            }
        })

        let deletedReferenceLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $pull:{
                documentsLinks:{
                    _id:id
                }
            }
        },{new:true})

        if(!deletedReferenceLink){
            return renderPageHandler(req,res,'links','fail','Internal Server Error')
        }
        removeDocumentPath(willDeletedDocPath,next)
        res.redirect('/administrator/links')
    }catch(e){
        next(e)
    }
}
