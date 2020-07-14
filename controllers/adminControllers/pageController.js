const fs = require('fs')

const Admin = require('../../models/Admin')
const Menu = require('../../models/Menu')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')

const { validationResult } = require('express-validator')

async function pageRenderHandler(req,res,pagename,title){
	let menu = await Menu.find()
	let webModel = await WebModel.findOne()
	let pages = await Page.find()
	res.render(`pages/administrator/${pagename}`, {
		title: title,
		style: 'bg-light',
		data: req.admin,
		flashMessage: req.flash(),
		menu,
		pages,
		webModel,
		createdPage: {},
		error: {},
	})
}

function removeFilePathFromDirctory(path){
	fs.unlink(path,error=>{
		if(error){
			return false
		}
		return true
	})
}

exports.pageCreateGetController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			return res.redirect('/auth/login')
		}
		let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		let pages = await Page.find()
		res.render('pages/administrator/createPage.ejs', {
			title: 'Create Menu',
			style: 'bg-light',
			data: req.admin,
			flashMessage: req.flash(),
			menu,
			pages,
			webModel,
			createdPage: {},
			error: {},
		})
	} catch (e) {
		next(e)
	}
}
exports.pageCreatePostController = async (req, res, next) => {
	let error = validationResult(req).formatWith(error => error.msg)
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}
		// Check Validation Result

		let menu = await Menu.find()
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/createPage.ejs', {
				title: 'Create Menu',
				style: 'bg-light',
				data: req.admin,
				flashMessage: req.flash(),
				menu,
				pages,
				webModel,
				createdPage: {},
				error: error.mapped(),
			})
		}
		let { title, body, menuName } = req.body

		let page = new Page({
			title,
			body,
			menu: menuName,
			// image:req.file?`/uploads/${req.file.filename}`:''
		})
		let createdPage = await page.save()
		if (!createdPage) {
			req.flash('fail', 'Internal Server Error')
			return res.render('pages/administrator/createPage.ejs', {
				title: 'Create Menu',
				style: 'bg-light',
				data: req.admin,
				flashMessage: req.flash(),
				menu,
				pages,
				webModel,
				createdPage: {},
				error: {},
			})
		}

		req.flash('success', `Successfully Created ${menuName.toUpperCase()} Page`)
		res.render('pages/administrator/createPage.ejs', {
			title: 'Create Menu',
			style: 'bg-light',
			data: req.admin,
			flashMessage: req.flash(),
			menu,
			pages,
			webModel,
			createdPage,
			error: {},
		})
	} catch (e) {
		next(e)
	}
}
exports.pageUpdateGetController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}
		let menu = await Menu.find()
		let pages = await Page.find()
		let webModel = await WebModel.findOne()

		let updatePage = await Page.findOne({ _id: req.params.pageId })

		if (!updatePage) {
			req.flash('fail', 'Not Found Menu')
			return res.redirect('/administrator/page_create')
		}
		res.render('pages/administrator/updatePage.ejs', {
			title: 'Update Menu',
			style: 'bg-light',
			data: req.admin,
			flashMessage: req.flash(),
			menu,
			pages,
			webModel,
			updatePage,
			createdPage: {},
			error: {},
		})
	} catch (e) {
		next(e)
	}
}
exports.pageUpdatePostController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}
		let { pageId } = req.params

		let menu = await Menu.find()
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let updatePage = await Page.findOne({ _id: pageId })

		let { title, menuName, body } = req.body

		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/updatePage.ejs', {
				title: 'Update Menu',
				style: 'bg-light',
				data: req.admin,
				flashMessage: req.flash(),
				menu,
				pages,
				webModel,
				updatePage: {
					menu: menuName,
					title,
					body,
					_id: updatePage._id,
				},
				createdPage: {},
				error: error.mapped(),
			})
		}
		// update page
		let updatedPage = await Page.findOneAndUpdate(
			{ _id: pageId },
			{
				menu: menuName,
				title,
				body,
			},
			{
				new: true,
			}
		)
		if (!updatedPage) {
			req.flash('fail', 'Internal Server Error')
			return res.render('pages/administrator/updatePage.ejs', {
				title: 'Update Menu',
				style: 'bg-light',
				data: req.admin,
				flashMessage: req.flash(),
				menu,
				pages,
				webModel,
				updatePage: {
					menu: menuName,
					title,
					body,
					_id: updatePage._id,
				},
				createdPage: {},
				error: {},
			})
		}
		req.flash('success', 'Successfully Updated Page')
		return res.render('pages/administrator/updatePage.ejs', {
			title: 'Update Menu',
			style: 'bg-light',
			data: req.admin,
			flashMessage: req.flash(),
			menu,
			pages,
			webModel,
			updatePage: updatedPage,
			createdPage: {},
			error: {},
		})
	} catch (e) {
		next(e)
	}
}
exports.pageDeleteGetController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}
		let { pageId } = req.params

		let hasPage = await Page.findOne({ _id: pageId })
		if (!hasPage) {
			req.flash('fail', 'Page Not Found')
			return res.redirect('/administrator/page_create')
		}
		let menu = await Menu.find()
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let deletedPage = await Page.findOneAndDelete({ _id: pageId })

		if (!deletedPage) {
			req.flash('fail', 'Internal Server Error')
			return res.render('pages/administrator/updatePage.ejs', {
				title: 'Update Menu',
				style: 'bg-light',
				data: req.admin,
				flashMessage: req.flash(),
				menu,
				pages,
				webModel,
				updatePage: hasPage,
				createdPage: {},
				error: {},
			})
		}
		req.flash('success', 'Successfully Deleted Page')
		res.redirect('/administrator/page_create')
	} catch (e) {
		next(e)
	}
}

