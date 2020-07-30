const router = require('express').Router()


// All Imported Middlewares
const {
    isUnAuthenticatedUser
}  = require('../../middlewares/adminAuthMiddleware')
// All Imported Controllers
const {
    userLoginGetController,
    userLoginPostController,
    userLogoutGetController
} = require('../../controllers/users/authController')


router.get('/auth/login',isUnAuthenticatedUser,userLoginGetController)

router.post('/auth/login',userLoginPostController)

router.get('/auth/logout',userLogoutGetController)

module.exports = router 