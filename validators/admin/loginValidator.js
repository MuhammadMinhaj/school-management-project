const { body } = require('express-validator')
const Admin = require('../../models/Admin')
const adminLoginValidator = [
    body('email')
        .not()
        .isEmpty()
        .withMessage('Can\'t Be Empty Field')
        .isEmail()
        .withMessage('Please Provide Valid Email')
        ,
    body('password')
        .not()
        .isEmpty()
        .withMessage('Can\'t Be Empty Field')
        .isLength({min:5,max:16})
        .withMessage('Password Must Be Min 5 Chars And Max 16 Chars')
]
module.exports = adminLoginValidator