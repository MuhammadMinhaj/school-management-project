const router = require('express').Router()

// Validator Of Administrator Account Form
const accountValidator = require('../../validators/admin/accountValidator')
// Validator Of Administrator Security Password
const securityPasswordValidator = require('../../validators/admin/securityPasswordValidator')
// Login Security Password Validator


// Admin Create Validator
const adminCreateValidator = require('../../validators/admin/createAdminValidator')
// created Admin Update Validator 
const createdAdminUpdateValidator = require('../../validators/admin/createdAdminUpdateValidator')

// Import All Controller of Administrator


// Import Authentication
const { isAuthenticatedAdmin, isAuthenticatedSecurity, isUnauthenticatedSecurity } = require('../../middlewares/adminAuthMiddleware')

const { 
	adminDashboardGetController,
	dashboradNoticePostController,
	clearNoticeGetController
 } = require('../../controllers/adminControllers/dashboardController')

// ANCHOR Administrator Some Functionality Controller
const {
	adminAccountGetController,
	adminAccountPostController,
	createAdminSecurityPasswordGetController,
	createAdminSecurityPasswordPostController,
	loginAdminSecurityPasswordGetController,
	loginAdminSecurityPasswordPostController,
} = require('../../controllers/adminControllers/adminController')
// ANCHOR Administrator Create
const { 
		createAdminGetController,
		createAdminPostController, 
		createdAdminDeleteController,
		createdAdminUpdateGetController,
		createdAdminUpdateController 
	} = require('../../controllers/adminControllers/createAccount')

router.get('/dashboard', isAuthenticatedAdmin, adminDashboardGetController)
router.post('/dashboard/notice', isAuthenticatedAdmin, dashboradNoticePostController)
router.get('/dashboard/notice/clear', isAuthenticatedAdmin, clearNoticeGetController)

router.get('/security-password', isAuthenticatedAdmin, createAdminSecurityPasswordGetController)
router.post('/security-password', isAuthenticatedAdmin, securityPasswordValidator, createAdminSecurityPasswordPostController)

router.get('/login-security-password', isAuthenticatedAdmin, isUnauthenticatedSecurity, loginAdminSecurityPasswordGetController)
router.post('/login-security-password', isAuthenticatedAdmin, loginAdminSecurityPasswordPostController)

router.get('/account', isAuthenticatedAdmin, isAuthenticatedSecurity, adminAccountGetController)
router.post('/account', isAuthenticatedAdmin, accountValidator, adminAccountPostController)

router.get('/create', isAuthenticatedAdmin, createAdminGetController)
router.get('/delete/:id', isAuthenticatedAdmin, createdAdminDeleteController)
router.post('/create', isAuthenticatedAdmin, adminCreateValidator, createAdminPostController)
router.get('/update/:id',isAuthenticatedAdmin,createdAdminUpdateGetController)
router.post('/update/:id',isAuthenticatedAdmin,createdAdminUpdateValidator,createdAdminUpdateController)


module.exports = router
