const WebModel = require('../../models/WebModel')
const Admin = require('../../models/Admin')
const Page = require('../../models/Page')
const fs = require('fs')

async function renderPageHandler(req,res,pagename,msgOpt,msg,modelOfWeb,singleDepartment){
    try{    
        let pages = await Page.find()
        let webModel = await WebModel.findOne()
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
                department:singleDepartment?singleDepartment:null
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

exports.departmentCreateGetController = async(req,res,next)=>{
    try{
        let webModel = await WebModel.findOne()
        renderPageHandler(req,res,'department',null,null,webModel)
    }catch(e){
        next(e)
    }
}
exports.departmentCreatePostController = async(req,res,next)=>{
    try{
        let { name,title,text,url,date } = req.body
        let file = req.file
        let webModel = await WebModel.findOne()
        if(!file){
            if(name.length===0||title.length===0||text.length===0||date.length===0||url.length===0){
                return renderPageHandler(req,res,'department','fail','Cannot Be Empty Field',webModel)  
            }
        }
        if(file){
            if(text.length>=1){
                if(name.length===0||title.length===0||text.length===0||date.length===0||url.length===0){
                    removeFilePath(file.filename,next)
                    return renderPageHandler(req,res,'department','fail','1 test Cannot Be Empty Field',webModel)
                }
            }else{
                if(name.length===0||url.length===0||date.length===0){
                    removeFilePath(file.filename,next)
                    return renderPageHandler(req,res,'department','fail','Please Select Date',webModel)

                }
            }
        }
        
        let createdDepartmentInfo = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $push:{
                departments:{
                    name,
                    url,
                    title,
                    text,
                    date:makeDateHandler(date),
                    numberDate:date,
                    image:file?file.filename:'',
            
                }
            }
        },{new:true})
        console.log(createdDepartmentInfo)
        if(!createdDepartmentInfo){
            if(file){
                removeFilePath(file.filename,next)
            }
            return renderPageHandler(req,res,'department','fail','Internal Server Error',webModel)
        }
        renderPageHandler(req,res,'department','success','Successfully Created Department Info',createdDepartmentInfo)
    }catch(e){
        next(e)
    }
}

exports.departmentUpdateGetController = async(req,res,next)=>{
    try{
        let webModel = await WebModel.findOne()
        let hasDepartmentInfo  = false
        let singleDepartmentInfo;

        webModel.departments.forEach((department,ind)=>{
            if(department._id.toString()===req.params.id.toString()){
                hasDepartmentInfo = true
                singleDepartmentInfo = department
                return false
            }
        })

        if(!hasDepartmentInfo){
            return res.redirect('/administrator/department')
        }

        renderPageHandler(req,res,'departmentUpdate',null,null,null,singleDepartmentInfo)

    }catch(e){
        next(e)
    }
}

exports.departmentUpdatePostController = async(req,res,next)=>{
    try{
       
        let { name,title,text,url,date } = req.body
        let file = req.file
        let { id } = req.params
        let webModel = await WebModel.findOne()

        // Protected Department
        let hasDepartment = false
        let foundedDepartment;
        let hasImage;
        webModel.departments.forEach(department=>{
            if(department._id.toString()===id.toString()){
                hasDepartment = true 
                foundedDepartment = department
                hasImage = department.image
                return false;
            }
        })

        if(!hasDepartment){
            if(file){
                removeFilePath(file.filename,next)
            }
            return res.redirect('/administrator/department')
        }

        if(!file){
            if(name.length===0||title.length===0||text.length===0||date.length===0||url.length===0){
                
                return renderPageHandler(req,res,'departmentUpdate','fail','Cannot Be Empty Field',webModel,foundedDepartment)  
            }
        }
        if(file){
            if(text.length>=1){
                if(name.length===0||title.length===0||text.length===0||date.length===0||url.length===0){
                    removeFilePath(file.filename,next)
                    return renderPageHandler(req,res,'departmentUpdate','fail','1 test Cannot Be Empty Field',webModel,foundedDepartment)
                }
            }else{
                if(date.length===0||name.length===0||url.length===0){
                    removeFilePath(file.filename,next)
                    return renderPageHandler(req,res,'departmentUpdate','fail','Please Select Date',webModel,foundedDepartment)

                }
            }
        }
        
        foundedDepartment.name = name 
        foundedDepartment.url = url 
        foundedDepartment.title = title 
        foundedDepartment.text = text?text:'' 
        foundedDepartment.date = makeDateHandler(date);
        foundedDepartment.numberDate = date 
        foundedDepartment.image = file?file.filename:''

        let updatedDepartment = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})

         console.log(updatedDepartment)

        if(!updatedDepartment){
            if(file){
                removeFilePath(file.filename,next)
            }
            return renderPageHandler(req,res,'departmentUpdate','fail','Internal Server Error',webModel,foundedDepartment)
        }

        if(hasImage){
            removeFilePath(hasImage,next)
        }
        renderPageHandler(req,res,'departmentUpdate','success','Successfully Updated Department Info',updatedDepartment,foundedDepartment)
    }catch(e){
        next(e)
    }
}

exports.departmnetDeleteGetController = async(req,res,next)=>{
    try{
        let { id } = req.params
        let webModel = await WebModel.findOne()

        let hasDepartment = false
        let singleDepartment;
        webModel.departments.forEach(department=>{
            if(department._id.toString()===id.toString()){
                hasDepartment = true
                singleDepartment = department
                return false
            }
        })
        if(!hasDepartment){
            return res.redirect('/administrator/department')
        }

        let deletedDepartment = await WebModel.findOneAndUpdate({_id:webModel._id},{
            $pull:{
                departments:{
                    _id:id    
                }
            }
        },{new:true})
        
        if(!deletedDepartment){
            return renderPageHandler(req,res,'departmentUpdate','fail','Internal Server Error',webModel,singleDepartment)
        }
        if(singleDepartment.image){
            removeFilePath(singleDepartment.image,next)
        }
        res.redirect('/administrator/department')
    }catch(e){
        next(e)
    }
}