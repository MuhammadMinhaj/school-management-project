const router = require('express').Router()

// Validator Of Administrator Account Form
const accountValidator = require('../validators/admin/accountValidator')
// Validator Of Administrator Security Password 
const securityPasswordValidator = require('../validators/admin/securityPasswordValidator')
// Import All Controller of Administrator
const { 
    isAuthenticatedAdmin
} = require('../middlewares/adminAuthMiddleware')

const { 
    adminDashboardGetController
} = require('../controllers/adminControllers/dashboardController')
const {
    adminAccountGetController,
    adminAccountPostController,
    createAdminSecurityPasswordGetController,
    createAdminSecurityPasswordPostController

} = require('../controllers/adminControllers/adminController')



router.get('/dashboard', isAuthenticatedAdmin, adminDashboardGetController)

router.get('/security-password',isAuthenticatedAdmin,createAdminSecurityPasswordGetController)
router.post('/security-password',isAuthenticatedAdmin,securityPasswordValidator,createAdminSecurityPasswordPostController)

router.get('/account',isAuthenticatedAdmin,adminAccountGetController)
router.post('/account',isAuthenticatedAdmin,accountValidator,adminAccountPostController)

module.exports = router
