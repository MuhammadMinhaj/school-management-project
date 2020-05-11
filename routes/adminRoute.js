const router = require('express').Router()

// Validator Of Administrator Account Form
const accountValidator = require('../validators/admin/accountValidator')
// Validator Of Administrator Security Password
const securityPasswordValidator = require('../validators/admin/securityPasswordValidator')
// Login Security Password Validator
const loginSecurityPasswordValidator = require('../validators/admin/loginSecurityPasswordValidator')

// Import All Controller of Administrator
const { 
	isAuthenticatedAdmin,
	isAuthenticatedSecurity,
	isUnauthenticatedSecurity 
} = require('../middlewares/adminAuthMiddleware')

const { adminDashboardGetController } = require('../controllers/adminControllers/dashboardController')
const {
	adminAccountGetController,
	adminAccountPostController,
	createAdminSecurityPasswordGetController,
	createAdminSecurityPasswordPostController,
	loginAdminSecurityPasswordGetController,
	loginAdminSecurityPasswordPostController,
} = require('../controllers/adminControllers/adminController')

router.get('/dashboard', isAuthenticatedAdmin, adminDashboardGetController)

router.get('/security-password', isAuthenticatedAdmin, createAdminSecurityPasswordGetController)
router.post('/security-password', isAuthenticatedAdmin, securityPasswordValidator, createAdminSecurityPasswordPostController)

router.get('/login-security-password', isAuthenticatedAdmin,isUnauthenticatedSecurity,loginAdminSecurityPasswordGetController)
router.post('/login-security-password', isAuthenticatedAdmin, loginSecurityPasswordValidator,loginAdminSecurityPasswordPostController)

router.get('/account', isAuthenticatedAdmin, isAuthenticatedSecurity,adminAccountGetController)
router.post('/account', isAuthenticatedAdmin, accountValidator, adminAccountPostController)

module.exports = router
