const { route } = require('../user/authRoute')

const router = require('express').Router()

// Imported All Middlewares
const {
    isAuthenticatedAdmin
} = require('../../middlewares/adminAuthMiddleware')
// Imported All Controllers
const {
    resultsManagementGetController,
    showAllResultsGetController,
    resultsPublishedReqApproveGetController,
    resultsPublishedReqRejectGetController,
    resultPublishedReqDeleteGetController,
    resultsPublishedAndUnPublishedPostController
} = require('../../controllers/adminControllers/resultManagementController')



router.get('/results/management',isAuthenticatedAdmin,resultsManagementGetController)
router.get('/results/all/show/:id',isAuthenticatedAdmin,showAllResultsGetController)

router.get('/results/request/approve/:id',isAuthenticatedAdmin,resultsPublishedReqApproveGetController)
router.get('/results/request/reject/:id',isAuthenticatedAdmin,resultsPublishedReqRejectGetController)
router.get('/results/request/delete/:id',isAuthenticatedAdmin,resultPublishedReqDeleteGetController)

router.post('/results/web/view/:id',isAuthenticatedAdmin,resultsPublishedAndUnPublishedPostController)

module.exports = router