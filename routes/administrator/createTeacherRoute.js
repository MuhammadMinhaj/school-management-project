const router = require('express').Router()

// Imported All Middlewares
const {
    isAuthenticatedAdmin
} = require('../../middlewares/adminAuthMiddleware')
const uploads = require('../../middlewares/uploadMIddleware')

// Imported All Controllers
const {
    createUserGetController,
    createUserPostController,
    updateUserPostController,
    deleteUserGetController
} = require('../../controllers/adminControllers/createTeacherController')

// Imporet All Validator
const createUserValidator = require('../../validators/admin/teacherCreateValidatior')
const updateUserValidator = require('../../validators/admin/userUpdateValidator')

router.get('/user/create',isAuthenticatedAdmin,createUserGetController)

router.post('/user/create',isAuthenticatedAdmin,uploads.single('picture'),createUserValidator,createUserPostController)

router.post('/user/update/:id',isAuthenticatedAdmin,uploads.single('picture'),updateUserValidator,updateUserPostController)

router.get('/user/delete/:id',isAuthenticatedAdmin,deleteUserGetController)

module.exports = router 