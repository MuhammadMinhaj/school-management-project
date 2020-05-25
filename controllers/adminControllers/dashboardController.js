const Admin = require('../../models/Admin')
const Page = require('../../models/Page')
// Administrator Dashboard
exports.adminDashboardGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		let pages = await Page.find()
		res.render('pages/administrator/dashboard.ejs', {
			style: 'bg-light',
			title: 'Administrator Dashboard',
			data: admin,
			flashMessage: req.flash(),
			pages,
			createdPage:{},
		})
	} catch (e) {
		next(e)
	}
}
