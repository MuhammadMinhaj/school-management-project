const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const Admin = require('../../models/Admin')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')

exports.forgotPasswordGetController = (req, res, next) => {
	res.render('pages/administrator/forgotPassword.ejs', {
		title: 'Forgot-Password',
		style: 'bg-light',
		error: {},
		flashMessage: {},
	})
}
exports.forgotPasswordPostController = async (req, res, next) => {
	let { email } = req.body
	let error = validationResult(req).formatWith(err => err.msg)
	if (!error.isEmpty()) {
		req.flash('fail', 'Invalid Creadentials')
		return res.render('pages/administrator/forgotPassword.ejs', {
			title: 'Forgot-Password',
			style: 'bg-light',
			error: error.mapped(),
			data: email,
			flashMessage: req.flash(),
		})
	}
	// ANCHOR Cheked Is Email Found Or Not
	try {
		let admin = await Admin.findOne({ email: email })
		if (!admin) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/forgotPassword.ejs', {
				title: 'Forgot-Password',
				style: 'bg-light',
				error: {},
				data: email,
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
		if (sendMailToClint.response) {
			console.log('Success')
		} else {
			console.log('Fail')
		}
		res.render('pages/administrator/confirmationEmail.ejs', {
			title: 'Confirmation Email',
			style: 'bg-light',
			error: {},
			flashMessage: {},
		})
	} catch (e) {
		next(e)
	}
}
exports.resetPasswordGetController = (req, res, next) => {
	res.render('pages/administrator/resetPassword.ejs', {
		title: 'Reset Password',
		style: 'bg-light',
		error: {},
		flashMessage: {},
		url: req.originalURL,
	})
}
exports.resetPasswordPostController = async (req, res, next) => {
	let error = validationResult(req).formatWith(err => err.msg)
	if (!error.isEmpty()) {
		req.flash('fail', 'Invalid Creadentials')
		return res.render('pages/administrator/resetPassword.ejs', {
			title: 'Reset Password',
			style: 'bg-light',
			error: error.mapped(),
			flashMessage: req.flash(),
			url: req.originalURL,
		})
	}
	try {
		let { password } = req.body
		let token = req.params.resetId
		jwt.verify(token, 'minhajislam', async (err, info) => {
			if (err) {
				req.flash('fail', 'Reset password token has expired,Please try to new request')
				return res.render('pages/administrator/resetPassword.ejs', {
					title: 'Reset Password',
					style: 'bg-light',
					error: {},
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