const Admin = require('../../models/Admin')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
const Category = require('../../models/Category')
// Administrator Dashboard
exports.adminDashboardGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		let category = await Category.find()
		res.render('pages/administrator/dashboard.ejs', {
			style: 'bg-light',
			title: 'Administrator Dashboard',
			data: admin,
			flashMessage: req.flash(),
			pages,
			webModel,
			createdPage:{},
			category,
		})
	} catch (e) {
		next(e)
	}
}
