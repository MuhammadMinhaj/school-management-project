const router = require('express').Router()
// All Imported Middlewares
const {
    isUnAuthenticatedUser
}  = require('../../middlewares/adminAuthMiddleware')
// All Imported Controllers
const {
    userLoginGetController,
    userLoginPostController,
    userLogoutGetController,
    forgotPasswordGetController,
    forgotPasswordPostController,
    resetPasswordGetController,
    resetPasswordPostController
} = require('../../controllers/users/authController')


router.get('/auth/login',isUnAuthenticatedUser,userLoginGetController)

router.post('/auth/login',userLoginPostController)

router.get('/auth/logout',userLogoutGetController)

router.get('/auth/forgot_password',isUnAuthenticatedUser,forgotPasswordGetController)
router.post('/auth/forgot_password',isUnAuthenticatedUser,forgotPasswordPostController)
router.get('/auth/reset_password/:token',isUnAuthenticatedUser,resetPasswordGetController)
router.post('/auth/reset_password/:token',isUnAuthenticatedUser,resetPasswordPostController)
module.exports = router 