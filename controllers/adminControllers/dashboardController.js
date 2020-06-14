const Admin = require('../../models/Admin')
const Page = require('../../models/Page')
const WebModel = require('../../models/WebModel')
// Administrator Dashboard
exports.adminDashboardGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		let webModel = await WebModel.findOne()
		res.render('pages/administrator/dashboard.ejs', {
			style: 'bg-light',
			title: 'Administrator Dashboard',
			data: admin,
			flashMessage: req.flash(),
			pages,
			webModel,
			createdPage:{},
		})
	} catch (e) {
		next(e)
	}
}
