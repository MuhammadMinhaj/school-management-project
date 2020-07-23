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
    noticeUpdatePostController,
    // Controllers
    createCategoryGetController,
    createCategoryPostController,
    updateCategoryPostController,
    deleteCategoryGetController,

    categoryItemGetController,
    createNoticePostController,
    noticeStatusGetController,
    updateNoticePostController,
    deleteNoticeGetController
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


// Add New Routes
router.get('/news/category',isAuthenticatedAdmin,createCategoryGetController)
router.post('/news/category/create',isAuthenticatedAdmin,createCategoryPostController)
router.post('/news/category/update/:id',isAuthenticatedAdmin,updateCategoryPostController)
router.get('/news/category/delete/:id',isAuthenticatedAdmin,deleteCategoryGetController)


// Category Item Router
router.get('/news/category/item/:id',isAuthenticatedAdmin,categoryItemGetController)
router.post('/news/category/item/create/:id',isAuthenticatedAdmin,uploads.single('file'),createNoticePostController)
router.post('/news/category/item/update/:id',isAuthenticatedAdmin,uploads.single('file'),updateNoticePostController)
router.get('/news/category/item/delete/:id',isAuthenticatedAdmin,deleteNoticeGetController)

router.get('/news/category/item/status/:id',isAuthenticatedAdmin,noticeStatusGetController)

module.exports = router 