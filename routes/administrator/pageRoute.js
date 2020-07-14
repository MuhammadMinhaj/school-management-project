const router = require('express').Router()
const uploads = require('../../middlewares/uploadMIddleware')

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
    pageDeleteGetController,
    addTextAboutAdministratorGetController,
    addTextAboutAdministratorPostController,
    deleteTextAboutAdministratorGetController,
    updateTextAboutAdministratorPostController
} = require('../../controllers/adminControllers/pageController')


router.get('/page_create',isAuthenticatedAdmin,pageCreateGetController)
router.post('/page_create',isAuthenticatedAdmin,createPageValidator,pageCreatePostController)

router.get('/page_update/:pageId',isAuthenticatedAdmin,pageUpdateGetController)
router.get('/page_delete/:pageId',isAuthenticatedAdmin,pageDeleteGetController)
router.post('/page_update/:pageId',isAuthenticatedAdmin,updatePageValidator,pageUpdatePostController)

router.get('/about/administrator',isAuthenticatedAdmin,addTextAboutAdministratorGetController)

router.post('/about/administrator',isAuthenticatedAdmin,uploads.single('image'),addTextAboutAdministratorPostController)

router.get('/about/administrator/delete/:id',isAuthenticatedAdmin,deleteTextAboutAdministratorGetController)
router.post('/about/administrator/update/:id',isAuthenticatedAdmin,uploads.single('image'),updateTextAboutAdministratorPostController)
module.exports = router