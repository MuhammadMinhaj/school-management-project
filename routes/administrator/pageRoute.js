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
    updateTextAboutAdministratorPostController,
    addAboutTeacherInfoGetController,
    createTeacherGroupPostController,
    updateTeacherGroupPostController,
    deleteTeacherGroupGetController,
    addTeacherInfoPostController,
    updateTeacherInfoPostController,
    deleteTeacherInfoGetController
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

router.get('/about/teachers',isAuthenticatedAdmin,addAboutTeacherInfoGetController)
router.post('/create/teacher/group',isAuthenticatedAdmin,createTeacherGroupPostController)
router.get('/teacher/group/delete/:id',isAuthenticatedAdmin,deleteTeacherGroupGetController)
router.post('/teacher/group/update/:id',isAuthenticatedAdmin,updateTeacherGroupPostController)

router.post('/teacher/info/add',isAuthenticatedAdmin,uploads.single('image'),addTeacherInfoPostController)
router.post('/teacher/info/update/:id',isAuthenticatedAdmin,uploads.single('image'),updateTeacherInfoPostController)
router.get('/teacher/info/delete/:id',isAuthenticatedAdmin,uploads.single('image'),deleteTeacherInfoGetController)

module.exports = router