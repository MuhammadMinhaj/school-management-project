const router = require('express').Router()
const {
    isAuthenticatedAdmin,
} = require('../middlewares/adminAuthMiddleware')

const {
    menuCreateGetController,
    menuCreatePostController,
    menuDeleteDeleteController,
    menuUpdatePutController,
    menuGetController,
    menuPostController
}   = require('../controllers/adminControllers/menuController')


router.get('/menu-create',isAuthenticatedAdmin, menuCreateGetController)
router.post('/menu-create',isAuthenticatedAdmin,menuCreatePostController)
router.delete('/menu-delete/:id',isAuthenticatedAdmin,menuDeleteDeleteController)
router.put('/menu-update/:id',isAuthenticatedAdmin,menuUpdatePutController)

router.get('/menus',isAuthenticatedAdmin,menuGetController)

router.post('/menu/:id',isAuthenticatedAdmin,menuPostController)
module.exports = router