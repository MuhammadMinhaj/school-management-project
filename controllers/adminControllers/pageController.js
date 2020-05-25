let Admin = require('../../models/Admin')
let Menu = require('../../models/Menu')
let Page = require('../../models/Page')

let { validationResult } = require('express-validator')

exports.pageCreateGetController = async (req, res, next) => {
	try {
		let hasAdminWithReq = await Admin.findOne({ _id: req.admin._id })
		if (!hasAdminWithReq) {
			return res.redirect('/auth/login')
		}
		let menu = await Menu.find()

		let pages = await Page.find()
		res.render('pages/administrator/createPage.ejs', {
			title: 'Create Menu',
			style: 'bg-light',
			data: req.admin,
			flashMessage: req.flash(),
			menu,
			pages,
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
		if (!error.isEmpty()) {
			req.flash('fail', 'Invalid Creadentials')
			return res.render('pages/administrator/createPage.ejs', {
				title: 'Create Menu',
				style: 'bg-light',
				data: req.admin,
				flashMessage: req.flash(),
				menu,
				pages,
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
