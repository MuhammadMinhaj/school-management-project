const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const Admin = require('../../models/Admin')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const Category = require('../../models/Category')

async function renderPageHandler(req,res,pagename,title,model,error,){

		let contactsAdmin = await Admin.find()
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()

		res.render(`pages/administrator/${pagename}`, {
			title: title,
			error: error?error:{},
			style: 'bg-light',
			flashMessage: req.flash(),
			data: req.admin,
			errorData: req.body?req.body:{},
			pages,
			webModel,
			createdPage:{},
			contacts: contactsAdmin.slice(1),
			index: 1,
			category
		})
}

exports.createAdminGetController =(req, res, next) => {
		renderPageHandler(req,res,'adminCreateAccount','Create Admin')
}
exports.createAdminPostController = async (req, res, next) => {
	let error = validationResult(req).formatWith(err => err.msg)
	try {

		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			renderPageHandler(req,res,'adminCreateAccount','Invalid Creadentials',null,error.mapped())
			return false
		}

		let { name, username, email, phone, password, birthday, gender } = req.body
		let hashAdmin = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!hashAdmin) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}
		let hashedPassword = await bcrypt.hash(password, 11)
		let newAdmin = new Admin({
			name,
			username,
			email,
			phone,
			password: hashedPassword,
			dateOfBirthday: birthday,
			gender,
			
		})
		let createdAdmin = await newAdmin.save()
		if (!createdAdmin) {
			req.flash('fail', 'Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success', 'Successfully Created Admin')
		return res.redirect('back')
	} catch (e) {
		next(e)
	}
}
exports.createdAdminDeleteController = async (req, res, next) => {
	try {
		let { id } = req.params
		let hasDeleteAdmin = await Admin.findOne({ _id: id })

		if (!hasDeleteAdmin) {
			req.flash('fail', 'Admin Not Founded')
			return res.redirect('back')
		}
		if (req.admin._id.toString() === id.toString()) {
			return req.session.destroy(async err => {
				if (err) {
					req.flash('fail', 'Invalid Creadentials')
					let backURL = req.header('Referer')
					return res.redirect(backURL)
				}

				let deletedAdmin = await Admin.findOneAndRemove({ _id: id })
				if (!deletedAdmin) {
					req.flash('fail', 'Internal Server Error')
					return res.redirect('back')
				}
				res.clearCookie('connect.sid')
				return res.redirect('/auth/login')
			})
		}
		let deletedAdmin = await Admin.findOneAndRemove({ _id: id })
		if (!deletedAdmin) {
			req.flash('fail', 'Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success', 'Successfully Deleted Admin')
		res.redirect('back')
		
	} catch (e) {
		next(e)
	}
}
exports.createdAdminUpdateGetController = async (req, res, next) => {
	try {
		let { id } = req.params
		let hasAdminWithReq = req.admin
		if (!hasAdminWithReq) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}

		let checkUpdateAdmin = await Admin.findOne({ _id: id })
		if (!checkUpdateAdmin) {
			req.flash('fail', 'Update For Admin Not Found')
			return res.redirect('back')
		}
		let data = {
			name: checkUpdateAdmin.name,
			email: checkUpdateAdmin.email,
			phone: checkUpdateAdmin.phone,
			gender: checkUpdateAdmin.gender,
			birthday: checkUpdateAdmin.dateOfBirthday,
		}
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()

		res.render('pages/administrator/createdAdminUpdate.ejs', {
			title: 'Update Admin',
			style: 'bg-light',
			error: {},
			data: req.admin,
			errorData: data,
			pages,
			webModel,
			createdPage:{},
			flashMessage: req.flash(),
			id,
			category
		})

	} catch (e) {
		next(e)
	}
}
exports.createdAdminUpdateController = async (req, res, next) => {
	let hasAdminWithReq = req.admin
	let { id } = req.params
	let { name, email, phone, gender, birthday } = req.body

	if (!hasAdminWithReq) {
		req.flash('fail', 'Please Login')
		return res.redirect('/auth/login')
	}
	try {
		let webModel = await WebModel.findOne()
		let pages = await Page.find()
		let category = await Category.find()


		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Wrong Information')
			return res.render('pages/administrator/createdAdminUpdate.ejs', {
				title: 'Update Admin',
				style: 'bg-light',
				error: error.mapped(),
				data: req.admin,
				errorData: req.body,
				pages,
				webModel,
				createdPage:{},
				flashMessage: req.flash(),
				id,
				category
			})
		}
		let checkUpdatedAdmin = await Admin.findOne({ _id: id })
		if (!checkUpdatedAdmin) {
			req.flash('fail', 'Admin Not Found')
			return res.redirect('back')
		}
		let hasUpdatedAdmin = await Admin.findOneAndUpdate(
			{ _id: checkUpdatedAdmin._id, email: checkUpdatedAdmin.email },
			{
				name,
				email,
				phone,
				gender,
				dateOfBirthday: birthday,
			},
			{
				new: true,
			}
		)
		if (!hasUpdatedAdmin) {
			req.flash('fail', 'Internal Server Error')
			return res.redirect('back')
		}
		req.flash('success', 'Successfully Updated Admin 5555555555')
		res.redirect('back')
	} catch (e) {}
}
