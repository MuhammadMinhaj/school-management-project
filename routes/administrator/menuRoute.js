const router = require('express').Router()
const {
    isAuthenticatedAdmin,
} = require('../../middlewares/adminAuthMiddleware')

const {
    menuGetController,
    menuCreateGetController,
    menuCreatePostController,
    menuDeleteDeleteController,
    menuUpdatePutController,
    dropDownCreateGetController,
    dropDownCreatePostController,
    showAllDropDownGetController,
    dropDownDeletePostController,
    dropDownUpdatePutController
}   = require('../../controllers/adminControllers/menuController')


router.get('/menus',isAuthenticatedAdmin,menuGetController)

router.get('/menu-create',isAuthenticatedAdmin, menuCreateGetController)
router.post('/menu-create',isAuthenticatedAdmin,menuCreatePostController)
router.delete('/menu-delete/:id',isAuthenticatedAdmin,menuDeleteDeleteController)
router.put('/menu-update/:id',isAuthenticatedAdmin,menuUpdatePutController)


router.get('/dropdown-create/:id',isAuthenticatedAdmin,dropDownCreateGetController)
router.get('/dropdown-all/:id',isAuthenticatedAdmin,showAllDropDownGetController)
router.post('/dropdown-create/:id',isAuthenticatedAdmin,dropDownCreatePostController)
router.post('/dropdown-delete/:id',isAuthenticatedAdmin,dropDownDeletePostController)
router.put('/dropdown-update/:id',isAuthenticatedAdmin,dropDownUpdatePutController)

module.exports = router