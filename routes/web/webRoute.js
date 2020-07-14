const router = require('express').Router()

// Imported All Controllers Of Web Related
const {
    resultsPublicationGetController,
    aboutAdministrationInfoGetController
} = require('../../controllers/web/webController')


router.get('/administration',aboutAdministrationInfoGetController)
router.get('/result',resultsPublicationGetController)

module.exports = router