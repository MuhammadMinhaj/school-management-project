const router = require('express').Router()
// const uploads = require('../../middlewares/uploadMIddleware')

const {
    isAuthenticatedAdmin
} = require('../../middlewares/adminAuthMiddleware')
const createPageValidator = require('../../validators/admin/createPageValidator')
const updatePageValidator = require('../../validators/admin/updatePageValidator')

const {
    pageCreateGetController,
    pageCreatePostController,
    pageUpdateGetController,
    pageUpdatePostController,
    pageDeleteGetController
} = require('../../controllers/adminControllers/pageController')


router.get('/page_create',isAuthenticatedAdmin,pageCreateGetController)
router.post('/page_create',isAuthenticatedAdmin,createPageValidator,pageCreatePostController)

router.get('/page_update/:pageId',isAuthenticatedAdmin,pageUpdateGetController)
router.get('/page_delete/:pageId',isAuthenticatedAdmin,pageDeleteGetController)
router.post('/page_update/:pageId',isAuthenticatedAdmin,updatePageValidator,pageUpdatePostController)

module.exports = router