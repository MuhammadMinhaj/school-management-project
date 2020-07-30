const router = require('express').Router()

const uploads = require('../../middlewares/uploadMIddleware')
// All Middleware Imported
const {
    isAuthenticatedUser
} = require('../../middlewares/adminAuthMiddleware')

// All Controller Imported

const {
    userDashboardGetController,
    userProfileGetController,
    userProfileUpdatePostController,
    userChangePasswordPostController
} = require('../../controllers/users/dashboardController')



router.get('/dashboard',isAuthenticatedUser,userDashboardGetController)
router.get('/profile',isAuthenticatedUser,userProfileGetController)
router.post('/profile/update/:id',isAuthenticatedUser,uploads.single('picture'),userProfileUpdatePostController)
router.post('/profile/change/password/:id',isAuthenticatedUser,userChangePasswordPostController)

module.exports = router 