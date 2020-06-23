const router = require('express').Router()

// Imported Middlawares 
const {
    isAuthenticatedUser
} = require('../../middlewares/adminAuthMiddleware')

// Imported Controllers 
const {
    createClassGetController,
    createClassPostController,
    updateClassGetController,
    updateClassPostController,
    deleteClassGetController,
    
    classSubjectAddPostController,
    classSubjectUpdatePostController,
    classSubjectRemoveGetController,

    createStudentGetController,
    createStudentPostController,
    updateStudentPostController,
    studentDeleteGetController
} = require('../../controllers/users/classController') 

router.get('/class/create',isAuthenticatedUser,createClassGetController)
router.post('/class/create',isAuthenticatedUser,createClassPostController)
router.get('/class/update/:id',isAuthenticatedUser,updateClassGetController)
router.post('/class/update/:id',isAuthenticatedUser,updateClassPostController)
router.get('/class/delete/:id',isAuthenticatedUser,deleteClassGetController)

router.post('/class/subject/add/:id',isAuthenticatedUser,classSubjectAddPostController)
router.post('/class/subject/update/:classId/:subjectId',isAuthenticatedUser,classSubjectUpdatePostController)
router.get('/class/subject/remove/:classId/:subjectId',isAuthenticatedUser,classSubjectRemoveGetController)

router.get('/student/create/:id',isAuthenticatedUser,createStudentGetController)
router.post('/student/create/:classid',isAuthenticatedUser,createStudentPostController)

router.post('/student/update/:id',isAuthenticatedUser,updateStudentPostController)
router.get('/student/delete/:stuid/:classid',isAuthenticatedUser,studentDeleteGetController)
module.exports = router 