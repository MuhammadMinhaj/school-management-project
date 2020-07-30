const Admin = require('../models/Admin')
const User = require('../models/User')
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
exports.isAuthenticatedSecurity = async(req, res, next) => {
	if (!req.session.isSecurityLoggedIn) {
		try{
			let admin = await Admin.findOne({_id:req.admin._id})
			if(admin.securityPassword){
				
				return res.redirect('/administrator/login-security-password')
			}else{
				return next()
			}
		}catch(e){
			return next(e)
		}
	}
	next()
}
exports.isUnauthenticatedSecurity = (req, res, next) => {
	if (req.session.isSecurityLoggedIn) {
		return res.redirect('/administrator/account')
	}
	next()
}

// User Authentication 

exports.bindUserWithRequest = ()=>{
	return async(req,res,next)=>{
		if(!req.session.userIsLoggedIn){
			return next()
		}
		try{	
			let user  = await User.findOne({_id:req.session.user._id})
			if(user){
				req.user = user||null
			}
			next()
		}catch(e){
			next(e)
		}	
	}
}
exports.isAuthenticatedUser = (req,res,next)=>{
	if(!req.session.userIsLoggedIn){
		return res.redirect('/user/auth/login')
	}
	
	next()
	
}
exports.isUnAuthenticatedUser = (req,res,next)=>{
	if(req.session.userIsLoggedIn){
		res.redirect('/user/dashboard')
	}
	next()
}