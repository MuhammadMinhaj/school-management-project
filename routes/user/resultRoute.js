const router = require('express').Router()


// Imported All Middlewares
const {
    isAuthenticatedUser, isAuthenticatedAdmin, 
} = require('../../middlewares/adminAuthMiddleware')

// Imported All Controllers 
const {
   createResultGetController,
   createResultPostController,
   getAllResultsOfOneStudentGetController,
   editResultGetController,
   editResultPostController,
   deleteResultGetController,

   dividedPassedAndFailedResultController,
   allCreateResultsController,
   updateAllResultsGetController,
   resultsRankController,
   allPassedResultsGetController,
   allFailedResultsGetController,

   resultsSubmitToAdminGetController,
   resultsPublishedStatusGetController,
   resultSPublishedRequestDelete
} = require('../../controllers/users/resultController')


router.get('/results/create/:classid',isAuthenticatedUser,createResultGetController)
router.post('/results/create/:classid/:studentid',isAuthenticatedUser,createResultPostController)
router.get('/student/all/results/:id',isAuthenticatedUser,getAllResultsOfOneStudentGetController)

router.get('/result/edit/:id',isAuthenticatedUser,editResultGetController)
router.post('/result/edit/:id',isAuthenticatedUser,editResultPostController)
router.get('/result/delete/:id',isAuthenticatedUser,deleteResultGetController)


router.get('/results/all/divied/:id',isAuthenticatedUser,dividedPassedAndFailedResultController)
router.get('/results/all/create/:id',isAuthenticatedUser,allCreateResultsController)
router.get('/results/all/update/:id',isAuthenticatedUser,updateAllResultsGetController)

router.get('/results/all/rank/:id',isAuthenticatedUser,resultsRankController)

router.get('/results/all/passed/:id',isAuthenticatedUser,allPassedResultsGetController)
router.get('/results/all/failed/:id',isAuthenticatedUser,allFailedResultsGetController)

router.get('/results/published/request/:id',isAuthenticatedUser,resultsSubmitToAdminGetController)

router.get('/results/published/status',isAuthenticatedUser,resultsPublishedStatusGetController)


router.get('/results/published/request/delete/:id',isAuthenticatedUser,resultSPublishedRequestDelete)

module.exports = router 