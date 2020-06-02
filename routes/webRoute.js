const router = require('express').Router()

// Import Routes
const {
    webGetController,
} = require('../controllers/webController')


router.get('/',webGetController)

module.exports = router