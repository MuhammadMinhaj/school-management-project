const Admin = require('../models/Admin')
exports.bindAdminWithRequest = () => {
	return async (req, res, next) => {
		if (!req.session.isLoggedIn) {
			return next()
		}
		try {
			let admin = await Admin.findOne({ _id: req.session.admin._id })
			req.admin = admin
			next()
		} catch (e) {
			next(e)
		}
	}
}
exports.isAuthenticatedAdmin = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return res.redirect('/auth/login')
	}
	next()
}
exports.isUnauthenticatedAdmin = (req, res, next) => {
	if (req.session.isLoggedIn) {
		return res.redirect('/administrator/dashboard')
	}
	next()
}
exports.isAuthenticatedSecurity = (req, res, next) => {
	if (!req.session.isSecurityLoggedIn) {
		return res.redirect('/administrator/login-security-password')
	}
	next()
}
exports.isUnauthenticatedSecurity = (req, res, next) => {
	if (req.session.isSecurityLoggedIn) {
		return res.redirect('/administrator/account')
	}
	next()
}
