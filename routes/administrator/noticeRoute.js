const router = require('express').Router()

const uploads = require('../../middlewares/uploadMIddleware')

const { 
    isAuthenticatedAdmin,
} = require('../../middlewares/adminAuthMiddleware')

const {
    newsPageGetController,
    latestNewsCreateAndUpdatePostController,
    latestNewsDeleteGetController,
    breakingNewsPostController,
    breakingNewsDeleteGetController,
    breakingNewsUpdatePostController,
    

    noticeGetController,
    noticePostController,
    noticeDeleteGetController,
    noticeUpdatePostController
} = require('../../controllers/adminControllers/noticeController')

router.get('/news',isAuthenticatedAdmin,newsPageGetController)
router.get('/news/latest',isAuthenticatedAdmin,(req,res,next)=>{res.redirect('/administrator/news')})
router.post('/news/latest',isAuthenticatedAdmin,latestNewsCreateAndUpdatePostController)
router.get('/news/delete/latest',isAuthenticatedAdmin,latestNewsDeleteGetController)

router.get('/breaking-news',isAuthenticatedAdmin,(req,res,next)=>{res.redirect('/administrator/news')})
router.post('/breaking-news',isAuthenticatedAdmin,breakingNewsPostController)
router.get('/breaking-news/delete/:id',isAuthenticatedAdmin,breakingNewsDeleteGetController)
router.get('/breaking-news/update/:id',isAuthenticatedAdmin,(req,res,next)=>{res.redirect('/administrator/news')})
router.post('/breaking-news/update/:id',isAuthenticatedAdmin,breakingNewsUpdatePostController)



router.get('/notice',isAuthenticatedAdmin,noticeGetController)
router.post('/notice',isAuthenticatedAdmin,uploads.single('image'),noticePostController)
router.get('/notice/:id',isAuthenticatedAdmin,noticeDeleteGetController)

router.get('/notice/update/:id',isAuthenticatedAdmin,(req,res,next)=>{res.redirect('/administrator/notice')})
router.post('/notice/update/:id',isAuthenticatedAdmin,uploads.single('image'),noticeUpdatePostController)

module.exports = router 