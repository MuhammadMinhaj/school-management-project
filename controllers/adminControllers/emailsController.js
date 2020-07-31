const nodemailer = require('nodemailer')

const WebModel = require('../../models/WebModel')
const Page = require('../../models/Page')
const Contact = require('../../models/Contact')
const Category = require('../../models/Category')
const Controls = require('../../models/Controls')

async function pageRenderHandler(req,res,pagename,title){
	let webModel = await WebModel.findOne()
	let pages = await Page.find()
	let contact = await Contact.find()
	let category = await Category.find()
    let control =  await Controls.findOne()
	res.render(`pages/administrator/${pagename}`, {
		title: title,
		style: 'bg-light',
		data: req.admin,
		flashMessage: req.flash(),
		pages,
		webModel,
		createdPage: {},
        error: {},
        contacts:contact,
        category,
        control
	})
}
exports.emailsManagementGetController =(req,res,next)=>{
		pageRenderHandler(req,res,'emailsManagement.ejs','Emails')
}
exports.emailsDeleteGetController = async(req,res,next)=>{
	try{
        let { id } = req.params

        let deletedMail = await Contact.findOneAndDelete({_id:id})

        if(!deletedMail){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success','Successfully Deleted Email')
        res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.sentMailsPostController = async(req,res,next)=>{
    try{

        let { id } = req.params
        let { subject,message } = req.body 

        if(subject.length===0||message.length===0){
            req.flash('fail','Please Provide Subject And Message For To Send Mail')
            return res.redirect('back')
        }

        let control = await Controls.findOne()

        if(!control.publicMail.email||!control.publicMail.password){
            req.flash('fail','Please Add Public Mail From Setting Pannel')
            return res.redirect('back')
        }

        let hasClient  = await Contact.findOne({_id:id})
    
        if(!hasClient){
            req.flash('fail','Client Is Not Available')
            return res.redirect('back')
        }
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:control.publicMail.email,
                pass:control.publicMail.password
            }
        })
        let sendMailToClient = await transporter.sendMail({
            from:'test.projects24@gmail.com',
            to:hasClient.email,
            subject,
            text:message
        })
        if(!sendMailToClient.response){
            req.flash('fail','Email sent to failed! Please try to allow less secure apps from your mail account if not worked then contact with developer.')
            res.redirect('back')
        }

        let d = new Date()
        let correntMonth = d.getMonth()+1
        let updatedContact = await Contact.findOneAndUpdate({_id:id},{
            $push:{
                history:{
                    name:req.admin.name,
                    emailFrom:control.publicMail.email?control.publicMail.email:'',
                    subject,
                    message,
                    date:`${d.getDate()+1}/${correntMonth}/${d.getFullYear()}`
                }
            }
        },{new:true})

        if(!updatedContact){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
       req.flash('success','Successfully Sended Email')
       res.redirect('back')
    }catch(e){
        next(e)
    }
}
exports.contactStatusGetController = async(req,res,next)=>{
    try{
        let { status } = req.query

        let control = await Controls.findOne()
        let info;
        let msg ;
        
        if(status==='active'){
            info = await Controls.findOneAndUpdate({_id:control._id},{
                contactSentMail:true,
            },{new:true})
            msg = 'Successfully Activated Contact'
        }else{
            info = await Controls.findOneAndUpdate({_id:control._id},{
                contactSentMail:false,
            },{new:true})
            msg = 'Successfully Deactivated Contact'
        }
        if(!info){
            req.flash('fail','Internal Server Error')
            return res.redirect('back')
        }
        req.flash('success',msg)
        res.redirect('back')
    }catch(e){
        next(e)
    }
}
