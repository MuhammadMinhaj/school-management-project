const router = require('express').Router()

// All Middleware Imported
const {
    isAuthenticatedUser
} = require('../../middlewares/adminAuthMiddleware')

// All Controller Imported

const {
    userDashboardGetController
} = require('../../controllers/users/dashboardController')





router.get('/dashboard',isAuthenticatedUser,userDashboardGetController)

module.exports = router 