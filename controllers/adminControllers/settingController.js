const WebModel = require('../../models/WebModel')
const Page = require('../../models/Page')
const Category = require('../../models/Category')
const Controls = require('../../models/Controls')
const fs = require('fs')


async function renderPageHandler(req,res,pagename,title){
    try{    
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()
		let control = await Controls.findOne()
		res.render(`pages/administrator/${pagename}`, {
			style: 'bg-light',
			title: title||'Settings',
			data: req.admin,
			flashMessage: req.flash(),
			pages,
			createdPage: {},
			webNameList: webModel.name,
			webModel,
			category,
			control 
		})
    }catch(e){
        console.log(e)
    }
}
exports.settingGetController =  (req, res, next) => {
	renderPageHandler(req,res,'setting')
}
exports.webNameSetPostController = async (req, res, next) => {
	try {

		let { language, webname } = req.body

		let webModel = await WebModel.findOne()

		if (language.length === 0 || webname.length === 0) {
			let msg = language.length===0?'Please Select Webname Type':'Please Provied Webname'
			req.flash('fail',msg)
			return res.redirect('back')
		}

		let uniqNameError

		webModel.name.forEach(n => {
			if (n.lang === language) {
				uniqNameError = `${language.charAt(0).toUpperCase() + language.slice(1)} is Already Used`
			}
		})

		if (uniqNameError) {
			req.flash('fail',uniqNameError)
			return res.redirect('back')
		}

		let createdWebName = await WebModel.findOneAndUpdate(
			{ _id: webModel._id },
			{
				$push: {
					name: {
						lang: language,
						name: webname,
					},
				},
			},
			{ new: true }
		)

		if (!createdWebName) {
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Added Webname')
		res.redirect('back')
	
	} catch (e) {
		next(e)
	}
}
exports.webNameDeleteGetController = async (req, res, next) => {
	try {
		let { lang } = req.params
		let webModel = await WebModel.findOne()

		let hasDeletedName
		webModel.name.forEach(n => {
			if (n.lang === lang) {
				hasDeletedName = lang
			}
		})
		if (!hasDeletedName) {
			return res.redirect('back')
		}
		let deletedName = await WebModel.findOneAndUpdate(
			{ _id: webModel._id },
			{
				$pull: {
					name: {
						lang,
					},
				},
			},
			{
				new: true,
			}
		)
		if (!deletedName) {
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Deleted Webname')
		res.redirect('back')
	} catch (e) {
		next(e)
	}
}
exports.webNameUpdatePutController = async (req, res, next) => {
	try {
		let webModel = await WebModel.findOne()

		let { lang } = req.params
		let { webname } = req.body

		let updatedValue

		webModel.name.forEach(n => {
			if (n.lang === lang) {
				n.name = webname
				updatedValue = n.name
			}
		})

		let updatedWebName = await WebModel.findOneAndUpdate({ _id: webModel._id }, webModel, { new: true })
		if (!updatedWebName) {
			return res.status(500).json({ error: 'Internal Server Error' })
		}
		res.status(200).json({ message: 'Successfully Updated', webname: updatedValue })
	} catch (e) {
		next(e)
	}
}
exports.webLogoSetPostController = async (req, res, next) => {
	try {

		let webModel = await WebModel.findOne()

		if(!req.file){
			req.flash('fail','Please Select File to Upload')
			return res.redirect('back')
		}

		let logo = req.file.filename 
		
		let setLogoWebModel = await WebModel.findOneAndUpdate({_id:webModel._id},{
			logo:`/uploads/${logo}`
		},{
			new:true
		})

		if(!setLogoWebModel){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		fs.unlink(`public${webModel.logo}`,error=>{
			if(error){
				return next(error)
			}
		})
		
		req.flash('success','Successfully Added Web Logo')
		res.redirect('back')

	} catch (e) {
		next(e)
	}
}
exports.webLogoDeleteGetController = async(req,res,next)=>{
	try{	
		let webModel = await WebModel.findOne()

		if(!webModel.logo){
			return res.redirect('back')
		}

		let deletedWebLogo = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!deletedWebLogo){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		fs.unlink(`public${webModel.logo}`,error=>{
			if(error){
				return next(error)
			}
		})
		req.flash('success','Successfully Deleted Web Logo')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.sliderUploadPostController = async (req, res, next) => {
	try {
		let webModel = await WebModel.findOne()

		if(!req.file){
			req.flash('fail','Please Select File To Upload Slider Image')
			return res.redirect('back')
		}

		let hasSliderImg = false
		webModel.slider.forEach(slider=>{
			if(slider.name===req.file.originalname){
				hasSliderImg = true
				return false
			}
		})

		if(hasSliderImg){
			fs.unlink(`public/uploads/${req.file.filename}`,err=>{
				if(err){
					return next(err)
				}
			})
			req.flash('fail','Already Existing Slider Image')
			return res.redirect('back')
		}

		let uploadedSlider = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$push:{
				slider:{
					name:req.file.originalname,
					image:`/uploads/${req.file.filename}`
				}
			}
		},{new:true})
		if(!uploadedSlider){
			fs.unlink(`public/uploads/${req.file.filename}`,error=>{
				if(error){
					return next(error)
				}
			})
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Uploaded Slider Image')
		res.redirect('back')
	} catch (e) {
		next(e)
	}
}
exports.sliderDeleteGetController = async(req,res,next)=>{
	try{

		let webModel = await WebModel.findOne()

		let hasSliderImgId = true
		let sliderDeletedPath;
		webModel.slider.forEach(slider=>{
			if(slider._id.toString()===req.params.id.toString()){
				hasSliderImgId = false
				sliderDeletedPath = slider.image
				return false
			}
		})
		
		if(hasSliderImgId){
			return res.redirect('back')
		}


		let deletedSliderImg = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$pull:{
				slider:{
					_id:req.params.id
				}
			}
		},{
			new:true
		})
		if(!deletedSliderImg){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		fs.unlink(`public${sliderDeletedPath}`,err=>{
			if(err){
				return next(err)
			}
		})

		req.flash('success','Successfully Deleted Slider Image')
		res.redirect('back')
		
	}catch(e){
		next(e)
	}
}
exports.sliderEditInfoPostController = async(req,res,next)=>{
	try{

		let { name,action,text }  = req.body
		let { id } = req.params
		let webModel = await WebModel.findOne()
	  
		if(text.length===0){
			req.flash('fail','Cannot Be Empty Text Field')
			return res.redirect('back')
		}
		let hasSlider = false
		
		webModel.slider.forEach(slider=>{
			if(slider._id.toString()===id.toString()){
				hasSlider = true
				slider.btnName = name?name:''
				slider.action = action?action:''
				slider.text = text 

			}
		})
		if(!hasSlider){
			return res.redirect('back')
		}
		
		let updatedSliderText = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!updatedSliderText){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Updated Slider')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.sliderTextDeleteGetController = async(req,res,next)=>{
	try{
		let { id } = req.params
		let webModel = await WebModel.findOne()

		let hasSlider = false
		webModel.slider.forEach(slider=>{
			if(slider._id.toString()===id.toString()){
				hasSlider = true
				slider.btnName = ''
				slider.action = ''
				slider.text = ''
				return false
			}
		})

		if(!hasSlider){
			return res.redirect('back')
		}

		let deletedSliderText = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!deletedSliderText){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Deleted Slider Text')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.socialLinksCreatePostController = async(req,res,next)=>{
	try{
		let webModel = await WebModel.findOne()
	
		let { name,icon,action,color } = req.body


		if(name.length===0||icon.length===0||action.length===0||color.length===0){
			req.flash('fail','Please Provied Social Link')
			return res.redirect('back')
		}
		let uniqError = {}
		
		if(webModel.socialLinks){
			if(webModel.socialLinks.length!==0){
				webModel.socialLinks.forEach(link=>{
					if(link.action===action||link.name===name||link.icon===icon){
						uniqError.message = 'Already Used Link'
						return false
					}
				})
			}
		}

		if(uniqError.message){
			req.flash('fail',uniqError.message)
			return res.redirect('back')
		}

		let createdLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$push:{
				socialLinks:{
					name,
					action,
					icon,
					color
				}
			}
		},{new:true})

		if(!createdLink){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success','Successfully Added Social Link')
		res.redirect('back')

	}catch(e){
		next(e)
	}
}
exports.socialLinksDeleteGetController = async(req,res,next)=>{
	try{
		let { id } = req.params
		let webModel = await WebModel.findOne()
	  
		let hasDeletedId = false 
		webModel.socialLinks.forEach(link=>{
			
			if(link._id.toString()===id.toString()){
				hasDeletedId = true 
				
			}
		})
		if(!hasDeletedId){
			return res.redirect('back')
		}
		
		let deletedLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$pull:{
				socialLinks:{
					_id:id
				}
			}
		},{new:true})

		if(!deletedLink){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Deleted Social Link')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.socialLinksUpdatePostController = async(req,res,next)=>{
	try{
		let webModel = await WebModel.findOne()
		let { name,icon,action,color } = req.body
		let { id } = req.params

		if(name.length===0||icon.length===0||action.length===0||color.length===0){
			req.flash('fail','Please Provied Social Link')
			return res.redirect('back')
		}
		let uniqError = {}
		
		if(webModel.socialLinks){
			if(webModel.socialLinks.length!==0){
				webModel.socialLinks.forEach(link=>{
					if(link._id.toString()!==id.toString()){
						if(link.action===action||link.name===name||link.icon===icon){
							uniqError.message = 'Already Used Link'
							return false
						}
					}
				})
			}
		}
		if(uniqError.message){
			req.flash('fail',uniqError.message)
			return res.redirect('back')
		}
		webModel.socialLinks.forEach(link=>{
			if(link._id.toString()===id.toString()){
				link.name = name
				link.icon = icon 
				link.action = action 
				link.color = color
			}
		})

		let updatedLinks = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!updatedLinks){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Updated Social Links')
		res.redirect('back')

	}catch(e){
		next(e)
	}
}
exports.futuredLinksCreatePostController = async(req,res,next)=>{
	try{
		let webModel = await WebModel.findOne()

		let { name,url } = req.body

		if(name.length===0||url.length===0){
			req.flash('fail','Please Provied Futured Link')
			return res.redirect('back')
		}
		let uniqError = {}
		
		if(webModel.futuredLinks){
			if(webModel.futuredLinks.length!==0){
				webModel.futuredLinks.forEach(link=>{
					if(link.name===name||link.url===url){
						uniqError.message = 'Already Used Link'
						return false
					}
				})
			}
		}

		if(uniqError.message){
			req.flash('fail',uniqError.message)
			return res.redirect('back')
		}
		let createdLinks = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$push:{
				futuredLinks:{
					name,
					url
				}
			}
		},{new:true})

		if(!createdLinks){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		
		req.flash('success','Successfully Added Futured Links')
		return res.redirect('back')

	}catch(e){
		next(e)
	}
}
exports.futuredLinksDeleteGetController = async(req,res,next)=>{
	try{
		
		let { id } = req.params
		let webModel = await WebModel.findOne()

		let hasDeletedId = false 
		webModel.futuredLinks.forEach(link=>{
			
			if(link._id.toString()===id.toString()){
				hasDeletedId = true 
				
			}
		})
		if(!hasDeletedId){
			return res.redirect('back')
		}
		
		let deletedLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$pull:{
				futuredLinks:{
					_id:id
				}
			}
		},{new:true})

		if(!deletedLink){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success','Successfully Deleted Futured Link')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.futuredLinksUpdatePostController = async(req,res,next)=>{
	try{
		let webModel = await WebModel.findOne()
		let { name,url } = req.body
		let { id } = req.params
	
		if(name.length===0||url.length===0){
			req.flash('fail','Please Provied Futured Link')
			return res.redirect('back')
		}
		let uniqError = {}
		
		if(webModel.futuredLinks){
			if(webModel.futuredLinks.length!==0){
				webModel.futuredLinks.forEach(link=>{
					if(link._id.toString()!==id.toString()){
						if(link.name===name||link.url===url){
							uniqError.message = 'Already Used Link'
							return false
						}
					}
				})
			}
		}
		if(uniqError.message){
			req.flash('fail',uniqError.message)
			return res.redirect('back')
		}
		webModel.futuredLinks.forEach(link=>{
			if(link._id.toString()===id.toString()){
				link.name = name
				link.url = url 
				
			}
		})

		let updatedLinks = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!updatedLinks){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success','Successfully Updated Futured Link')
		res.redirect('back')

	}catch(e){
		next(e)
	}
}
exports.addPublicMailPostController = async(req,res,next)=>{
	try{
		let { email,password } = req.body

		if(email.length===0||password.length===0){
			req.flash('fail','Please Provied Email And Password')
			return res.redirect('back')
		}

		let controls = await Controls.findOne()
		let msg 
		let addedPublicMail 
		if(!controls){
			let addPublicMail = new Controls({
				publicMail:{
					email,
					password
				}
			})
			addedPublicMail = await addPublicMail.save() 
			msg = 'Added'

		}else{
			addedPublicMail = await Controls.findOneAndUpdate({_id:controls._id},{
				publicMail:{
					email,
					password
				}
			},{new:true})	
			msg = controls.publicMail.email?'Updated':'Added'

		}

		if(!addedPublicMail){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success',`Successfully ${msg} Public Mail`)
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.removePublicMailGetController = async(req,res,next)=>{
	try{

		let control = await Controls.findOne()

		let removedPublicMail = await Controls.findOneAndUpdate({_id:control._id},{
			publicMail:{
				email:'',
				password:''
			}
		},{new:true})

		if(!removedPublicMail){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success',`Successfully Remove Public Mail`)
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.developerInfoGetController = (req,res,next)=>{
	renderPageHandler(req,res,'developerInfo.ejs','Developer Info')
}

exports.forgottenPasswordStatusGetController = async(req,res,next)=>{
	try{
		let control = await Controls.findOne()
		let updatedControl
		let msg;

		if(req.query.status.toLowerCase()==='active'){
			updatedControl = await Controls.findOneAndUpdate({_id:control._id},{forgotPassword:true},{new:true})
			msg = 'Activited'
		}else{
			 updatedControl = await Controls.findOneAndUpdate({_id:control._id},{forgotPassword:false},{new:true})
			msg = 'Deactivited'
		}
		if(!updatedControl){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success',`Successfully ${msg} Out Of Admin Control Pannel Password Recover System`)
		return res.redirect('back')
	}catch(e){
		next(e)
	}
}
exports.userForgottenPasswordStatusGetController = async(req,res,next)=>{
	try{
		let control = await Controls.findOne()
		let updatedControl
		let msg;
		if(!control){
			req.flash('fail','Please Add Publich Mail')
			return res.redirect('back')
		}
		if(req.query.status.toLowerCase()==='active'){
			updatedControl = await Controls.findOneAndUpdate({_id:control._id},{userForgotPassword:true},{new:true})
			msg = 'Activited'
		}else{
			 updatedControl = await Controls.findOneAndUpdate({_id:control._id},{userForgotPassword:false},{new:true})
			msg = 'Deactivited'
		}
		if(!updatedControl){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success',`Successfully ${msg} Out Of Admin Control User Password Recovery System`)
		return res.redirect('back')
	}catch(e){
		next(e)
	}
}