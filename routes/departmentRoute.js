const router = require('express').Router()

// Middlewares
const {
    isAuthenticatedAdmin,
} = require('../middlewares/adminAuthMiddleware')
const uploads = require('../middlewares/uploadMIddleware')

// Controllers
const {
    departmentCreateGetController,
    departmentCreatePostController,
    departmentUpdateGetController,
    departmentUpdatePostController,
    departmnetDeleteGetController
} = require('../controllers/adminControllers/departmentController')


router.get('/department',isAuthenticatedAdmin,departmentCreateGetController)


router.post('/department',isAuthenticatedAdmin,uploads.single('image'),departmentCreatePostController)

router.get('/department/update/:id',isAuthenticatedAdmin,departmentUpdateGetController)
router.post('/department/update/:id',isAuthenticatedAdmin,uploads.single('image'),departmentUpdatePostController)
router.get('/department/delete/:id',isAuthenticatedAdmin,departmnetDeleteGetController)
module.exports = router