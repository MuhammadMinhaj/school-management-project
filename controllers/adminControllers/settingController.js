let { validationResult } = require('express-validator')
let WebModel = require('../../models/WebModel')
let Admin = require('../../models/Admin')
let Page = require('../../models/Page')
let fs = require('fs')

exports.settingGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		console.log(webModel)
		res.render('pages/administrator/setting.ejs', {
			style: 'bg-light',
			title: 'Administrator Setting',
			data: admin,
			flashMessage: req.flash(),
			pages,
			createdPage: {},
			upSliderImgErr: {},
			webNameError: {},
			webNameList: webModel.name,
			webModel,
		})
	} catch (e) {
		next(e)
	}
}
exports.settingRedirectGetController = (req, res, next) => {
	if (req.params.name) {
		return res.redirect('/administrator/setting')
	}
	next()
}

exports.webNameSetPostController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()

		let { language, webname } = req.body
		let WebNameerror = {}

		WebNameerror.language = language.length === 0 ? 'Please Select Language' : ''
		WebNameerror.language = language === 'Choose...' ? 'Please Select Language' : ''
		WebNameerror.webname = webname.length === 0 ? 'Please Enter Webname' : ''

		let webModel = await WebModel.findOne()

		function errorRenderPageHanlder(msg, error) {
			if (msg) req.flash('fail', msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: error ? error : {},
				webNameList: webModel.name,
				webModel
			})
		}

		if (WebNameerror.language.length !== 0 || WebNameerror.webname.length !== 0) {
			return errorRenderPageHanlder(null, WebNameerror)
		}

		let uniqNameError

		webModel.name.forEach(n => {
			if (n.lang === language) {
				uniqNameError = `${language.charAt(0).toUpperCase() + language.slice(1)} is Already Used`
			}
		})

		if (uniqNameError) {
			return errorRenderPageHanlder(uniqNameError, null)
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
			return errorRenderPageHanlder('Internal Server Error', null)
		}

		return res.render('pages/administrator/setting.ejs', {
			style: 'bg-light',
			title: 'Administrator Setting',
			data: admin,
			flashMessage: req.flash(),
			pages,
			createdPage: {},
			upSliderImgErr: {},
			webNameError: {},
			webNameList: createdWebName.name,
			webModel
		})
	} catch (e) {
		next(e)
	}
}
exports.webNameDeleteGetController = async (req, res, next) => {
	try {
		let { lang } = req.params
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()

		let webModel = await WebModel.findOne()
		let hasDeletedName
		webModel.name.forEach(n => {
			if (n.lang === lang) {
				hasDeletedName = lang
			}
		})
		if (!hasDeletedName) {
			return res.redirect('/administrator/setting')
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
		function pageRenderHandler(msgOpt, msg) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList: deletedName ? deletedName.name : webModel.name,
				webModel
			})
		}
		if (!deletedName) {
			return pageRenderHandler('fail', 'Internal Server Error')
		}
		pageRenderHandler('success', 'Successfully Deleted Website Name')
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
		console.log(updatedWebName)
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
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		if(!req.file){
			return pageRenderHandler('fail','Please Select File to Upload')
		}

		let logo = req.file.filename 

		if(webModel.logo){
			fs.unlink(`public${webModel.logo}`,error=>{
				if(error){
					return next(error)
				}
			})
		}

		let setLogoWebModel = await WebModel.findOneAndUpdate({_id:webModel._id},{
			logo:`/uploads/${logo}`
		},{
			new:true
		})
		webModel.logo = setLogoWebModel.logo
		function pageRenderHandler(msgOpt, msg) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel
			})
		}
		if(!setLogoWebModel){
			return pageRenderHandler('fail','Internal Server Error')
		}
		pageRenderHandler('success','Successfully Updated Logo')

	} catch (e) {
		next(e)
	}
}

exports.webLogoDeleteGetController = async(req,res,next)=>{
	try{	
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		function pageRenderHandler(msgOpt, msg) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel
			})
		}
		if(!webModel.logo){
			return res.redirect('/administrator/setting')
		}
		fs.unlink(`public${webModel.logo}`,error=>{
			if(error){
				return next(error)
			}
		})
		webModel.logo = ""
		let deletedWebLogo = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!deletedWebLogo){
			return pageRenderHandler('fail','Internal Server Error')
		}
		res.redirect('/administrator/setting')
	}catch(e){
		next(e)
	}
}

exports.sliderUploadPostController = async (req, res, next) => {
	try {

		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		function pageRenderHandler(msgOpt, msg,webModel) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel:webModel
			})
		}
		if(!req.file){
			return pageRenderHandler('fail','Please Select File To Upload Images',webModel)
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
			return pageRenderHandler('fail','Already Existing Slider Image',webModel)
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
			return pageRenderHandler('fail','Internal Server Error',webModel)
		}
		pageRenderHandler('success','Successfully Uploaded Slider Image',uploadedSlider)
	
	} catch (e) {
		next(e)
	}
}

