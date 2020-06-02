const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

const Admin = require('../../models/Admin')
const Menu = require('../../models/Menu')
const WebModel = require('../../models/WebModel')
exports.forgotPasswordGetController = async (req, res, next) => {
	try {
		let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		res.render('pages/administrator/forgotPassword.ejs', {
			title: 'Forgot-Password',
			style: 'bg-light',
			error: {},
			menu,
			flashMessage: {},
			webModel
		})
	} catch (e) {
		next(e)
	}
}
exports.forgotPasswordPostController = async (req, res, next) => {
	try {
		let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		let { email } = req.body
		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/forgotPassword.ejs', {
				title: 'Forgot-Password',
				style: 'bg-light',
				error: error.mapped(),
				data: email,
				menu,
				flashMessage: req.flash(),
				webModel
			})
		}
		// ANCHOR Cheked Is Email Found Or Not
		let admin = await Admin.findOne({ email: email })
		if (!admin) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/forgotPassword.ejs', {
				title: 'Forgot-Password',
				style: 'bg-light',
				error: {},
				data: email,
				menu,
				webModel,
				flashMessage: req.flash(),
			})
		}
		let token = jwt.sign({ email: admin.email, id: admin._id }, 'minhajislam', {
			expiresIn: '1h',
		})
		// ANCHOR Reset Password Confirmation Email Sent To Server in Clint
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'test.projects24@gmail.com',
				pass: 'mdminhaj24ctg24',
			},
		})
		let sendMailToClint = await transporter.sendMail({
			from: 'test.projects24@gmail.com',
			to: 'mdminhajctg24@gmail.com',
			subject: '[JASA] Confirmation Link Of Reset Password',

			html: `
			<P>We heard that you lost your Administrator password. Sorry about that!</P>
			<p>But don’t worry! You can use the following link to reset your password:</p>
			<a href="http://localhost:8080/auth/reset_password/${token}">http://localhost:8080/auth/reset_password/${token}</a>
			
			<p>If you don’t use this link within 1 hours, it will expire. To get a new password reset link, visit <a href="http://localhost:8080/auth/forgot_password">http://localhost:8080/auth/forgot_password</a> </p>
			<p>
			Thanks,<br/>
			The JASA Edu
			</p>
			`,
		})
		// Need to Handler this Error

		if (sendMailToClint.response) {
			console.log('Success')
		} else {
			console.log('Fail')
		}
		res.render('pages/administrator/confirmationEmail.ejs', {
			title: 'Confirmation Email',
			style: 'bg-light',
			error: {},
			menu,
			webModel,
			flashMessage: {},
		})
	} catch (e) {
		next(e)
	}
}
exports.resetPasswordGetController = async (req, res, next) => {
	try {
		let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		res.render('pages/administrator/resetPassword.ejs', {
			title: 'Reset Password',
			style: 'bg-light',
			error: {},
			menu,
			webModel,
			flashMessage: {},
			url: req.originalURL,
		})
	} catch (e) {
		next(e)
	}
}
exports.resetPasswordPostController = async (req, res, next) => {
	try {
		let menu = await Menu.find()
		let webModel = await WebModel.findOne()
		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/resetPassword.ejs', {
				title: 'Reset Password',
				style: 'bg-light',
				error: error.mapped(),
				menu,
				webModel,
				flashMessage: req.flash(),
				url: req.originalURL,
			})
		}

		let { password } = req.body
		let token = req.params.resetId
		jwt.verify(token, 'minhajislam', async (err, info) => {
			if (err) {
				req.flash('fail', 'Reset password token has expired,Please try to new request')
				return res.render('pages/administrator/resetPassword.ejs', {
					title: 'Reset Password',
					style: 'bg-light',
					error: {},
					menu,
					webModel,
					flashMessage: req.flash(),
					url: req.originalURL,
				})
			}
			if (info) {
				let { email, id } = info
				let admin = await Admin.findOne({ _id: id, email: email })
				if (!admin) {
					req.flash('fail', 'Admin is not founded')
					return res.render('pages/administrator/resetPassword.ejs', {
						title: 'Reset Password',
						style: 'bg-light',
						error: {},
						menu,
						webModel,
						flashMessage: req.flash(),
						url: req.originalURL,
					})
				}
				let hashedPassword = await bcrypt.hash(password, 11)
				let updatedPassword = await Admin.findOneAndUpdate(
					{ _id: id, email: email },
					{
						password: hashedPassword,
					}
				)
				if (!updatedPassword) {
					req.flash('fail', 'Internal Server Error')
					return res.render('pages/administrator/resetPassword.ejs', {
						title: 'Reset Password',
						style: 'bg-light',
						error: {},
						menu,
						webModel,
						flashMessage: req.flash(),
						url: req.originalURL,
					})
				}
				req.flash('success', 'Successfully Updated Password.Please Login Now')
				res.redirect('/auth/login')
			}
		})
	} catch (e) {
		next(e)
	}
}
