const router = require('express').Router()

// Imported All Controllers Of Web Related
const {
    resultsPublicationGetController,
    aboutAdministrationInfoGetController,
    aboutTeachersInfoGetController,
    aboutPageGetController,
    librayPageGetController,
    missionAndVissionPageGetController,
    dynamicPageRenderGetController,
    contactPageGetController,
    contactPagePostController
} = require('../../controllers/web/webController')


router.get('/administration',aboutAdministrationInfoGetController)
router.get('/result',resultsPublicationGetController)

router.get('/teachers',aboutTeachersInfoGetController)

router.get('/about',aboutPageGetController)
router.get('/libray',librayPageGetController)
router.get('/mission&vission',missionAndVissionPageGetController)
router.get('/contact',contactPageGetController)
router.post('/contact',contactPagePostController)

router.get('/:pagename',dynamicPageRenderGetController)
module.exports = router

