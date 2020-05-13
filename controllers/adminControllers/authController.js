const Admin = require('../../models/Admin')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')

exports.adminLoginGetController = (req, res, next) => {
	res.render('pages/administrator/login.ejs', {
		title: 'Administrator Login',
		style: 'bg-dark',
		error: {},
		flashMessage: {},
	})
}
exports.adminLoginPostController = async (req, res, next) => {
	let { email, password } = req.body
	let error = validationResult(req).formatWith(err => err.msg)
	if (!error.isEmpty()) {
		req.flash('fail', 'Wrong Information')
		return res.render('pages/administrator/login.ejs', {
			title: 'Wrong Info',
			style: 'bg-dark',
			error: error.mapped(),
			flashMessage: req.flash(),
		})
	}
	try {
		let admin = await Admin.findOne({ email })
		// If Admin Not Founded In Database Then Work This Condition
		if (!admin) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/login.ejs', {
				title: 'Admin Not Founded',
				style: 'bg-dark',
				error: {},
				flashMessage: req.flash(),
			})
		}

		// If Administrator Password Dose Not (admin) Then Work This Condition
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
			return res.render('pages/administrator/login.ejs', {
				title: 'Bcrypt Pass And Em Not Macthed',
				style: 'bg-dark',
				error: {},
				flashMessage: req.flash(),
			})
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
		return res.render('pages/administrator/login.ejs', {
			title: 'Default Password Login Failed',
			style: 'bg-dark',
			error: {},
			flashMessage: req.flash(),
		})
	} catch (e) {
		next(e)
	}
}
// Change Password System Of Administrator
exports.adminChangePasswordGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({_id:req.admin._id})
		res.render('pages/administrator/changePassword.ejs', {
			title: 'Change-Password',
			style: 'bg-light',
			error: {},
			data:admin,
			flashMessage: {},
		})
	} catch (e) {
		next(e)
	}
}
exports.adminChangePasswordPostController = async (req, res, next) => {
	let { oldPassword, newPassword, confirmPassword } = req.body

	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let error = validationResult(req).formatWith(err => err.msg)
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/changePassword.ejs', {
				title: 'Change-Password',
				style: 'bg-light',
				error: error.mapped(),
				data: admin,
				flashMessage: req.flash(),
			})
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
					return res.render('pages/administrator/changePassword.ejs', {
						title: 'Updated Password',
						style: 'bg-light',
						data: admin,
						error: {},
						flashMessage: req.flash(),
					})
				}
				req.flash('fail', ' Internal Server Error')
				return res.render('pages/administrator/changePassword.ejs', {
					title: 'Internal Server Error',
					style: 'bg-light',
					error: {},
					data: admin,
					flashMessage: req.flash(),
				})
			}
			req.flash('fail', "Old Password Dosn't Matched")
			return res.render('pages/administrator/changePassword.ejs', {
				title: "Old Password Dosn't Matched",
				style: 'bg-light',
				error: {},
				data: admin,
				flashMessage: req.flash(),
			})
		}
		if (admin.password !== oldPassword) {
			req.flash('fail', "Old Password Dosn't Matched")
			return res.render('pages/administrator/changePassword.ejs', {
				title: 'Change-Password',
				style: 'bg-light',
				error: {},
				data: admin,
				flashMessage: req.flash(),
			})
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
				return res.render('pages/administrator/changePassword.ejs', {
					title: 'Updated Password',
					style: 'bg-light',
					error: {},
					data: admin,
					flashMessage: req.flash(),
				})
			}
			req.flash('fail', 'Internal Server Error')
			return res.render('pages/administrator/changePassword.ejs', {
				title: 'Internal Server Error',
				style: 'bg-light',
				error: {},
				data: admin,
				flashMessage: req.flash(),
			})
		}
		req.flash('fail', 'Invalid Creadentials')
		return res.render('pages/administrator/changePassword.ejs', {
			title: 'Invalid Creadentials',
			style: 'bg-light',
			error: {},
			data: admin,
			flashMessage: req.flash(),
		})
	} catch (e) {
		next(e)
	}
}

// Administrator Logout Handlerer
exports.adminLogoutGetController = (req, res, next) => {
	req.session.destroy(error => {
		if (error) {
			return next(error)
		}

		res.redirect('/auth/login')
	})
}