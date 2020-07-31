const fs = require('fs')

const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const Category = require('../../models/Category')
const Notice = require('../../models/Notice')

async function renderPageHandler(req,res,pagename,categoryItem,items){
    try{    
        let pages = await Page.find()
        let webModel = await WebModel.findOne()
        let category =await Category.find()
        
    return res.render(`pages/administrator/${pagename}`, {
        title: 'Notice',
        style: 'bg-light',
        error: {},
        data: req.admin,
        pages,
        createdPage:{},
        flashMessage: req.flash(),
        webModel,
        category,
        categoryItem,
        items
    })
    }catch(e){
        console.log(e)
    }
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
exports.newsPageGetController = (req,res,next)=>{
    renderPageHandler(req,res,'news')
}
exports.latestNewsCreateAndUpdatePostController = async(req,res,next)=>{
    try{
        let { title,text,date } = req.body
        if(title.length===0||text.length===0||date.length===0){
            req.flash('fail','Please Provied Full Info')
            return res.redirect('back') 
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
                req.flash('fail','Internal Server Error')
                return res.redirect('back')    
          
            }
            req.flash('success',`${hasNews?'Updated':'Published'} Latest News`)
            res.redirect('back')
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
                req.flash('fail','Internal Server Error')
                return res.redirect('back') 
            }
            req.flash('success',`Clear Latest News`)
            res.redirect('back') 
    }catch(e){
        next(e)
    }
}
exports.breakingNewsPostController = async(req,res,next)=>{
    try{
        let { title,url } = req.body
            if(title.length===0){
                req.flash('fail','Please Provied Title')
                res.redirect('back') 
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
                req.flash('fail','Internal Server Error')
                return res.redirect('back') 
            }
            req.flash('success','Published Breaking News')
            res.redirect('back') 
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
            req.flash('fail','Internal Server Error')
            return res.redirect('back')

        }
        req.flash('success','Successfully Deleted Breaking News')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.breakingNewsUpdatePostController = async(req,res,next)=>{
    try{    
        let { id } = req.params
        let { title,url } = req.body
        if(title.length===0){
            req.flash('fail','Please Provied Title')
            return res.redirect('back')
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
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Updated Breaking News')
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
// Category Controllers 
exports.createCategoryGetController = (req,res,next)=>{
    renderPageHandler(req,res,'category.ejs')
}

exports.createCategoryPostController = async(req,res,next)=>{
    try{
        let { name } = req.body
        if(!name){
            req.flash('fail',`Please provied category name.`)
            return res.redirect('back')
        }
        let category = await Category.findOne({name})
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
        renderPageHandler(req,res,'itemOfCategory.ejs',category,items)
    }catch(e){
        next(e)
    }
}

exports.createNoticePostController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let { title,text,date } = req.body
        let file = req.file       
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
            date:makeDateHandler(date),
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

        req.flash('success','Successfully created notice')
        res.redirect('back') 
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
            date:makeDateHandler(date),
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