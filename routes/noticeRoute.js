const router = require('express').Router()

const uploads = require('../middlewares/uploadMIddleware')

const { 
    isAuthenticatedAdmin,
} = require('../middlewares/adminAuthMiddleware')

const {
    newsPageGetController,
    latestNewsPostController,
    breakingNewsPostController,
    breakingNewsDeleteGetController,
    breakingNewsUpdatePostController,
    newsDeleteGetController,

    noticeGetController,
    noticePostController,
    noticeDeleteGetController,
    noticeUpdatePostController
} = require('../controllers/adminControllers/noticeController')

router.get('/news',isAuthenticatedAdmin,newsPageGetController)
router.post('/latest-news',isAuthenticatedAdmin,latestNewsPostController)

router.post('/breaking-news',isAuthenticatedAdmin,breakingNewsPostController)
router.get('/breaking-news/delete/:id',isAuthenticatedAdmin,breakingNewsDeleteGetController)
router.get('/breaking-news/update/:id',isAuthenticatedAdmin,(req,res,next)=>{res.redirect('/administrator/news')})
router.post('/breaking-news/update/:id',isAuthenticatedAdmin,breakingNewsUpdatePostController)

router.get('/news/clear/:name',isAuthenticatedAdmin,newsDeleteGetController)

router.get('/notice',isAuthenticatedAdmin,noticeGetController)
router.post('/notice',isAuthenticatedAdmin,uploads.single('image'),noticePostController)
router.get('/notice/:id',isAuthenticatedAdmin,noticeDeleteGetController)
router.post('/notice/update/:id',isAuthenticatedAdmin,uploads.single('image'),noticeUpdatePostController)

module.exports = router 