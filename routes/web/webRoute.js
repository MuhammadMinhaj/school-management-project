const router = require('express').Router()

// Imported All Controllers Of Web Related
const {
    resultsPublicationGetController,
    aboutAdministrationInfoGetController,
    aboutTeachersInfoGetController,
    aboutPageGetController,
    dynamicPageRenderGetController
} = require('../../controllers/web/webController')


router.get('/administration',aboutAdministrationInfoGetController)
router.get('/result',resultsPublicationGetController)

router.get('/teachers',aboutTeachersInfoGetController)

router.get('/about',aboutPageGetController)

router.get('/:pagename',dynamicPageRenderGetController)
module.exports = router

