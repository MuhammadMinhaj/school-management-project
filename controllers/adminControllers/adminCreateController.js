const { validationResult } = require('express-validator')
const bcrypt = require('bcrypt')
const Admin = require('../../models/Admin')

exports.adminCreateGetController = async (req, res, next) => {
		if(!req.session.isLoggedIn||!req.admin){
			return res.redirect('/auth/login')
		}
	try {
		let checkAdmin = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!checkAdmin) {
			return res.redirect('/auth/login')
		}
		res.render('pages/administrator/adminCreateAccount.ejs', {
			title: 'Create Admin',
			style: 'bg-light',
			error: {},
			flashMessage: {},
			data: req.admin,
		})
	} catch (e) {
		next(e)
	}
}
exports.contactsAdminGetController = async (req, res, next) => {
	try {
		let checkAdmin = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!checkAdmin) {
			return res.redirect('/auth/login')
		}
		let contactAdmins = await Admin.find()
		let contacts = []
		contactAdmins.forEach(d => {
			let contact = {
				id: d._id,
				name: d.name,
				email: d.email,
				phone: d.phone,
				gender: d.gender,
				birthday: d.dateOfBirthday,
			}
			contacts.push(contact)
		})
		res.status(200).json(contacts)
	} catch (e) {
		next(e)
	}
}
exports.contactsAdminDeleteController = async (req, res, next) => {
	try {
		let { id } = req.params
		let admin = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!admin) {
			req.flash('fail', 'Please Login')
			return redirect('/auth/login')
		}
		if (id === req.admin._id) {
			return req.session.destroy(async err => {
				if (err) {
					res.json({ message: 'Error Occurred' })

				}
				await Admin.findOneAndRemove({_id:id})
				res.redirect('/auth/login')
			})
		} else {
		}
		let deleteAdmin = await Admin.findOneAndRemove({ _id: id })
		if (!deleteAdmin) {
			return res.status(500).json({ message: 'Internal Server Error' })
		}
		res.redirect('/auth/login')
	} catch (e) {
		next(e)
	}
}
exports.adminCreatePostController = async (req, res, next) => {
	let { name, username, email, phone, password, birthday, gender } = req.body

	// Validation Error Check
	let error = validationResult(req).formatWith(err => err.msg)
	if (!error.isEmpty()) {
		req.flash('fail', 'Invalid Creadentials')
		return res.render('pages/administrator/adminCreateAccounr.ejs', {
			title: 'Create Admin',
			style: 'bg-light',
			error: error.mapped(),
			flashMessage: req.flash(),
			data: req.admin,
		})
	}
	try {
		let admin = await Admin.findOne({ _id: req.admin._id, email: req.admin.email })
		if (!admin) {
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
			return res.render('pages/administrator/adminCreateAccounr.ejs', {
				title: 'Create Admin',
				style: 'bg-light',
				error: {},
				flashMessage: req.flash(),
				data: req.admin,
			})
		}
		res.json({
			message: 'Successfully Created Admin',
			id: createdAdmin._id,
			name: createdAdmin.name,
			email: createdAdmin.email,
			phone: createdAdmin.phone,
			birthday: createdAdmin.dateOfBirthday,
			gender: createdAdmin.gender,
		})
	} catch (e) {
		next(e)
	}
}
