const router = require('express').Router()


// Imported All Middlewares
const {
    isAuthenticatedUser, 
} = require('../../middlewares/adminAuthMiddleware')

// Imported All Controllers 
const {
   resultGetController,
   createResultPostController,
   editResultGetController,
   editResultPostController
} = require('../../controllers/users/resultController')


router.get('/results/create/:classid',isAuthenticatedUser,resultGetController)
router.post('/results/create/:classid/:studentid',isAuthenticatedUser,createResultPostController)
router.get('/result/edit/:id',isAuthenticatedUser,editResultGetController)
router.post('/result/edit/:id',isAuthenticatedUser,editResultPostController)

module.exports = router 