exports.addTextAboutAdministratorGetController = async(req,res,next)=>{
	try{
		pageRenderHandler(req,res,'aboutAdmin','About Administrator')
	}catch(e){
		next(e)
	}
}
	
exports.addTextAboutAdministratorPostController = async(req,res,next)=>{
	try{
		let { name,title1,title2,bio } = req.body
	
		if(name.length===0||bio.length===0){
			if(req.file){
				removeFilePathFromDirctory(req.file.path)
			}
			req.flash('fail','Please Provied Name And Bio')
			return res.redirect('back')
		}
		if(!req.file){
			req.flash('fail','Please Uploads Image Of Administrator')
			return res.redirect('back')
		}

		let webModel = await WebModel.findOne()

		let addedAboutAdmin = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$push:{
				aboutOfAdmin:{
					image:`/uploads/${req.file.filename}`,
					name,
					title:title1,
					subtitle:title2,
					bio,
				}
			}
		},{new:true})
		
		if(!addedAboutAdmin){
			removeFilePathFromDirctory(req.file.path)
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success','Successfully Added About Of Administrator')
		res.redirect('back')

		console.log(addedAboutAdmin)
	}catch(e){
		next(e)
	}
}

exports.deleteTextAboutAdministratorGetController = async(req,res,next)=>{
	try{
		let { id } = req.params

		let webModel = await WebModel.findOne()

		let path;

		for(let about of webModel.aboutOfAdmin){
			if(about._id.toString()===id.toString()){
				path = about.image
			}
		}

		let deletedAboutOfAdmin = await WebModel.findOneAndUpdate({_id:webModel._id},{
			$pull:{
				aboutOfAdmin:{
					_id:id
				}
			}
		},{new:true})
			
		if(!deletedAboutOfAdmin){
			req.flash('fail','Internal Server Error')
			return redirect('back')
		}

		path?removeFilePathFromDirctory(`public/${path}`):null

		req.flash('success','Successfully Deleted About Administrator Info')
		res.redirect('back')
		
	}catch(e){
		next(e)
	}
}

exports.updateTextAboutAdministratorPostController = async(req,res,next)=>{
	try{
		let { name,title1,title2,bio } = req.body
		let { id } = req.params
	
		if(name.length===0||bio.length===0){
			if(req.file){
				removeFilePathFromDirctory(req.file.path)
			}
			req.flash('fail','Please Provied Name And Bio')
			return res.redirect('back')
		}
		
		let webModel = await WebModel.findOne()

		let path;
		
		for(let about of webModel.aboutOfAdmin){
			if(about._id.toString()===id.toString()){
				path = about.image 
				about.image = req.file?`/uploads/${req.file.filename}`:path	
				about.name = name 
				about.title = title1 
				about.subtitle = title2	
				about.bio = bio 

			}
		}
		
		let updatedAboutAdminInfo = await WebModel.findOneAndUpdate({_id:webModel._id},webModel,{new:true})

		if(!updatedAboutAdminInfo){
			req.file?removeFilePathFromDirctory(req.file.path):null
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}
		req.file?removeFilePathFromDirctory(`public/${path}`):null
		req.flash('success','Successfully Updated About Of Administrator Info')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}
