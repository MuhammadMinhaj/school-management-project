const router = require('express').Router()
const uploads = require('../middlewares/uploadMIddleware')

const {
    isAuthenticatedAdmin
} = require('../middlewares/adminAuthMiddleware')


const {
    settingGetController,
    settingRedirectGetController,
    webNameSetPostController,
    webNameDeleteGetController,
    webNameUpdatePutController,
    webLogoSetPostController,
    webLogoDeleteGetController,
    sliderUploadPostController,
    sliderDeleteGetController,
    sliderEditInfoPostController,
    sliderTextDeleteGetController,
    socialLinksCreatePostController,
    socialLinksDeleteGetController,
    socialLinksUpdatePostController,
    aboutTextCreatePostController,
    futuredLinksCreatePostController,
    futuredLinksDeleteGetController,
    futuredLinksUpdatePostController
}   = require('../controllers/adminControllers/settingController')

function redirectPageController(req,res,next){
    return res.redirect('/administrator/setting')
}


router.get('/setting',isAuthenticatedAdmin,settingGetController)
router.get('/setting/:name',isAuthenticatedAdmin,settingRedirectGetController)

// Some Web Functionality
router.post('/setting/web_name',isAuthenticatedAdmin,webNameSetPostController)
router.get('/setting/web_name_delete/:lang',isAuthenticatedAdmin,webNameDeleteGetController)
router.put('/setting/web_name_update/:lang',isAuthenticatedAdmin,webNameUpdatePutController)

router.post('/setting/web_logo',isAuthenticatedAdmin,uploads.single('logo-img'),webLogoSetPostController)
router.get('/setting/web_logo/delete',isAuthenticatedAdmin,webLogoDeleteGetController)

router.post('/setting/slider-upload',isAuthenticatedAdmin,uploads.single('slider-img'),sliderUploadPostController)
router.get('/setting/slider-delete/:id',isAuthenticatedAdmin,sliderDeleteGetController)

router.get('/setting/slider-update/:id',isAuthenticatedAdmin,redirectPageController)
router.get('/setting/slider-text-delete/:id',isAuthenticatedAdmin,sliderTextDeleteGetController)
router.post('/setting/slider-update/:id',isAuthenticatedAdmin,sliderEditInfoPostController)

router.get('/setting/links/create',isAuthenticatedAdmin,redirectPageController)
router.post('/setting/links/create',isAuthenticatedAdmin,socialLinksCreatePostController)
router.get('/setting/links/delete/:id',isAuthenticatedAdmin,socialLinksDeleteGetController)
router.post('/setting/links/update/:id',isAuthenticatedAdmin,socialLinksUpdatePostController)
router.get('/setting/links/update/:id',isAuthenticatedAdmin,redirectPageController)

router.get('/setting/about/text/add',isAuthenticatedAdmin,redirectPageController)
router.post('/setting/about/text/add',isAuthenticatedAdmin,aboutTextCreatePostController)

router.get('/setting/futured/links/create',isAuthenticatedAdmin,redirectPageController)
router.post('/setting/futured/links/create',isAuthenticatedAdmin,futuredLinksCreatePostController)
router.get('/setting/futured/links/delete/:id',isAuthenticatedAdmin,futuredLinksDeleteGetController)
router.get('/setting/futured/links/update/:id',isAuthenticatedAdmin,redirectPageController)
router.post('/setting/futured/links/update/:id',isAuthenticatedAdmin,futuredLinksUpdatePostController)
module.exports = router