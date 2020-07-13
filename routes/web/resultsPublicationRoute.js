const router = require('express').Router()


// Imported Controllers 
const {
    resultsPublicationGetController
} = require('../../controllers/web/resultsPublicationController')
const { resultsManagementGetController } = require('../../controllers/adminControllers/resultManagementController')


router.get('/',resultsPublicationGetController)

module.exports = router 