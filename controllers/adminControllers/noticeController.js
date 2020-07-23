const fs = require('fs')

const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const Category = require('../../models/Category')
const Notice = require('../../models/Notice')

async function renderPageHandler(req,res,pagename,msgOpt,msg,modelOfWeb,categoryItem,items){
    try{    
        let pages = await Page.find()
        let webModel = await WebModel.findOne()
        let category =await Category.find()
        
        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/administrator/${pagename}`, {
                title: 'Notice',
                style: 'bg-light',
                error: {},
                data: req.admin,
                pages,
                createdPage:{},
                flashMessage: req.flash(),
                webModel:modelOfWeb?modelOfWeb:webModel,
                category,
                categoryItem,
                items
        })
    }catch(e){
        console.log(e)
    }
}
function removeFilePath(path,next){
    fs.unlink(`public/uploads/${path}`,error=>{
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
exports.newsPageGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'news')
    }catch(e){
        next(e)
    }
}
exports.latestNewsCreateAndUpdatePostController = async(req,res,next)=>{
    try{
        let { title,text,date } = req.body
        if(title.length===0||text.length===0||date.length===0){
            return renderPageHandler(req,res,'news','fail','Cannot Be Empty Field')
        }
        let webModel = await WebModel.findOne()
        let hasNews = false;
         if(webModel.latestNews.title) hasNews = true

            let publishedLatestNews = await WebModel.findOneAndUpdate({_id:webModel._id},{
                latestNews:{
                    title,
                    text,
                    date
                }
            },{
                new:true
            })
            if(!publishedLatestNews){
                return renderPageHandler(req,res,'news','fail','Internal Server Error')
            }
        renderPageHandler(req,res,'news','success',`${hasNews?'Updated':'Published'} Latest News`)
    }catch(e){
        next(e)
    }
}
exports.latestNewsDeleteGetController = async(req,res,next)=>{
    try{
            let webModel = await WebModel.findOne()
            
            let hasNews = false
            if(webModel.latestNews.title) hasNews = true
            if(!hasNews) return res.redirect('/administrator/news')

            let clearLatestNews = await WebModel.findOneAndUpdate({_id:webModel._id},{
                latestNews:{}
            },{
                new:true
            })
            if(!clearLatestNews){
                return renderPageHandler(req,res,'news','fail','Internal Server Error')
            }
            renderPageHandler(req,res,'news','success',`Clear Latest News`)
    }catch(e){
        next(e)
    }
}
exports.breakingNewsPostController = async(req,res,next)=>{
    try{
        let { title,url } = req.body
        if(title.length===0){
            return renderPageHandler(req,res,'news','fail','Cannot Be Empty Field')
        }
            let webModel = await WebModel.findOne()


            let publishedBreakingNews = await WebModel.findOneAndUpdate({_id:webModel._id},{
                $push:{
                    breakingNews:{
                        title,
                        url:url?url:''
                    }
                }
            },{
                new:true
            })
            if(!publishedBreakingNews){
                return renderPageHandler(req,res,'news','fail','Internal Server Error')
            }
        renderPageHandler(req,res,'news','success',`Published Breaking News`,publishedBreakingNews)
    }catch(e){
        next(e)
    }
}
exports.breakingNewsDeleteGetController = async(req,res,next)=>{
    try{
        let webModel = await WebModel.findOne()
        let { id } = req.params

        let breakingNews;
        webModel.breakingNews.forEach((news,ind)=>{
            if(ind.toString()===id.toString()){
                breakingNews = news
            }
        })
        
        let deletedBreakingNews = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $pull:{
                breakingNews:{
                    _id:breakingNews._id
                }
            }
        },{new:true})
       
        if(!deletedBreakingNews){
            return renderPageHandler(req,res,'news','fail','Internal Server Error')
        }
        res.redirect('/administrator/news')
    }catch(e){
        next(e)
    }
}
exports.breakingNewsUpdatePostController = async(req,res,next)=>{
    try{    
        let { id } = req.params
        let { title,url } = req.body
        if(title.length===0){
            return renderPageHandler(req,res,'news','fail','Cannot Be Empty Field')
        }
        let webModel = await WebModel.findOne()

        webModel.breakingNews.forEach((news,ind)=>{
            if(ind.toString()===id.toString()){
                news.title = title
                news.url = url?url:''
            }
        })
        let updatedBreakingNews = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})

        if(!updatedBreakingNews){
            return renderPageHandler(req,res,'news','fail','Internal Server Error')
        }
         renderPageHandler(req,res,'news','success','Successfully Updated Breaking News',updatedBreakingNews)
    }catch(e){
        next(e)
    }
}
exports.noticeGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'notice')
    }catch(e){
        next(e)
    }
}
exports.noticePostController = async(req,res,next)=>{
    try{
        let { title,text,date,action } = req.body
        if(!req.file){
            if(title.length===0||text.length===0||date.length===0||action.length===0){
                return renderPageHandler(req,res,'notice','fail','Cannot Be Empty Field')  
            }
        }
        if(req.file){
            if(title.length>=1||text.length>=1||action.length>=1){
                if(title.length===0||text.length===0||date.length===0||action.length===0){
                    removeFilePath(req.file.filename,next)
                    return renderPageHandler(req,res,'notice','fail','1 test Cannot Be Empty Field')
                }
            }else{
                if(date.length===0){
                    removeFilePath(req.file.filename,next)
                    return renderPageHandler(req,res,'notice','fail','Please Select Date')

                }
            }
        }
        let webModel = await WebModel.findOne()

        let publishedNotice = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $push:{
                notice:{
                    title,
                    text,
                    date:makeDateHandler(date),
                    numberDate:date,
                    image:req.file?req.file.filename:'',
                    action
                }
            }
        },{new:true})
        console.log(publishedNotice)
        if(!publishedNotice){
            removeFilePath(req.file.filename,next)
            return renderPageHandler(req,res,'notice','fail','Internal Server Error')
        }
        renderPageHandler(req,res,'notice','success','Successfully Published Notice')

    }catch(e){
        next(e)
    }
}
exports.noticeDeleteGetController = async(req,res,next)=>{
    try{
        let webModel = await WebModel.findOne()
        let { id } = req.params

        let notice;
        webModel.notice.forEach((n,ind)=>{
            if(ind.toString()===id.toString()){
                notice = n
            }
        })
        
        let deletedNotice = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $pull:{
                notice:{
                    _id:notice._id
                }
            }
        },{new:true})
       
        if(!deletedNotice){
            return renderPageHandler(req,res,'notice','fail','Internal Server Error')
        }
        if(notice.image.length!==0){
            removeFilePath(notice.image,error=>{
                if(error){
                    return next(error)
                }
                res.redirect('/administrator/notice')
            })
        }
        res.redirect('/administrator/notice')
    }catch(e){

    }
}
exports.noticeUpdatePostController = async(req,res,next)=>{
    try{    
        let { title,text,date,action } = req.body
        let { id } = req.params
       
        let webModel = await WebModel.findOne()

        if(!req.file){
            let hasImg = false
            webModel.notice.forEach((n,ind)=>{
                if(ind.toString()===id.toString()){
                    hasImg = n.image?true:false
                }
            })
            if(title.length===0||text.length===0||date.length===0||action.length===0){
                let msg = hasImg?'Already Exist Image':'Cannot Be Empty Field'
                return renderPageHandler(req,res,'notice','fail',msg)  
            }
        }
        if(req.file){
            if(title.length>=1||text.length>=1||action.length>=1){
                if(title.length===0||text.length===0||date.length===0||action.length===0){
                    removeFilePath(req.file.filename,next)
                    return renderPageHandler(req,res,'notice','fail','1 test Cannot Be Empty Field')
                }
            }else{
                if(date.length===0){
                    removeFilePath(req.file.filename,next)
                    return renderPageHandler(req,res,'notice','fail','Please Select Date')

                }
            }
        }
        

        let imgPath;

        webModel.notice.forEach((n,ind)=>{
            if(ind.toString()===id.toString()){
                imgPath = n.image
                n.title = title
                n.text = text 
                n.date = makeDateHandler(date)
                n.numberDate = date
                n.image = req.file?req.file.filename:imgPath?imgPath:''
                n.action = action                
            }
        })
        console.log(imgPath)
        console.log('Not Found')
        let updatedNotice = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})

        if(!updatedNotice){
                removeFilePath(req.file.filename,next)
            return renderPageHandler(req,res,'notice','fail','Internal Server Error')
        }
        if(req.file){
            if(imgPath){
                removeFilePath(imgPath,next)
            }
        }
        renderPageHandler(req,res,'notice','success','Successfully Updated Notice')
    }catch(e){
        next(e)
    }
}


// Category Controllers 
exports.createCategoryGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'category.ejs')
    }catch(e){
        next(e)
    }
}

exports.createCategoryPostController = async(req,res,next)=>{
    try{
        let { name } = req.body
        
      
        if(!name){
            req.flash('fail',`Please provied category name.`)
            return res.redirect('back')
        }
        let category = await Category.findOne({name})
        console.log(category)
        if(category){
            req.flash('fail',`This category already created by the name of ( ${name} )`)
            return res.redirect('back')
        }
        let createCategory = new Category({name})
        let createdCategory = await createCategory.save()
        if(!createdCategory){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }

        req.flash('success',`Successfully created category by the name of ( ${name} )`)
        res.redirect('back')
        console.log(createdCategory)
    }catch(e){
        next(e)
    }
}

exports.updateCategoryPostController = async(req,res,next)=>{
    try{ 
        let { id } = req.params
        let { name } = req.body 

        if(!name){
            req.flash('fail',`Please provied category name.`)
            return res.redirect('back')
        }
        let getAllCategory = await Category.find()

        let hasCategory = false 
        for(let c of getAllCategory){
            if(c._id.toString()!==id.toString()){
                if(c.name.toString().toLowerCase()===name.toString().toLowerCase()){
                    hasCategory = true 
                }
            }
        }
        if(hasCategory){
            req.flash('fail',`This category already created by the name of ( ${name} )`)
            return res.redirect('back')
        }
       let updatedCategory = await Category.findOneAndUpdate({_id:id},{name},{new:true})
       if(!updatedCategory){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
       }
       req.flash('success','Successfully updated category name')
       res.redirect('back')
    }catch(e){
        next(e)
    }
}

exports.deleteCategoryGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        
        let notice = await Notice.find({category:id})
        
        let deletedCategory = await Category.findOneAndDelete({_id:id})

        if(!deletedCategory){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        if(notice.length!==0){
            for(let n of notice){
                let deletedNoticeFromCategory = await Notice.findOneAndDelete({_id:n._id})
                if(!deletedNoticeFromCategory){
                    req.flash('fail','Internal Server Error')
                    return res.redirect('back')
                }
                if(deletedNoticeFromCategory.file){
                    fs.unlink(`public/${deletedNoticeFromCategory.file}`,error=>{
                        if(error){
                            return next(error)
                        }
                    })
                }
            }
        }
        req.flash('success',`Successfully deleted category and also deleted all notice of ( ${deletedCategory.name} ) category`)
        res.redirect('back')
    }catch(e){
        next(e)
    }
}

// Notice Controllers
exports.categoryItemGetController = async(req,res,next)=>{
    try{
        let { id } = req.params 
        let category = await Category.findOne({_id:id})
        if(!category){
            return res.redirect('back')
        }
        let items = await Notice.find({category:id})
        renderPageHandler(req,res,'itemOfCategory.ejs',null,null,null,category,items)
    }catch(e){
        next(e)
    }
}

exports.createNoticePostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { title,text,date } = req.body
        let file = req.file 
        console.log(req.body)
        console.log(req.params)
        console.log(req.file)        
        
        if(title.length===0||text.length===0||date.length===0){
            if(file){
                fs.unlink(`public/uploads/${file.filename}`,error=>{
                    if(error){
                        return next(error)
                    }
                })
            }
            req.flash('fail','Please Provied Minimum Required Fields')
            return res.redirect('back')
        }

        
        let counterDoc = await Notice.countDocuments()
        let lastItem = await Notice.find()
        lastItem = lastItem[counterDoc-1]

        let createNotice = new Notice({
            title,
            text,
            date,
            file:file?`/uploads/${file.filename}`:'',
            category:id,
            status:false,
            id:lastItem?Number(lastItem.id)+1:1
        })

        let createdNotice = await createNotice.save()

        if(!createdNotice){
            if(file){
                fs.unlink(`public/uploads/${file.filename}`,error=>{
                    if(error){
                        return next(error)
                    }
                })
            }
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }

        // await Notice.findOneAndUpdate({_id:createdNotice._id},{$inc:{id:1}},{new:true})

        req.flash('success','Successfully created notice')
        res.redirect('back')
        console.log(createdNotice)   
    }catch(e){
        next(e)
    }
}
exports.noticeStatusGetController = async(req,res,next)=>{
    try{
        let { id } = req.params 
        let { status } = req.query 

        let hasNotice = await Notice.findOne({_id:id})
        if(!hasNotice){
            req.flash('fail','Cannot find notice')
            return res.redirect('back')
        }
        let msg;

        if(status.toLowerCase()==='active'){
            let notice = await Notice.findOneAndUpdate({_id:id},{status:true},{new:true})
            if(!notice){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }
            msg = 'Successfully Activited Notice'
        }
        
        if(status.toLowerCase()==='inactive'){
            let notice = await Notice.findOneAndUpdate({_id:id},{status:false},{new:true})
            if(!notice){
                req.flash('fail','Internal Server Error')
                return res.redirect('back')
            }
            msg = 'Successfully Inactivied Notice'
        }

        req.flash('success',msg)
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.updateNoticePostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { title,text,date } = req.body
        let file = req.file
        if(title.length===0||text.length===0||date.length===0){
            if(file){
                fs.unlink(`public/${deletedNoticeOfOneCategory.file}`,error=>{
                    if(error){
                        return next(error)
                    }
                })
            }
            req.flash('fail','Please Provied Minimum Required Fields')
            return res.redirect('back')
        }

        let hasNotice = await Notice.findOne({_id:id})


        let updatedNotice = await Notice.findOneAndUpdate({_id:id},{
            title,
            text,
            date,
            file:file?`/uploads/${file.filename}`:hasNotice.file 
        },{new:true})

        
        if(!updatedNotice){
            if(file){
                fs.unlink(`public/uploads/${file.filename}`,error=>{
                    if(error){
                        return next(error)
                    }
                })
            }
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }

        if(file){
            if(hasNotice.file){
                fs.unlink(`public/${hasNotice.file}`,error=>{
                    if(error){
                        return next(error)
                    }
                })
            }
            
        }
        req.flash('success','Successfully updated notice')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.deleteNoticeGetController = async(req,res,next)=>{
    try{
        let { id } = req.params

        let deletedNotice = await Notice.findOneAndDelete({_id:id})
        if(!deletedNotice){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        if(deletedNotice.file){
            fs.unlink(`public/${deletedNotice.file}`,error=>{
                if(error){
                    return next(error)
                }
            })
        }
        req.flash('success','Successfully Deleted Notice')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}