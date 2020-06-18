const router = require('express').Router()

// Middlewares Imported
const {
    isAuthenticatedAdmin
} = require('../../middlewares/adminAuthMiddleware')
const uploads = require('../../middlewares/uploadMIddleware')

// Controller Importend
const {
    linksGetController,
    createReferenceLinksPostController,
    referenceLinksUpdatePostController,
    referenceLinksDeleteGetController,
    uploadsDocumentLinksPostController,
    documentsLinksDeleteGetController,
    documentLinksUpdatePostController
} = require('../../controllers/adminControllers/linksController')


router.get('/links',isAuthenticatedAdmin,linksGetController)

router.post('/links/reference',isAuthenticatedAdmin,createReferenceLinksPostController)
router.post('/links/reference/update/:id',isAuthenticatedAdmin,referenceLinksUpdatePostController)
router.get('/links/reference/delete/:id',isAuthenticatedAdmin,referenceLinksDeleteGetController)


router.post('/links/documents',isAuthenticatedAdmin,uploads.single('documents'),uploadsDocumentLinksPostController)
router.post('/links/documents/update/:id',isAuthenticatedAdmin,uploads.single('documents'),documentLinksUpdatePostController)
router.get('/links/documents/delete/:id',isAuthenticatedAdmin,documentsLinksDeleteGetController)

module.exports = router 