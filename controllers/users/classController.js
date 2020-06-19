const Class = require('../../models/Class')
const User = require('../../models/User')


async function renderPageHandler(req,res,pagename,msgOpt,msg){
    try{    
        let classes = await Class.find()
      
        if(msg) req.flash(msgOpt,msg)
        return res.render(`pages/user/${pagename}`, {
                title: 'Notice',
                error: {},
                user:req.user,
                classes,
                flashMessage: req.flash(),

        })
    }catch(e){
        console.log(e)
    }
}



exports.createClassGetController = async(req,res,next)=>{
    try{
        renderPageHandler(req,res,'createClass')
    }catch(e){
        next(e)
    } 
}
exports.createClassPostController = async(req,res,next)=>{
    try{
        let { name,numeric,section,group } = req.body
        

        if(!group||name.length===0||numeric.length===0||section.length===0){
            return renderPageHandler(req,res,'createClass','fail','Invalid Creadentials')
        }

        // Check Unique

        let hasClass;
        let classes = await Class.find()
        if(classes.length!==0){
            classes.forEach(c=>{
                if(c.name===name||c.numeric===numeric){
                    hasClass = ` Class ${name} Already Exist`
                    return false
                }
            })
        }
        if(hasClass){
            return renderPageHandler(req,res,'createClass','fail',hasClass)
        }
        
        let createClass = new Class({
            name,
            numeric,
            section,
            group
        })
        let createdClass = await createClass.save()
        if(!createdClass){
            return renderPageHandler(req,res,'createClass','fail','Internal Server Error')
        }
        await User.findOneAndUpdate({_id:req.user._id},{
            classes:createdClass._id
        })
        renderPageHandler(req,res,'createClass','success','Successfully Created Class')

    }catch(e){
        next(e)
    }
}