exports.sliderDeleteGetController = async(req,res,next)=>{
	try{
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		function pageRenderHandler(msgOpt, msg,webModel) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel:webModel
			})
		}

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
			return res.redirect('/administrator/setting')
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
			return pageRenderHandler('fail','Internal Server Error',webModel)
		}
		console.log('Checked The Path Is:'+sliderDeletedPath)
		fs.unlink(`public${sliderDeletedPath}`,err=>{
			if(err){
				return next(err)
			}
		})
		pageRenderHandler('success','Successfully Deleted Slider Image',deletedSliderImg)
		
	}catch(e){
		next(e)
	}
}
exports.sliderEditInfoPostController = async(req,res,next)=>{
	try{

		let { name,action,text }  = req.body
		let { id } = req.params
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		function pageRenderHandler(msgOpt, msg,webModel) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel:webModel
			})
		}

		if(text.length===0){
			return pageRenderHandler('fail','Cannot Be Empty Text Field',webModel)
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
			return res.redirect('/administrator/setting')
		}
		
		let updatedSliderText = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!updatedSliderText){
			return pageRenderHandler('fail','Internal Server Error',webModel)
		}
		pageRenderHandler('success','Successfully Updated Slider Text',updatedSliderText)
		
	}catch(e){
		next(e)
	}
}
exports.sliderTextDeleteGetController = async(req,res,next)=>{
	try{
		let { id } = req.params
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		function pageRenderHandler(msgOpt, msg,webModel) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel:webModel
			})
		}

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
			return res.redirect('/administrator/setting')
		}

		let deletedSliderText = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		if(!deletedSliderText){
			return pageRenderHandler('fail','Internal Server Error',webModel)
		}
		// pageRenderHandler('success','Successfully Deleted Slider Text',deletedSliderText)
		res.redirect('/administrator/setting')
	}catch(e){
		next(e)
	}
}
exports.socialLinksCreatePostController = async(req,res,next)=>{
	try{
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let { name,icon,action,color } = req.body

		
		function pageRenderHandler(msgOpt, msg,webModel) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel:webModel
			})
		}

		if(name.length===0||icon.length===0||action.length===0||color.length===0){
			return pageRenderHandler('fail','Cannot Be Empty Social Link',webModel)
		}
		let uniqError = {}
		
		if(webModel.links){
			if(webModel.links.length!==0){
				webModel.links.forEach(link=>{
					if(link.action===action||link.name===name||link.icon===icon){
						uniqError.message = 'Already Used Link'
						return false
					}
				})
			}
		}

		if(uniqError.message){
			return pageRenderHandler('fail',uniqError.message,webModel)
		}

		let createdLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$push:{
				links:{
					name,
					action,
					icon,
					color
				}
			}
		},{new:true})

		if(!createdLink){
			return pageRenderHandler('fail','Internal Server Error',webModel)
		}
		pageRenderHandler('success','Successfully Created Link',createdLink)

	}catch(e){
		next(e)
	}
}
exports.socialLinksDeleteGetController = async(req,res,next)=>{
	try{
		let { id } = req.params
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		function pageRenderHandler(msgOpt, msg,webModel) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel:webModel
			})
		}


		let hasDeletedId = false 
		webModel.links.forEach(link=>{
			
			if(link._id.toString()===id.toString()){
				hasDeletedId = true 
				
			}
		})
		if(!hasDeletedId){
			return res.redirect('/administrator/setting')
		}
		

		let deletedLink = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$pull:{
				links:{
					_id:id
				}
			}
		},{new:true})

		if(!deletedLink){
			return pageRenderHandler('fail','Internal Server Error',webModel)
		}
		return res.redirect('/administrator/setting')
	}catch(e){
		next(e)
	}
}
exports.socialLinksUpdatePostController = async(req,res,next)=>{
	try{
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let { name,icon,action,color } = req.body
		let { id } = req.params
		function pageRenderHandler(msgOpt, msg,webModel) {
			if (msg) req.flash(msgOpt, msg)
			return res.render('pages/administrator/setting.ejs', {
				style: 'bg-light',
				title: 'Administrator Setting',
				data: admin,
				flashMessage: req.flash(),
				pages,
				createdPage: {},
				upSliderImgErr: {},
				webNameError: {},
				webNameList:webModel.name,
				webModel:webModel
			})
		}

		if(name.length===0||icon.length===0||action.length===0||color.length===0){
			return pageRenderHandler('fail','Cannot Be Empty Social Link',webModel)
		}
		let uniqError = {}
		
		if(webModel.links){
			if(webModel.links.length!==0){
				webModel.links.forEach(link=>{
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
			return pageRenderHandler('fail',uniqError.message,webModel)
		}
		webModel.links.forEach(link=>{
			if(link._id.toString()===id.toString()){
				link.name = name
				link.icon = icon 
				link.action = action 
				link.color = color
			}
		})

		let updatedLinks = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})
		console.log(updatedLinks)
		if(!updatedLinks){
			return pageRenderHandler('fail','Internal Server Error',webModel)
		}
		pageRenderHandler('success','Successfully Updated Social Links',updatedLinks)

	}catch(e){
		next(e)
	}
}