const Admin = require('../../models/Admin')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const Page = require('../../models/Page')
const Category = require('../../models/Category')
const Controls = require('../../models/Controls')

async function pageRenderHandler(req,res,pagename,title,error,model){
		let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		let { forgotPassword } = await Controls.findOne() 
		return res.render(`pages/administrator/${pagename}`, {
			title:title,
			style: 'bg-dark',
			error: error?error:{},
			menu,
			flashMessage: req.flash(),
			webModel,
			createdPage: {},
			category:model?model.category:{},
			pages:model?model.pages:{},
			data: model?model.admin:{},
			forgotPassword
		})
	
}
exports.adminLoginGetController = async (req, res, next) => {
		pageRenderHandler(req,res,'login','Login')
}
exports.adminLoginPostController = async (req, res, next) => {
	try {
		let { email, password } = req.body
		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Wrong Information')
			
			pageRenderHandler(req,res,'login','Wrong Info',error.mapped())
			return false
		}

		let admin = await Admin.findOne({ email })
		// If Admin Not Founded In Database Then Work This Condition
		if (!admin) {
			req.flash('fail', 'Invalid Creadentials')
			return res.redirect('back')
		}

		// If Administrator Password Dose Not Macthed (admin) Then Work This Condition
		if (admin.password !== 'admin') {
			let checkedPassword = await bcrypt.compare(password, admin.password)
			if (checkedPassword && admin.email === email) {
				return req.session.save(err => {
					if (err) {
						return next(err)
					}
					req.flash('success', 'Successfully Login')
					req.session.isLoggedIn = true
					req.session.admin = admin
					res.redirect('/administrator/dashboard')
				})
			}
			req.flash('fail', 'Invalid Creadentials')
			return res.redirect('back')
		}

		// If Administrator Password Is (admin) Then Work This Condition

		if (admin.email === email && admin.password === password) {
			return req.session.save(err => {
				if (err) {
					return next(err)
				}
				req.flash('success', 'Successfully Login')
				req.session.isLoggedIn = true
				req.session.admin = admin
				res.redirect('/administrator/dashboard')
			})
		}
		// Failed To Loggin With Default Password
		req.flash('fail', 'Invalid Creadentials')
		return res.redirect('back')
	} catch (e) {
		next(e)
	}
}
// Change Password System Of Administrator
exports.adminChangePasswordGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let category = await Category.find()

		let model = {
			admin,
			pages,
			category
		}

		pageRenderHandler(req,res,'changePassword','Change Password',null,model)
	} catch (e) {
		next(e)
	}
}
exports.adminChangePasswordPostController = async (req, res, next) => {
	let { oldPassword, newPassword, confirmPassword } = req.body

	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let category = await Category.find()

		let model = {
			admin,
			pages,	
			category
		}
		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			pageRenderHandler(req,res,'changePassword','Change Password',error.mapped(),model)
			return false 

		}

		let hashedPassword = await bcrypt.hash(newPassword, 11)
		if (!admin) {
			req.flash('fail', 'Please Login')
			return res.redirect('/auth/login')
		}
		if (admin.password !== 'admin') {
			let checkedPassword = await bcrypt.compare(oldPassword, admin.password)
			if (checkedPassword) {
				let updatedPassword = await Admin.findOneAndUpdate(
					{ _id: req.admin._id },
					{
						password: hashedPassword,
					},
					{
						new: true,
					}
				)
				if (updatedPassword) {
					req.flash('success', 'Sucessfully Updated Password')
					return res.redirect('back')
				}
				req.flash('fail', ' Internal Server Error')
				return res.redirect('back')
			}
			req.flash('fail', "Old Password Dosn't Matched")
			return res.redirect('back')

		}
		if (admin.password !== oldPassword) {
			req.flash('fail', "Old Password Dosn't Matched")
			return res.redirect('back')
		}
		if (newPassword === confirmPassword && newPassword.length >= 5 <= 16 && confirmPassword.length >= 5 <= 16) {
			let updatedPassword = await Admin.findOneAndUpdate(
				{ _id: req.admin._id },
				{
					password: hashedPassword,
				},
				{
					new: true,
				}
			)
			if (updatedPassword) {
				req.flash('success', 'Successfully Updated Password')
				return res.redirect('back')
			}
			req.flash('fail', 'Internal Server Error')
			return res.redirect('back')
		}
		req.flash('fail', 'Invalid Creadentials')
		return res.redirect('back')
	} catch (e) {
		next(e)
	}
}
// Administrator Logout Handlerer
exports.adminLogoutGetController = (req, res, next) => {

	delete req.session.admin
	delete req.session.isLoggedIn

	// Logout for I used this method for remove specific user form session 
	req.session.save(function(err) {
		if(err){
			next(err)
		}
		res.redirect('/auth/login')
	})

	// When use a destroy method then it will be deleted user and admin from the session. That's why login user or admin when wanted logout then anyone clicks on logout button then removes user and admin deleted from the session

	// req.session.destroy(error => {
	// 	if (error) {
	// 		return next(error)
	// 	}
	// })
}
