const Admin = require('../../models/Admin')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const Category = require('../../models/Category')


exports.adminAccountGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()

		res.render('pages/administrator/account.ejs', {
			title: 'Administraotr Account',
			style: 'bg-light',
			flashMessage: {},
			data: admin,
			pages,
			webModel,
			createdPage:{},
			error: {},
			category,
		})
	} catch (e) {
		next(e)
	}
}
exports.adminAccountPostController = async (req, res, next) => {
	try {
		let category = await Category.find()
		let { name, username, email, phone, dateOfBirthday, gender } = req.body
		let data = {
			name,
			username,
			email,
			phone,
			dateOfBirthday,
			gender,
		}
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Wrong Information')
			return res.render('pages/administrator/account.ejs', {
				title: 'Administrator Account',
				style: 'bg-light',
				error: error.mapped(),
				data: data,
				pages,
				webModel,
				createdPage:{},
				flashMessage: req.flash(),
				category
			})
		}

		let updatedAdmin = await Admin.findOneAndUpdate({ _id: req.admin._id }, data, {
			new: true,
		})
		req.flash('success', 'Successfully Updated Account')
		res.render('pages/administrator/account.ejs', {
			title: 'Updated Account',
			style: 'bg-light',
			error: {},
			pages,
			webModel,
			createdPage:{},
			data: updatedAdmin,
			flashMessage: req.flash(),
			category
		})
	} catch (e) {
		next(e)
	}
}
// Create Admin Scurity Password
exports.createAdminSecurityPasswordGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()
		if (admin) {
			res.render('pages/administrator/securityPassword.ejs', {
				title: admin.securityPassword ? 'Update Security Password' : 'Create Security Password',
				style: 'bg-light',
				error: {},
				data: admin,
				pages,
				webModel,
				createdPage:{},
				flashMessage: req.flash(),
				category
			})
		}
	} catch (e) {
		next(e)
	}
}
exports.createAdminSecurityPasswordPostController = async (req, res, next) => {
	let { securityPassword } = req.body
	try {
		// If Founded Any Error In Express Validator Then Work This Condition
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()


		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Wrong Information')
			return res.render('pages/administrator/securityPassword.ejs', {
				title: admin.securityPassword ? 'Update Security Password' : 'Create Security Password',
				style: 'bg-light',
				error: error.mapped(),
				data: admin,
				pages,
				webModel,
				createdPage:{},
				flashMessage: req.flash(),
				category
			})
		}
		let message = admin.securityPassword ? 'Successfully Updated Security Password' : 'Successfully Created Security Password'
		let hashedSecurityPassword = await bcrypt.hash(securityPassword, 11)
		let updatedAdmin = await Admin.findOneAndUpdate(
			{ _id: admin._id },
			{
				securityPassword: hashedSecurityPassword,
			},
			{
				new: true,
			}
		)
		if (updatedAdmin) {
			req.flash('success', message)
			return res.redirect('/administrator/security-password')
		}
		req.flash('fail', 'Internal Server Error')
		res.render('pages/administrator/securityPassword.ejs', {
			title: 'Internal Server Error',
			style: 'bg-light',
			error: error.mapped(),
			data: admin,
			pages,
			webModel,
			createdPage:{},
			flashMessage: req.flash(),
			category
		})
	} catch (e) {
		next(e)
	}
}
// Login Admin Security Password
exports.loginAdminSecurityPasswordGetController = async (req, res, next) => {
	try {
		let admin = req.admin
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()

		if (admin) {
			res.render('pages/administrator/loginSecurityPassword.ejs', {
				title: 'Login Security Password',
				style: 'bg-dark',
				error: {},
				pages,
				webModel,
				createdPage:{},
				flashMessage: req.flash(),
				data: admin,
				category
			})
		}
	} catch (e) {
		next(e)
	}
}
exports.loginAdminSecurityPasswordPostController = async (req, res, next) => {
	let { securityPassword } = req.body
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()

		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			return res.render('pages/administrator/loginSecurityPassword.ejs', {
				title: 'Login Security Password',
				style: 'bg-dark',
				error: error.mapped(),
				flashMessage: {},
				pages,
				webModel,
				createdPage:{},
				data: admin,
				category
			})
		}
		let reCheckedSecurityPassword = await bcrypt.compare(securityPassword, admin.securityPassword)
		if (reCheckedSecurityPassword) {
			req.session.isSecurityLoggedIn = true
			return req.session.save(err => {
				if (err) {
					return next(err)
				}
				req.session.reload(err => {
					if (err) {
						return next(err)
					}
					backURL = req.header('Referer') || '/administrator/dashboard'
					res.redirect(backURL)
				})
			})
		}
	} catch (e) {
		next(e)
	}
}
