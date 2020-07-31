const router = require('express').Router()
const uploads = require('../../middlewares/uploadMIddleware')

const {
    isAuthenticatedAdmin
} = require('../../middlewares/adminAuthMiddleware')


const {
    settingGetController,
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
    futuredLinksCreatePostController,
    futuredLinksDeleteGetController,
    futuredLinksUpdatePostController,
    addPublicMailPostController,
    removePublicMailGetController,
    developerInfoGetController,
    forgottenPasswordStatusGetController,
    userForgottenPasswordStatusGetController
}   = require('../../controllers/adminControllers/settingController')


router.get('/setting',isAuthenticatedAdmin,settingGetController)

// Some Web Functionality Routes

router.post('/setting/web_name',isAuthenticatedAdmin,webNameSetPostController)
router.get('/setting/web_name_delete/:lang',isAuthenticatedAdmin,webNameDeleteGetController)
router.put('/setting/web_name_update/:lang',isAuthenticatedAdmin,webNameUpdatePutController)

router.post('/setting/web_logo',isAuthenticatedAdmin,uploads.single('logo-img'),webLogoSetPostController)
router.get('/setting/web_logo/delete',isAuthenticatedAdmin,webLogoDeleteGetController)

router.post('/setting/slider-upload',isAuthenticatedAdmin,uploads.single('slider-img'),sliderUploadPostController)
router.get('/setting/slider-delete/:id',isAuthenticatedAdmin,sliderDeleteGetController)

router.get('/setting/slider-text-delete/:id',isAuthenticatedAdmin,sliderTextDeleteGetController)
router.post('/setting/slider-update/:id',isAuthenticatedAdmin,sliderEditInfoPostController)

router.post('/setting/links/create',isAuthenticatedAdmin,socialLinksCreatePostController)
router.get('/setting/links/delete/:id',isAuthenticatedAdmin,socialLinksDeleteGetController)
router.post('/setting/links/update/:id',isAuthenticatedAdmin,socialLinksUpdatePostController)


router.post('/setting/futured/links/create',isAuthenticatedAdmin,futuredLinksCreatePostController)
router.get('/setting/futured/links/delete/:id',isAuthenticatedAdmin,futuredLinksDeleteGetController)
router.post('/setting/futured/links/update/:id',isAuthenticatedAdmin,futuredLinksUpdatePostController)
router.post('/setting/add/public/mail',isAuthenticatedAdmin,addPublicMailPostController)
router.get('/setting/remove/public/mail',isAuthenticatedAdmin,removePublicMailGetController)

router.get('/developer/info',isAuthenticatedAdmin,developerInfoGetController)

router.get('/password-recover',isAuthenticatedAdmin,forgottenPasswordStatusGetController)
router.get('/user-password/recover',isAuthenticatedAdmin,userForgottenPasswordStatusGetController)
module.exports = router