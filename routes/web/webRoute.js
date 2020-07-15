const router = require('express').Router()

// Imported All Controllers Of Web Related
const {
    resultsPublicationGetController,
    aboutAdministrationInfoGetController,
    aboutTeachersInfoGetController
} = require('../../controllers/web/webController')


router.get('/administration',aboutAdministrationInfoGetController)
router.get('/result',resultsPublicationGetController)

router.get('/teachers',aboutTeachersInfoGetController)

module.exports = router