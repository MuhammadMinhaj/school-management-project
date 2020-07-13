const router = require('express').Router()

const {
    resultsFindApiGetController
} = require('../../api/resultsApiController')


router.get('/result/get',resultsFindApiGetController)

module.exports = router