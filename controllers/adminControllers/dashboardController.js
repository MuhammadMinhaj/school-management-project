const Admin = require('../../models/Admin')
// Administrator Dashboard
exports.adminDashboardGetController = async (req, res, next) => {
	try {
		let admin = await Admin.findOne({ _id: req.admin._id })
		res.render('pages/administrator/dashboard.ejs', {
			style: 'bg-light',
			title: 'Administrator Dashboard',
			data: admin,
			flashMessage: req.flash(),
		})
	} catch (e) {
		next(e)
	}
}
