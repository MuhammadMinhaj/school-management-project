const router = require('express').Router()
const adminLoginValidator = require('../validators/admin/loginValidator')
const adminChangePasswordValidator = require('../validators/admin/changePasswordValidator')
const { 
    adminLoginGetController,
    adminLoginPostController,
    adminChangePasswordGetController,
    adminChangePasswordPostController,
    adminLogoutGetController
} = require('../controllers/adminControllers/authController')

const { 
    isAuthenticatedAdmin,
    isUnauthenticatedAdmin
 } = require('../middlewares/adminAuthMiddleware')

router.get('/login', isUnauthenticatedAdmin, adminLoginGetController)
router.post('/login', isUnauthenticatedAdmin, adminLoginValidator, adminLoginPostController)

router.get('/change-password',isAuthenticatedAdmin,adminChangePasswordGetController)
router.post('/change-password',isAuthenticatedAdmin,adminChangePasswordValidator,adminChangePasswordPostController)



router.get('/logout',isAuthenticatedAdmin,adminLogoutGetController)

module.exports = router
