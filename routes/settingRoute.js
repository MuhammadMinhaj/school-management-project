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
    socialLinksUpdatePostController
}   = require('../controllers/adminControllers/settingController')

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

router.get('/setting/slider-update/:id',isAuthenticatedAdmin,(req,res,next)=>{
    res.redirect('/administrator/setting')
})
router.get('/setting/slider-text-delete/:id',isAuthenticatedAdmin,sliderTextDeleteGetController)
router.post('/setting/slider-update/:id',isAuthenticatedAdmin,sliderEditInfoPostController)

router.post('/setting/links/create',isAuthenticatedAdmin,socialLinksCreatePostController)
router.get('/setting/links/delete/:id',isAuthenticatedAdmin,socialLinksDeleteGetController)
router.post('/setting/links/update/:id',isAuthenticatedAdmin,socialLinksUpdatePostController)
router.get('/setting/links/update/:id',isAuthenticatedAdmin,(req,res,next)=>{
    res.redirect('/administrator/setting')
})
module.exports = router