const router = require('express').Router()

// Import All Authentication Validators
const adminLoginValidator = require('../../validators/admin/loginValidator')
const adminChangePasswordValidator = require('../../validators/admin/changePasswordValidator')
const forgotPasswordEmailValidator = require('../../validators/admin/forgotPasswordEmailValidator')
const resetPasswordValidator = require('../../validators/admin/resetPasswordValidator')

const {
	adminLoginGetController,
	adminLoginPostController,
	adminChangePasswordGetController,
	adminChangePasswordPostController,
	adminLogoutGetController,
} = require('../../controllers/adminControllers/authController')
// Forgot Passsowrd
const {
	forgotPasswordGetController,
	forgotPasswordPostController
} = require('../../controllers/adminControllers/forgotPassword')

const {
	resetPasswordGetController,
	resetPasswordPostController
} = require('../../controllers/adminControllers/forgotPassword')

const { isAuthenticatedAdmin, isUnauthenticatedAdmin, isAuthenticatedSecurity } = require('../../middlewares/adminAuthMiddleware')

router.get('/login', isUnauthenticatedAdmin, adminLoginGetController)
router.post('/login', isUnauthenticatedAdmin, adminLoginValidator, adminLoginPostController)

router.get('/change-password', isAuthenticatedAdmin, isAuthenticatedSecurity,adminChangePasswordGetController)
router.post('/change-password', isAuthenticatedAdmin, adminChangePasswordValidator, adminChangePasswordPostController)

router.get('/forgot_password',forgotPasswordGetController)
router.post('/forgot_password',forgotPasswordEmailValidator,forgotPasswordPostController)

router.get('/reset_password/:resetId',resetPasswordGetController)
router.post('/reset_password/:resetId',resetPasswordValidator,resetPasswordPostController)


router.get('/logout', isAuthenticatedAdmin, adminLogoutGetController)

module.exports = router
