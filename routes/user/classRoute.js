const router = require('express').Router()


// Imported Middlawares 
const {
    isAuthenticatedUser
} = require('../../middlewares/adminAuthMiddleware')

// Imported Controllers 
const {
    createClassGetController,
    createClassPostController
} = require('../../controllers/users/classController') 

router.get('/class/create',isAuthenticatedUser,createClassGetController)
router.post('/class/create',isAuthenticatedUser,createClassPostController)
module.exports = router 