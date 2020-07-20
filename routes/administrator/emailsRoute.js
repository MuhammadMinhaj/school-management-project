const router = require('express').Router()

// Middlewares Imported
const {
    isAuthenticatedAdmin
} = require('../../middlewares/adminAuthMiddleware')

// Controllers Imported
const {
    emailsManagementGetController,
    emailsDeleteGetController,
    sentMailsPostController,
    contactStatusGetController
} = require('../../controllers/adminControllers/emailsController')


router.get('/emails',isAuthenticatedAdmin,emailsManagementGetController)
router.get('/email/delete/:id',isAuthenticatedAdmin,emailsDeleteGetController)
router.post('/email/sent/:id',isAuthenticatedAdmin,sentMailsPostController)
router.get('/contact',isAuthenticatedAdmin,contactStatusGetController)

module.exports = router