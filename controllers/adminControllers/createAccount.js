let { validationResult } = require('express-validator')
let bcrypt = require('bcrypt')
let Admin = require('../../models/Admin')
let Page = require('../../models/Page')
let WebModel = require('../../models/WebModel')
exports.createAdminGetController = async (req, res, next) => {
	try {
		let hasAdmin = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!hasAdmin) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}
		let contactsAdmin = await Admin.find()
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		res.render('pages/administrator/adminCreateAccount.ejs', {
			title: 'Create Admin',
			error: {},
			style: 'bg-light',
			flashMessage: req.flash(),
			data: req.admin,
			errorData: {},
			pages,
			webModel,
			createdPage:{},
			contacts: contactsAdmin.slice(1),
			index: 1,
		})
	} catch (e) {
		next(e)
	}
}
exports.createAdminPostController = async (req, res, next) => {
	let error = validationResult(req).formatWith(err => err.msg)
	try {
		let contactsAdmin = await Admin.find()
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/adminCreateAccount.ejs', {
				title: 'Create Admin',
				error: error.mapped(),
				style: 'bg-light',
				flashMessage: req.flash(),
				data: req.admin,
				errorData: req.body,
				pages,
				webModel,
				createdPage:{},
				contacts: contactsAdmin.slice(1),
				index: 1,
			})
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
			return res.render('pages/administrator/adminCreateAccount.ejs/', {
				title: 'Create Admin',
				error: {},
				style: 'bg-light',
				flashMessage: req.flash(),
				data: req.body,
				errorData: {},
				pages,
				webModel,
				createdPage:{},
				contacts: contactsAdmin.slice(1),
				index: 1,
			})
		}
		req.flash('success', 'Successfully Created Admin')
		return res.redirect('/administrator/create')
	} catch (e) {
		next(e)
	}
}
exports.createdAdminDeleteController = async (req, res, next) => {
	let hasAdmin = req.admin

	if (!hasAdmin) {
		return res.redirect('/auth/login')
	}
	try {
		let { id } = req.params
		let hasDeleteAdmin = await Admin.findOne({ _id: id })

		if (!hasDeleteAdmin) {
			req.flash('fail', 'Admin Not Founded')
			return res.redirect('/administrator/create')
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
					return res.redirect('/administrator/create')
				}
				res.clearCookie('connect.sid')
				return res.redirect('/auth/login')
			})
		}
		let deletedAdmin = await Admin.findOneAndRemove({ _id: id })
		if (!deletedAdmin) {
			req.flash('fail', 'Internal Server Error')
			return res.redirect('/administrator/create')
		}
		req.flash('success', 'Successfully Deleted Admin')
		res.redirect('/administrator/create')
		
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
			return res.redirect('/administrator/create')
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
			})
		}
		let checkUpdatedAdmin = await Admin.findOne({ _id: id })
		if (!checkUpdatedAdmin) {
			req.flash('fail', 'Admin Not Found')
			return res.render('pages/administrator/createdAdminUpdate.ejs', {
				title: 'Update Admin',
				style: 'bg-light',
				error: {},
				data: req.admin,
				errorData: req.body,
				pages,
				webModel,
				createdPage:{},
				flashMessage: req.flash(),
				id,
			})
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
			return res.redirect(req.header('Referer'))
		}
		let data = {
			name: hasUpdatedAdmin.name,
			email: hasUpdatedAdmin.email,
			phone: hasUpdatedAdmin.phone,
			birthday: hasUpdatedAdmin.dateOfBirthday,
			gender: hasUpdatedAdmin.gender,
		}
		req.flash('success', 'Successfully Updated Admin')
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
		})
	} catch (e) {}
}
