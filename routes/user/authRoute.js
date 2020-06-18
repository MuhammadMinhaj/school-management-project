const router = require('express').Router()


// All Imported Middlewares
const {
    isUnAuthenticatedUser
}  = require('../../middlewares/adminAuthMiddleware')
// All Imported Controllers
const {
    userLoginGetController,
    userLoginPostController
} = require('../../controllers/users/authController')


router.get('/auth/login',isUnAuthenticatedUser,userLoginGetController)

router.post('/auth/login',userLoginPostController)

module.exports = router 