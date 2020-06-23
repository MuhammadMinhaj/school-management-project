const router = require('express').Router()


// Imported All Middlewares
const {
    isAuthenticatedUser, 
} = require('../../middlewares/adminAuthMiddleware')

// Imported All Controllers 
const {
   resultGetController,
   createResultPostController
} = require('../../controllers/users/resultController')


router.get('/results/create/:classid',isAuthenticatedUser,resultGetController)
router.post('/results/create/:classid/:studentid',isAuthenticatedUser,createResultPostController)

module.exports = router 