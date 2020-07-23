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
    contactPagePostController,
    departmentPageGetController,
    galleryGetController,
    noticeGetController
} = require('../../controllers/web/webController')


router.get('/administration',aboutAdministrationInfoGetController)
router.get('/result',resultsPublicationGetController)

router.get('/teachers',aboutTeachersInfoGetController)
router.get('/gallery',galleryGetController)
router.get('/notice',noticeGetController)

router.get('/about',aboutPageGetController)
router.get('/libray',librayPageGetController)
router.get('/mission&vission',missionAndVissionPageGetController)
router.get('/contact',contactPageGetController)
router.post('/contact',contactPagePostController)


router.get('/:pagename',dynamicPageRenderGetController)
router.get('/department/:name',departmentPageGetController)


module.exports = router

