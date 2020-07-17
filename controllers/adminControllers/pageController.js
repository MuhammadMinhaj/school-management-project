const fs = require('fs')

const Admin = require('../../models/Admin')
const Menu = require('../../models/Menu')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')

const { validationResult } = require('express-validator')
const Teacher = require('../../models/Teacher')

async function pageRenderHandler(req,res,pagename,title){
	let menu = await Menu.find()
	let webModel = await WebModel.findOne()
	let pages = await Page.find()
	let groupOfTeachers = await Teacher.find()
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
		groupOfTeachers
	})
}

function removeFilePathFromDirctory(path){
	if(path){
		fs.unlink(path,error=>{
			if(error){
				return false
			}
			return true
		})
	}
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

exports.addAboutTeacherInfoGetController = async(req,res,next)=>{
	try{
		pageRenderHandler(req,res,'aboutTeacher.ejs','About Teachers')
	}catch(e){
		next(e)
	}
}
exports.createTeacherGroupPostController = async(req,res,next)=>{
	try{
		let { name } = req.body
		if(!name){
			req.flash('fail','Please Provied Group Name')
			return res.redirect('back')
		}

		let createGroup = new Teacher({
			name
		})

		let createdGroup = await createGroup.save()

		if(!createdGroup){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success','Successfully Created Teacher Group')
		res.redirect('back')
		console.log(createdGroup)
	}catch(e){
		next(e)
	}
}

exports.deleteTeacherGroupGetController = async(req,res,next)=>{
	try{	
		let { id } = req.params
		let deletedGroup = await Teacher.findOneAndDelete({_id:id})
		if(!deletedGroup){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		for(let teacher of deletedGroup.teachers){
			if(teacher){
				removeFilePathFromDirctory(`public/${teacher.image}`)
			}
		}
		req.flash('success','Successfully Deleted Teachers Group')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}

exports.updateTeacherGroupPostController = async(req,res,next)=>{
	try{
		let { name } = req.body
		let { id } = req.params
		if(!name){
			req.flash('fail','Please Provied Group Name')
			return res.redirect('back')
		}

		let updatedGroup = await Teacher.findOneAndUpdate({_id:id},{name},{new:true})
		if(!updatedGroup){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success','Successfully Updated Teacher Group')
		res.redirect('back')
		console.log(updatedGroup)
	}catch(e){
		next(e)
	}
}

exports.addTeacherInfoPostController = async(req,res,next)=>{
	try{

		let { name,qualifications,bio,email,phone,website,group } = req.body
		let file = req.file

		if(name.length===0||qualifications.length===0||group.length===0){
			req.flash('fail','Please Provied Required Information')
			file?removeFilePathFromDirctory(file.path):null
			return res.redirect('back')
		}

		let addedTeacherInfo = await Teacher.findOneAndUpdate({_id:group},{
			$push:{
				teachers:{
					image:file?`/uploads/${file.filename}`:'',
					name,
					qualifications,
					bio,
					conactInfo:{
						email,
						phone,
						website
					}
				}
			}
		},{new:true})

		if(!addedTeacherInfo){
			file?removeFilePathFromDirctory(file.path):null
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		req.flash('success','Successfully Added Teacher Information')
		res.redirect('back')
		console.log(addedTeacherInfo)
	}catch(e){
		next(e)
	}
}

exports.updateTeacherInfoPostController = async(req,res,next)=>{
	try{

		let { name,qualifications,bio,email,phone,website,group } = req.body
		let file = req.file
		console.log(req.body)
		console.log(req.params)
		console.log(req.query)

		let { id } = req.params
		let { userid } = req.query

		
		if(name.length===0||qualifications.length===0||group.length===0){
			req.flash('fail','Please Provied Required Information')
			file?removeFilePathFromDirctory(file.path):null
			return res.redirect('back')
		}

		let hasGroup = await Teacher.findOne({_id:id})
		if(!hasGroup){
			req.flash('fail','Somthing Went To Wrong')
			return res.redirect('back')
		}

		let path;
		for(let teacher of hasGroup.teachers){
		
			
			if(teacher._id.toString()===userid.toString()){
				path = teacher.image 
				teacher.image = file?`/uploads/${file.filename}`:path 
				teacher.name = name 
				teacher.qualifications = qualifications
				teacher.bio = bio 
				teacher.conactInfo.email = email 
				teacher.conactInfo.phone = phone 
				teacher.conactInfo.website = website
			}
		
		}

	
		// console.log(hasGroup)

		let updatedTeacherInfo = await Teacher.findOneAndUpdate({_id:id},hasGroup,{new:true})


		if(!updatedTeacherInfo){
			file?removeFilePathFromDirctory(file.path):null
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		file?removeFilePathFromDirctory(`public/${path}`):null

		req.flash('success','Successfully Updated Teacher Information')
		res.redirect('back')
			console.log('updatedTeacherInfo')
		console.log(updatedTeacherInfo)
		console.log('updatedTeacherInfo')
	
	}catch(e){
		next(e)
	}
}
exports.deleteTeacherInfoGetController = async(req,res,next)=>{
	try{
		let { id } = req.params;
		let { userid } = req.query

		let hasGroup = await Teacher.findOne({_id:id})
		if(!hasGroup){
			req.flash('fail','Cannot Delete This,Cause Group Is Not Available')
			return res.redirect('back')
		}


		let path 
		for(let teacher of hasGroup.teachers){
			path = teacher.image
		}
		let deletedTeacher = await Teacher.findOneAndUpdate({_id:id},{
			$pull:{
				teachers:{
					_id:userid
				}
			}
		},{new:true})

		console.log(deletedTeacher)
		if(!deletedTeacher){
			req.flash('fail','Internal Server Error')
			return res.redirect('back')
		}

		path?removeFilePathFromDirctory(`public/${path}`):null

		req.flash('success','Successfully Deleted Teacher Info From Group')
		res.redirect('back')
	}catch(e){
		next(e)
	}
}

